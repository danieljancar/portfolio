# Portfolio

My personal website, built with [Astro](https://astro.build) and live at [danieljancar.dev](https://danieljancar.dev).

[![CI](https://github.com/danieljancar/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/danieljancar/portfolio/actions/workflows/ci.yml)
[![Release](https://github.com/danieljancar/portfolio/actions/workflows/release.yml/badge.svg?branch=master)](https://github.com/danieljancar/portfolio/actions/workflows/release.yml)

## About

This is where I share my work, photos, events and writing. Content is edited through the CMS at [/admin](https://danieljancar.dev/admin). How it fits together is in [docs/architecture.md](docs/architecture.md), how to add content in [docs/editing.md](docs/editing.md).

## Getting started

You'll need [Node.js](https://nodejs.org) and Git installed.

```bash
# clone the repo
git clone https://github.com/danieljancar/portfolio.git
cd portfolio

# install dependencies
npm install

# run it locally at http://localhost:4321
npm run dev
```

## Handy commands

```bash
npm run dev        # run the dev server
npm run build      # build for production
npm run check      # type check and validate content
npm test           # run the tests
npm run lint       # check for lint issues
npm run format     # format the code with Prettier
npm run photos     # refresh photo entries and colours (Node 22.18+)
```

## Contributing

Contributions are welcome. Have a look at the [contributing guide](.github/CONTRIBUTING.md) before you start, and please follow the commit message conventions there.

## License

Licensed under [GNU GPLv3](LICENSE). By contributing you agree your work is released under the same license, along with the [Code of Conduct](.github/CODE_OF_CONDUCT.md) and [Developer Certificate of Origin](.github/DCO.md).
