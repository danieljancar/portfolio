# Editing content

## In the browser (also on the phone)

1. Open https://danieljancar.dev/admin
2. Sign in with a GitHub token. Create a fine-grained token for
   `danieljancar/portfolio` with **Contents: read and write** at
   https://github.com/settings/personal-access-tokens/new. The CMS keeps it in
   the browser.
3. Edit, then Save. Every save is one commit on `master`, and the site
   rebuilds on its own.

| I want to                                | Go to                                                                                                                                    |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Post photos                              | Photos → pick or create an album, upload. Uploads are converted to webp and lose their location data. Tick "Featured" for the home page. |
| Write a blog post                        | Posts → New. Images dragged into the text are stored next to the post.                                                                   |
| Add an event                             | Events → New, and pick the album with its photos.                                                                                        |
| Add work                                 | Work → New. Tick "Ongoing" for long-running work, leave it off for one-offs.                                                             |
| Change a role                            | Experience. Roles of the same company are grouped; leave "End" empty while it's current.                                                 |
| Add a podcast or site                    | Recommended → New.                                                                                                                       |
| Change the headline, about text or links | Site → Settings.                                                                                                                         |

## Locally

```bash
npm install
npm run dev          # http://localhost:4321, CMS at /admin
```

Drop photos into an album folder in `src/content/albums/`. For a new shoot,
create a folder with an `index.md` (title, date, cover) next to the photos. The
dev server picks new files up on refresh.

In Chrome or Edge the CMS can also work on the local checkout: open
http://localhost:4321/admin and choose "Work with Local Repository".

Phone photos carry the location they were taken at. Run
`npm run photos -- --clean` after adding photos by hand: it removes GPS data and
scales very large files to 2400 px. The tests fail as long as a photo still has
a location.
