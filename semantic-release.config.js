module.exports = {
  branches: ['master'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    {
      path: '@semantic-release/github',
      assets: [
        { path: 'build.zip', label: 'Build Artifacts ZIP' },
        { path: 'coverage.zip', label: 'Coverage Report ZIP' },
      ],
    },
    '@semantic-release/git',
  ],
};
