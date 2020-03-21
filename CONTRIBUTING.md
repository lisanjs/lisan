# Contributing

As always, you are more than welcome
if you'd like to contribute and/or to share your feedback.

## Rules

As a rule of thumb, if you are planning to contribute to **any** open source project,
please always **open an issue** and **make a proposal first** before starting development.

This will save you from working on features
that maybe nobody needs or doesn't fit the project's vision.

## Setup

Clone the repository and run:

```bash
npm install
npm run bootstrap
npm run build
```

### Validate setup

```bash
npm run lint
npm test
```

## Branching

Please create a feature branch based on `development` branch
following the name convention: `<ISSUE_NUMBER>-<ISSUE_TITLE_SLUG>`.

## Pull requests

Please create your pull requests targeting the `development` branch.

- Please do not forget to add/uddate the tests.

## Running tests locally

You can run your tests by using the command below:

```bash
npm test -- <regexForTestFiles>
```

### Examples

```bash
# This will run all the tests in `lisan-compiler` folder.
npm test -- lisan-compiler

# This will run all the tests containing `generate` in file path.
npm test -- generate

# This will run all the tests matching with regex
npm test -- "lisan-compiler/.*/parse"
```

### Updating snapshots

You can pass [`-u`](https://jestjs.io/docs/en/cli#--updatesnapshot) flag to jest
to update snapshots by simply running the command below.

```bash
npm test -- -u
```
