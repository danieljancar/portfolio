Husky is a powerful tool for enforcing code quality and consistency in your Node.js projects by leveraging Git hooks. It automates tasks such as linting and commit message validation, ensuring that contributions adhere to your project's standards. In this guide, we'll walk through setting up Husky in your Node.js project to streamline your development workflow and maintain high code quality.

## The Importance of Git Hooks

Git hooks are scripts that run automatically before or after events such as `commit`, `push`, and `merge`. They are a crucial part of the development workflow, allowing developers to catch errors early and enforce project guidelines. Husky simplifies the use of Git hooks, making it easier to integrate them into your Node.js projects.

## Why Choose Husky?

Husky offers a straightforward way to implement Git hooks without the need to modify the `.git` directory manually. This ensures that all contributors to a project follow the same set of rules, leading to cleaner, more maintainable code. Whether it's enforcing code style, running tests before a push, or validating commit messages, Husky automates these processes, saving time and reducing errors.

## Setting Up Husky in Your Node.js Project

First, you need to install Husky in your project. Ensure you're in your project's root directory, then run:

```bash
npm install husky --save-dev
```

After installing Husky, you'll need to enable Git hooks. Husky provides a simple command to do this:

```bash
npx husky install
```

To ensure Husky installs Git hooks properly, add the following script to your package.json:

  ```json
  {
  "scripts": {
    "prepare": "husky install"
  }
}
  ```

> **Note**: The `prepare` script is a special script that runs automatically before `npm install`. This ensures that Husky is installed for all contributors to your project.

## Configuring Husky Hooks

Now that Husky is set up, you can start configuring your hooks. For example, to add a pre-commit hook that runs linting, create a file in the .husky directory:

```bash
npx husky add .husky/pre-commit "npm run lint"
```

This command creates a pre-commit hook that runs the `lint` script defined in your package.json. You can also manually create the file and add the command to it.

```bash
"scripts": {
  "lint": "eslint . --fix"
}

```

## Advanced Configuration: Commit Message Validation

To ensure commit messages follow a specific format, you can use Husky to trigger a commit message validation script. First, install commitlint and its conventional config:

```bash
npm install @commitlint/{config-conventional,cli} --save-dev
```

Next, configure commitlint by creating a commitlint.config.js at your project's root:

```javascript
  module.exports = {extends: ['@commitlint/config-conventional']};
```

Then, add a commit-msg hook via Husky:

```bash
  npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

## Conclusion

Integrating Husky into your Node.js projects automates and enforces code quality standards directly from your Git hooks. By following the steps outlined in this guide, you're setting up your project for success, ensuring all contributions meet your quality requirements. This not only streamlines the development process but also fosters a culture of quality and accountability among contributors.

Remember, the configurations discussed can be tailored to fit the specific needs of your project, making Husky a versatile tool in your development toolkit.

## Further Reading

- [Husky Documentation](https://typicode.github.io/husky)
- [Commitlint Documentation](https://commitlint.js.org)
- [Git Hooks Documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [Husky TechTalk by Daniel Jancar](https://www.youtube.com/watch?v=FvfAXG92UqY&ab_channel=AngularNation)
