---
id: lisan-plugin-loader
title: Lisan Loader Plugin
sidebar_label: Loader
---

Lisan Loader allows you dynamically load your dictionaries and locale configurations.

However, dictionaries must be created compatible with the loader.
For that, you can set [`module`](/docs/lisan-compiler#module)
option to `lisan` in **Lisan Compiler** or provide
[`--module=lisan`](/docs/lisan-cli#compile) flag
to the **Lisan CLI** compile command;

<!-- markdownlint-disable MD036 -->

## Installation

You can install lisan from the sources below, as you see fit.

### from npm

```bash
npm install lisan-plugin-loader
```

### from CDN

<!-- prettier-ignore-start -->

<!-- markdownlint-disable MD013 -->

```html
<script src="https://unpkg.com/lisan-plugin-loader/dist/index.umd.js" type="text/javascript"></script>
```

<!-- markdownlint-enable MD013 -->

<!-- prettier-ignore-end -->

After adding the script tag above, all public variables
will be accessible via `window.lisanPluginLoader` variables.

## Usage

```js
const { lisan } = require('lisan');
const { Loader } = require('lisan-plugin-loader');

lisan.use(
  Loader({
    dictionaryUrlFn: (dictionaryName, localeName) =>
      `https://cdn.mydomain.com/static/${localeName}/dictionaries/${dictionaryName}.js`,
  }),
);

lisan.localeName('tr');

lisan.load('main').then(() => {
  // Loaded https://cdn.mydomain.com/static/tr/dictionaries/main.js
  const translated = lisan.t('hello.person', {
    name: 'John Doe',
  });
  console.log(translated); // Merhaba John Doe
});
```

**Type Signature**

```ts
type Loader = (urlResolverFunctions: {
  dictionaryUrlFn: string;
  localeUrlFn: string;
}) => TSLisan.Plugin;
```

## Options

### `dictionaryUrlFn`

Type: **DictionaryURLResolverFunction**<br>
Default: `undefined`

**Type Signature**

```ts
type DictionaryURLResolverFunction = (
  dictionaryName: string;
  localeName: string;
) => string;
```

### `localeUrlFn`

<!-- markdownlint-disable MD038 MD013 -->

Type: **LocaleURLResolverFunction**<br>
Default: `` ({ localeName }) => `https://unpkg.com/lisan-locales/dist/${localeName}.lisan.js` ``

<div class="warning-block">

> **Warning**
>
> `localeUrlFn` only works if [`lisan-plugin-l10n`](/docs/lisan-plugin-l10n) is used.

</div>

<!-- markdownlint-enable MD038 MD013 -->

**Type Signature**

```ts
type LocaleURLResolverFunction = (localeName: string) => string;
```

## Methods

