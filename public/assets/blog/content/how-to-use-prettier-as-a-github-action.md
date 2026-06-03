Keeping formatting consistent is one of those small things that quietly eats your time. Prettier takes care of it for you, but running it by hand on every change gets old fast. The nice part is that you can let GitHub Actions do it automatically on every pull request. Here is how I set that up.

## Why GitHub Actions?

GitHub Actions let you automate all sorts of tasks right inside your repository, from running tests to deploying code to small jobs like running Prettier. That flexibility really pays off in open-source projects, where a consistent code style matters. Once Prettier runs on its own, you and your collaborators can focus on the code instead of the formatting.

## What is Prettier?

Prettier is a code formatter that keeps your code styled consistently. It is handy whether you care a lot about how your code looks or you just want everyone on a project to follow the same style without arguing about it. It formats your files for you, so you don’t have to do it by hand.

## Setting Up Prettier

To use Prettier in a Node.js project, start by installing the `prettier` package. If you're using npm, run the following command:

```bash
npm install prettier --save-dev
```

Once installed, Prettier can be configured to run on certain files or directories. This is done through a `.prettierrc` file in your project. For instance, to configure Prettier to format all files, your `.prettierrc` file would look like this:

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "semi": true,
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid",
  "useTabs": false,
  "endOfLine": "auto"
}
```

Alternatively, you can run Prettier on specific files or directories using the npx command. For example:

```bash
npx prettier --write .
```

# Integrating Prettier with GitHub Actions

To automate Prettier with GitHub Actions, you'll need to configure a YAML file in your repository. This file, typically named `.github/workflows/prettier.yml`, defines the conditions under which Prettier will run. Here’s an example configuration to run Prettier on every pull request to the develop and master branches:

```yaml
name: Prettier Formatting

on:
  pull_request:
    branches:
      - master
      - develop

jobs:
  prettier:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Prettify code
        uses: creyD/prettier_action@v4.3
        with:
          prettier_options: '--write **/*.{js,ts,tsx,json,md,css}'
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

This configuration ensures that every time you push to the develop or master branches, Prettier will run on all JavaScript, TypeScript, JSON, Markdown, and CSS files. If you want to run Prettier on all files, you can replace the `prettier_options` line with the following:

```yaml
prettier_options: '--write .'
```

# Configure Actions permissions

To run the newly created workflow, you'll need to allow the Github Actions workflow to read and write to your repository. Go to your `Settings` tab, then click on `Actions` -> `General`, move to the `Workflow permissions` section, and enable the `Read and write` option.

# Conclusion

That’s the whole setup. With Prettier running inside GitHub Actions, formatting stays consistent across your project without anyone having to think about it. You get to spend your attention on the code itself instead of where the commas go.
