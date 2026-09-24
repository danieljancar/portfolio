# Editing content

## In the browser (also on the phone)

1. Open https://danieljancar.dev/admin
2. Sign in with a GitHub token. Create a fine-grained token for
   `danieljancar/portfolio` with **Contents: read and write** at
   https://github.com/settings/personal-access-tokens/new. The CMS keeps it in
   the browser.
3. Edit, then Save. Every save is one commit on `master`, and the site
   rebuilds on its own.

| I want to                                    | Go to                                                                                                         |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Post photos                                  | Photos → New. Upload, write a short description, pick a category. Tick "Featured" to put it on the home page. |
| Write a blog post                            | Posts → New. Images dragged into the text are stored next to the post.                                        |
| Share a short update                         | Updates → New. Shows on /now and the home page.                                                               |
| Add an event                                 | Events → New, then link photos to it from the photo entries.                                                  |
| Add a podcast or site                        | Recommended → New.                                                                                            |
| Change the "now" text, links or header video | Site → Settings.                                                                                              |

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

Very large camera files: `npm run photos -- --shrink` scales them to 2400 px
and keeps the EXIF data.
