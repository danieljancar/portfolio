My developer friends and I kept running into the same small problem: we always ended up at the places we already knew. Whether it was a night out, a quiet corner to read a book, somewhere to drive on a weekend, or just a bench with a great view, we wanted to discover new places that other people love. We couldn't find a tool that did this well, so we decided to build one ourselves. We called it Cranny, a platform where anyone can share their favourite spots.

## The idea

Once we'd settled on the concept, we went with a mobile app, something simple, straightforward and easy to use. For the MVP, we landed on the features we thought mattered most:

- A map to show all spots in your area
- A curated home feed with new spots from people you follow and the most popular ones nearby
- A profile page to manage your account, spots and followers
- The ability to bookmark spots and share them with friends
- A way to say "I was here" through our so-called _traces_ feature

We figured the fastest way to get there was [Expo](https://expo.dev/), a framework for building native apps with React Native. Expo lets us build and ship quickly without getting bogged down in native code or the finer details of app store submissions.

On top of that, it has a great community and a generous set of built-in native APIs like location, camera and photo integrations that we leaned on heavily while building Cranny.

## Branching strategy

Our project lives in a monorepo, which lets us collaborate on a single codebase and share code across the whole application family. We keep a few packages in there: the mobile app itself, the website, the backend migrations and config, and smaller bits like email templates and custom scripts.

We run across a few environments: development locally, staging on a separate database branch and app store build, and production on the main branch and the live app. A branching strategy keeps deployments to each one predictable and easy to reason about.

![Cranny branching strategy visualized](assets/blog/images/developing-a-mobile-app-from-scratch-with-expo/branching-strategy.png)

As you can probably tell from the diagram above, we trigger different workflows depending on the branch we push to. I'll go into more detail below.

### Notable workflows

We have a handful of workflows that run either automatically on a branch push or manually through a workflow dispatch.

#### Deploy to Komodo

A push to the staging or production branch automatically deploys our website to our self-hosted servers using [Komodo](https://komo.do/). Komodo handles cloning the repo, building and deploying, so we never really have to think about it.

We host our Cranny instances, along with a few of my other personal projects, at [WIT Systems](https://wicki.sbs/). It's run by a good friend of mine who's genuinely invested in what he does. Props 🙌

#### Build and submit

Because everything lives in a monorepo, we didn't want the apps rebuilding and submitting on every change. Pushing an update to the website shouldn't ship a new app build, so our build-and-submit workflow is triggered manually via a workflow dispatch, for both staging and production.

## Tech stack

We chose [Supabase](https://supabase.com) as our backend. It covers pretty much everything we need: authentication, storage, geospatial data and the queries behind our curated content. For transactional emails we use [Resend](https://resend.com/), a great alternative to services like SendGrid or Mailgun that was easy to wire into our Supabase setup.

### Transactional emails

For an app like Cranny, transactional emails are a must-have. Working together with Supabase, we use them for things like account verification (a 6-digit code), password resets (a short-lived token in the link) and security notifications. Resend gives us fine-grained control over our audience and lets us send through their API with our own custom templates.

Here's roughly what sending an email looks like from inside a Supabase Edge Function:

```ts
// Sending an email from a Supabase Edge Function
const res = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: `${SENDER_NAME} <no_reply@${SITE_URL.replace(/^https?:\/\//, '')}>`,
    to: email,
    subject: subjects[lang],
    html,
  }),
});

if (!res.ok) {
  const body = await res.text();
  return new Response(`resend error: ${body}`, { status: 502 });
}

return new Response('ok', { status: 200 });
```

## Shipping to the app stores

Cranny is, as I mentioned, built with Expo and React Native. To build, submit and manage the app in the stores, we use [EAS Build](https://expo.dev/services#build) and [EAS Submit](https://expo.dev/services#submit), Expo's services for a smooth continuous-delivery setup.

![Cranny app delivery strategy](assets/blog/images/developing-a-mobile-app-from-scratch-with-expo/eas-submit-process.png)

Getting the app into the stores was a bit tedious and time-consuming, but the EAS services made it far easier than it would have been otherwise. Our automated workflow is fairly straightforward, and we mostly just had to set a few things up in the app store portals to get it running.

![Cranny TestFlight setup](assets/blog/images/developing-a-mobile-app-from-scratch-with-expo/app-store-connect-testflight.png)

The portals needed the usual configuration like app descriptions, screenshots and other metadata, plus a set of legal questions about your app and its content that can be tricky the first time around.

To wrap up this part, these services gave us a real head start, and we trigger delivery easily through our [branching](#branching-strategy) and [workflow](#notable-workflows) strategy to manage the different environments.

## Architecture overview

To tie it all together, here's a simplified view of how the app is structured:

![Cranny architecture overview](assets/blog/images/developing-a-mobile-app-from-scratch-with-expo/simple-prod-architecture-visualization.png)

It's intentionally simplified and skips a lot of the details, don't worry. ;)

## Conclusion

Building and maintaining Cranny has been a great experience for me and my friends. We had to design an architecture that's scalable and maintainable while still letting us iterate quickly, and that turned out to be a brilliant learning experience. We're excited to keep building and improving it, and just as curious to see how people use the app and what kinds of spots they'll share with each other.

![Cranny spot detail page illustration](assets/blog/images/developing-a-mobile-app-from-scratch-with-expo/pioneer-hero.png)

Feel free to check out [the app](https://the-cranny.com) and send us some feedback. :)

Big big thanks to my friends [Cyril](https://www.linkedin.com/in/cyril-kurmann-b623a019a/) and [Erin](https://www.linkedin.com/in/erin-bachmann-57b14518b/).
