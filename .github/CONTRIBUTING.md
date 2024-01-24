# Contributing Guide

This is a guide for contributing to this project. Please read this before making any contributions to this project.

## Branches

This project uses the following branches:

- `master` - The main branch. This branch is used for production releases.
- `develop` - The development branch. This branch is used for development and testing.

## Commit Messages

When you commit, make sure to follow the [Contributing Guide](CONTRIBUTING.md) for commit messages. This will help keep the commit messages clean and consistent across the project. If you don't follow the guide, your pull request will be rejected.

### Commit Message Format

The commit message format is as follows:

```
<type>(<scope>): <subject>
```

#### Type

The type is a single word that describes the type of change that was made. The following types are used in this project:

- `feat` - A new feature.
- `fix` - A bug fix.
- `docs` - Documentation only changes.
- `style` - Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- `refactor` - A code change that neither fixes a bug nor adds a feature.
- `perf` - A code change that improves performance.
- `test` - Adding missing tests or correcting existing tests.
- `chore` - Changes to the build process or auxiliary tools and libraries such as documentation generation.
- `revert` - Reverts a previous commit.
- `ci` - Changes to the CI configuration files and scripts.

#### Scope

The scope is a single word that describes the scope of the change. This is usually the name of the file or directory that was changed.

#### Subject

The subject is a short description of the change. Use the imperative, present tense: "change" not "changed" nor "changes". Don't capitalize the first letter, and no dot (.) at the end.

## Semantic Versioning

This project uses [Semantic Versioning](https://semver.org/). This means that the version number will be incremented based on the following:

- Major version - Incremented when incompatible API changes are made.
- Minor version - Incremented when functionality is added in a backwards-compatible manner.
- Patch version - Incremented when backwards-compatible bug fixes are made.

By contributing to this project, you agree that your contributions will be released under the same versioning scheme.
