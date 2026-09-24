# Architecture

danieljancar.dev is a static site built with [Astro](https://astro.build).
All content lives in this repository as Markdown and YAML. A browser-based CMS
edits those files through GitHub, and every push to `master` rebuilds and
publishes the site to GitHub Pages.

```
 Sveltia CMS (/admin) ──commit──▶ GitHub ──push to master──▶ Release workflow
        ▲                          │                           │ astro build
        │ edit in the browser      │ PRs, Renovate             ▼
      Daniel                       ▼                     GitHub Pages
                               develop ──merge──▶ master
```

## Folders

| Path                           | What lives there                                                            |
| ------------------------------ | --------------------------------------------------------------------------- |
| `src/content/`                 | All content. One folder per collection, schemas in `src/content.config.ts`. |
| `src/content/photos/`          | One YAML file per photo, the image files in `files/`.                       |
| `src/content/posts/<slug>/`    | A post's `index.md` with its images next to it.                             |
| `src/pages/`                   | Routes. Each file is thin: load data, hand it to components.                |
| `src/components/`              | UI, grouped by where it is used: `layout`, `home`, `blog`, `media`, `ui`.   |
| `src/lib/`                     | Plain TypeScript: content queries, colour maths, dates. No UI.              |
| `src/styles/`                  | Design tokens (`tokens.css`), base styles, prose, shapes.                   |
| `src/integrations/photo-meta/` | Build step that reads colours and camera data from photos.                  |
| `public/admin/`                | The CMS: `index.html` loads Sveltia, `config.yml` describes the fields.     |
| `tests/`                       | Vitest unit tests for everything in `src/lib` and the photo pipeline.       |

## Content model

| Collection        | Format                   | Used on                                      |
| ----------------- | ------------------------ | -------------------------------------------- |
| `posts`           | Markdown folder per post | `/blog`, `/blog/<slug>`, home, RSS           |
| `projects`        | Markdown                 | `/work`, `/work/<slug>`, home                |
| `events`          | Markdown                 | `/events`, `/events/<slug>`, home            |
| `photos`          | YAML + image file        | `/photos`, `/photos/<id>`, home, event pages |
| `notes`           | Markdown                 | `/now`, home ("Updates")                     |
| `recommendations` | YAML                     | `/recommended`, home                         |
| `experience`      | YAML                     | `/work`                                      |
| `legal`           | Markdown                 | `/legal/<slug>`                              |
| `site`            | `settings.yaml`          | name, links, now text, about, header video   |

References between collections are typed: a photo can point to an event, a post
to a project. A broken reference fails the build.

## Photos and colours

1. A photo lands in `src/content/photos/files/` (uploaded in the CMS or copied in).
2. Before the content layer loads, `src/integrations/photo-meta` runs:
   - every image without a YAML entry gets one, with the date from EXIF;
   - each image is scaled down to 200 px and its palette read with `node-vibrant`;
   - camera, lens, focal length, aperture, shutter and ISO come from EXIF. GPS is never read;
   - results go to `src/generated/photo-meta.json` (git-ignored) and a cache in
     `node_modules/.cache`, so unchanged photos are not analysed again.
3. `src/lib/photos.ts` joins entries with that data. `src/lib/color.ts` turns a
   palette into a theme (`--tint`, `--tint-ink`, `--photo-accent`, `--wash`)
   with WCAG contrast checks, so text on a tinted section always stays readable.
4. Astro's image service builds AVIF/WebP sizes at build time. Originals stay
   untouched; `npm run photos -- --shrink` scales huge originals to 3000 px
   while keeping EXIF.

In dev the integration watches the photos folder, so a new file shows up after a
refresh.

## Dark images

The site is dark, so bright images are pulled down. Photos carry an average
brightness from the photo-meta step; every other image (post, project, event and
update covers) is measured once per build in `src/lib/tone.ts`. `dimFor()` maps
brightness to a CSS `brightness()` factor between 1 and 0.65, set as `--dim` on
the image. The `.dimmed` class applies it and removes it on hover, so an image
lights up when you look at it. Images inside post text get a fixed, milder dim.

## Tags and related content

Posts, projects, events and photos all have `tags`. `src/lib/tags.ts` collects
them into one list of items, `src/lib/related.ts` (pure, tested) ranks what is
related: one point per shared tag, three for an explicit link (a post's
`project`, an event's `project`, a photo's `event`). That drives:

- `/tags` and `/tags/<tag>`, everything with that tag grouped by kind;
- the "Related" block on posts, events and photos, and "Connected" on projects.

Tags are compared by slug, so `React Native`, `react-native` and `react native`
meet. To connect a post to a project, give them a shared tag or set the post's
project.

## Motion

Scroll effects use CSS scroll-driven animations (`animation-timeline`), no
JavaScript libraries. Browsers without support get the static layout through
`@supports not (animation-timeline: view())` blocks, and
`prefers-reduced-motion` switches all animation off.

Vite's default CSS minifier (lightningcss) folds `animation-timeline` into the
`animation` shorthand, which browsers reject. `astro.config.mjs` therefore uses
esbuild for CSS. Keep it that way until that is fixed upstream.

## Deploy and releases

- `ci.yml` runs format, lint, type check, tests and build on every PR and on `develop`.
- `release.yml` runs on `master`: the same checks, then uploads `dist/` with
  `actions/upload-pages-artifact`, deploys it with `actions/deploy-pages` and
  creates a release with semantic-release. Pages must use "GitHub Actions" as
  its source in the repository settings.
- CMS saves go straight to `master`, so content is live a few minutes later.

## Dependencies

Renovate (`renovate.json`) opens PRs against `develop` every Monday morning.
Minor and patch updates, lock file maintenance and GitHub Actions updates merge
themselves when CI is green. Major updates stay open for review.

## Conventions

- Content lives in `src/content/`, schemas in `src/content.config.ts`, and
  `public/admin/config.yml` mirrors them. Change both together.
- Pages stay thin. Data access goes through `src/lib/content.ts`,
  `src/lib/photos.ts` and `src/lib/tags.ts`. Components get data as props.
- Pure logic lives in `src/lib` without Astro imports where possible, so it can
  be unit tested.
- Styling uses the tokens in `src/styles/tokens.css` and scoped styles in the
  component. No CSS framework.
- Motion is CSS scroll-driven animation with an `@supports not` fallback and
  respect for `prefers-reduced-motion`.
- Local images go through `Photo.astro` or `Cover.astro`, never a plain `<img>`.
- Comments only where the code can't say it itself.
- Conventional Commits, branch off `develop`, PR into `develop`.

## Decisions

- **Astro over Angular.** Content-first, ships no JavaScript by default, image
  pipeline and content collections built in, and the best support among
  git-based CMSs.
- **Sveltia CMS.** Free, open source, runs as a static page on the site itself,
  works on the phone, logs in with a GitHub token, so no auth server is needed.
- **Images in git.** Simple and free for the current size. If the repo grows
  past a few hundred MB, move `photos/files` to Cloudflare R2 or similar and
  keep only the YAML in git.
