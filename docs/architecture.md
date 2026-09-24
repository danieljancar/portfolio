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
| `src/content/albums/<slug>/`   | An album's `index.md` and all its photos next to it.                        |
| `src/content/posts/<slug>/`    | A post's `index.md` with its images next to it.                             |
| `src/pages/`                   | Routes. Each file is thin: load data, hand it to components.                |
| `src/components/`              | UI: `layout`, `home`, `cards`, `blog`, `media`, `ui`.                       |
| `src/lib/`                     | Plain TypeScript: content queries, tags, dates, links, image tone. No UI.   |
| `src/styles/`                  | Design tokens (`tokens.css`), base styles, prose.                           |
| `src/markdown/`                | Markdown plugins, e.g. external links open in a new tab.                    |
| `src/integrations/photo-meta/` | Build step that reads brightness, palette and camera data from photos.      |
| `public/admin/`                | The CMS: `index.html` loads Sveltia, `config.yml` describes the fields.     |
| `tests/`                       | Vitest unit tests for `src/lib` and the photo pipeline.                     |

## Content model

| Collection        | Format                     | Used on                                  |
| ----------------- | -------------------------- | ---------------------------------------- |
| `posts`           | Markdown folder per post   | `/blog`, `/blog/<slug>`, home, RSS, tags |
| `projects`        | Markdown                   | `/projects`, `/projects/<slug>`, home    |
| `albums`          | Markdown folder + photos   | `/photos`, `/photos/<album>`, home       |
| `events`          | Markdown                   | `/events`, `/events/<slug>`              |
| `experience`      | YAML                       | `/about`                                 |
| `notes`           | Markdown                   | `/now`                                   |
| `recommendations` | YAML                       | `/recommended`                           |
| `legal`           | Markdown                   | `/legal/<slug>`                          |
| `site`            | `settings.yaml` + portrait | headline, intro, about, skills, profiles |

References between collections are typed: an event can point to its album and a
project, a post to a project. A broken reference fails the build.

## Photos

Photos live in albums, one folder per shoot. Every image in the folder is part
of the album; there is no per-photo entry and no description to write. The
album's `index.md` holds the title, date, place, cover, whether it shows on the
home page, and an optional ordered list of highlights. The home page hero uses
the photos listed in `heroPhotos` in the site settings.

1. Before the content layer loads, `src/integrations/photo-meta` reads every
   album photo: size, average brightness, colour palette (`node-vibrant`) and
   camera data from EXIF. GPS is never read. Results go to
   `src/generated/photo-meta.json` (git-ignored) with a cache in
   `node_modules/.cache`.
2. `src/lib/photos.ts` finds the images with `import.meta.glob` and joins them
   with that data. Astro's image service builds the responsive sizes.
3. Galleries use a masonry layout and a `<dialog>` lightbox with keyboard and
   swipe navigation.
4. Photos never carry a location. The CMS converts uploads to WebP at 2400 px,
   which drops all metadata. For files added by hand, `npm run photos -- --clean`
   removes GPS and scales anything above 2400 px down, keeping camera model and
   date. A test fails CI if any album photo still has GPS data.

## Themes and images

The site follows the system colour scheme. The toggle in the header stores a
choice in `localStorage`, and an inline script applies it before the first
paint. Colours are defined once with `light-dark()` in `tokens.css`; values that
are not colours read `--is-dark`.

Bright images are dimmed so they sit calmly on the page. Photos carry their
brightness from the photo-meta step, other images are measured once per build in
`src/lib/tone.ts`. `dimFor()` maps brightness to a `brightness()` factor between
1 and 0.65; the effect is stronger in dark mode and lifts on hover.

## Links

`src/lib/links.ts` decides what is external. Components spread `linkAttrs()` on
links, and the `external-links` markdown plugin does the same inside posts, so
every link off the site opens in a new tab.

## Tags and related content

Posts, projects, events and albums all have `tags`. `src/lib/tags.ts` collects
them into one list of items, `src/lib/related.ts` (pure, tested) ranks what is
related: one point per shared tag, three for an explicit link (a post's project,
an event's project or album). That drives `/tags`, `/tags/<tag>` and the related
blocks on detail pages. Tags are compared by slug, so `React Native` and
`react-native` meet.

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
- Links leaving the site use `linkAttrs()`.
- Motion is CSS scroll-driven animation with an `@supports not` fallback and
  respect for `prefers-reduced-motion`.
- Album photos go through `Photo.astro`, other local images through `Cover.astro`.
- Comments only where the code can't say it itself.
- Conventional Commits, branch off `develop`, PR into `develop`.

## Decisions

- **Astro over Angular.** Content-first, ships no JavaScript by default, image
  pipeline and content collections built in, and the best support among
  git-based CMSs.
- **Sveltia CMS.** Free, open source, runs as a static page on the site itself,
  works on the phone, logs in with a GitHub token, so no auth server is needed.
- **Images in git.** Simple and free for the current size. If the repo grows
  past a few hundred MB, move the album images to Cloudflare R2 or similar and
  keep only the `index.md` files in git.