For the full list of methods, see [Lisan Loader API](/docs/full-api-reference#loader-plugin).

## Compatibility

<div class="compatibility-table">

| Platform | IE  | Edge | Firefox | Chrome | Nodejs |
| -------- | --- | ---- | ------- | ------ | ------ |
| Version  | 9+  | All  | All     | All    | 8+     |

</div>

## Guide

### Why might you need a dynamic loader?

Lisan takes advantage of doing interpolation on runtime with pure functions.
To achieve that it uses **Javascript files**. However, there is a very
**important** difference loading javascript files **dynamically** vs **synchronously**.

Popular Javascript modules (Eg. commonjs, esm, umd) loads
modules synchronously.
That's why module bundlers like `webpack`, `rollup` can statically analyze your code
and bundle your source code.

Since i18n preferences are gathered from client-side, it would be
a good practice to load dictionaries and/or locales **dynamically as chunks**
(a.k.a lazy loading)
especially for Single Page Applications since it would decrease
the main bundle size.

<div class="hint-block">

> **Hint**
>
> You can also create a separate bundle for each locale and/or dictionaries
> and include locale/dictionary files to **reduce latency**. You are completely
> free to choose how to design your application.

</div>

Luckily, Lisan Loader Plugin is here to save you from some pain.

You can use [`lisan.loadLocale()`](/docs/full-api-reference#lisanloadlocale)
method to load **locales**
and [`lisan.load()`](/docs/full-api-reference#lisanload)
method to load **dictionaries**.

<div class="info-block">

> **Info**
>
> `lisan compile --module=lisan` command will generate dictionaries<br>
> which are compatible with **Lisan Loader**.
>
> To learn more about compile command, see: [`lisan compile`](/docs/lisan-cli#compile).

</div>

#### Loading on Node Environment

Under development, will respect to [`.lisanrc`](/docs/lisan-cli#configuration-file);

#### Loading on Browser Environment

Lisan Loader will load dictionaries and locales by appending
`<script>` elements before closing body tag `</body>`.

```js
// src/index.js
const { lisan } = require('lisan');
const { Loader } = require('lisan-plugin-loader');
const { Localization } = require('lisan-plugin-l10n');
const renderHome = require('./pages/home.js');

// Localization is needed to use loadLocale function.
lisan.use(Localization);

lisan.use(
  Loader({
    localeUrlFn: localeName =>
      `https://cdn.mydomain.com/static/locales/${localeName}.js`,
    dictionaryUrlFn: (dictionaryName, localeName) =>
      `https://cdn.mydomain.com/static/${localeName}/dictionaries/${dictionaryName}.js`,
  }),
);

(async () => {
  await lisan.loadLocale('en-US');
  // Loaded https://cdn.mydomain.com/static/locales/en-US.js

  await lisan.load('main');
  // Loaded https://cdn.mydomain.com/static/en-US/dictionaries/main.js

  renderHome();
})().then(() => console.log('rendered'));
```

<!-- prettier-ignore-start -->

Please note that,

`lisan.loadLocale("en-US")` method will append the script element below:

```html
<script id="Lisan_Locale__en-US" src="https://cdn.mydomain.com/static/locales/en-US.js"></script>
```

`lisan.load("main")` method will append the script element below:

```html
<script id="Lisan_Dictionary__en-US__main" src=" https://cdn.mydomain.com/static/en-US/dictionaries/main.js"></script>
```

<!-- prettier-ignore-end -->

### Using another dynamic import strategy

There are plenty of ways to dynamically import
javascript files like using
[import() expression](https://v8.dev/features/dynamic-import#dynamic),<br>
[ES Modules in Browsers](https://v8.dev/features/modules#browser)
or a third-party library like [requireJS](https://requirejs.org/) etc.

You are free to use any of them.
All you need to do is to provide [`--module`](/docs/lisan-cli#module) option
to [`lisan compile`](/docs/lisan-cli#compile) tool while
building your dictionaries.

You can check [Dynamic Import Strategies](dynamic-import) page for more details.

### Caching

When you start using javascript files to serve dictionaries,
you need to be **aware of caching**.

Browsers will cache the webpage assets. Thus, if you make a change
in your dictionary, clients may not see it.

There are plenty of different strategies to invalidate the cache
for javascript files like<br>
setting [`Cache-Control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
header,
or using [manifest files](https://developer.mozilla.org/en-US/docs/Web/Manifest),
or redirecting static assets' URLs to hashed URLs
etc.

However, depending on your use case,
one of the simplest solutions could be
adding a version tag at the end of your dictionary URLs.

```js
const MY_APP_VERSION = require('package.json').version;

lisan.use(
  Loader({
    localeUrlFn: localeName =>
      `https://cdn.mydomain.com/static/locales/${localeName}.js?v=${MY_APP_VERSION}`,
    dictionaryUrlFn: (dictionaryName, localeName) =>
      `https://cdn.mydomain.com/static/${localeName}/dictionaries/${dictionaryName}.js?v=${MY_APP_VERSION}`,
  }),
);
```

Or if you'd like to version dictionaries separately,
you can add the version name to your dictionary files.

```js
lisan.use(
  Loader({
    dictionaryUrlFn: dictionaryName =>
      `https://cdn.mydomain.com/static/dictionaries/${dictionaryName}.js`,
  }),
);

lisan.load('main-v1.2.3').then(() => {
  // Loaded https://cdn.mydomain.com/static/dictionaries/main-v1.2.3.js
  // All entries can be used by `lisan.t()` and `lisan.c()` methods
});

lisan.load('about-v1.0.0').then(() => {
  // Loaded https://cdn.mydomain.com/static/dictionaries/about-v1.0.0.js
  // All entries can be used by `lisan.t()` and `lisan.c()` methods
});
```
