---
id: what-is-lisan-locales
title: What is Lisan Locales?
sidebar_label: Lisan Locales
---

**Lisan Locales** is a javascript package contains
production-ready Localization configurations.

If you think localization configuration
of your native language is missing or wrong,<br>
please feel free to
[open an issue](https://github.com/lisanjs/lisan/issues/new),
or submit a
[pull request](https://github.com/lisanjs/lisan/tree/master/packages/lisan-locales).

## Installation

You can install lisan-locales from the sources below, as you see fit.

### from npm

```bash
npm install lisan-locales
```

### from CDN

<!-- prettier-ignore-start -->

<!-- markdownlint-disable MD013 -->

```html
<script src="https://unpkg.com/lisan-locales/dist/index.umd.js" type="text/javascript"></script>
```

After adding the script tag above,
all localization configs will be accessible via <br>
`window.lisanLocaleAll` variable.

You can also add single Localization configuration as below:

```html
<script src="https://unpkg.com/lisan-locales/dist/tr.umd.js" type="text/javascript"></script>
```

After adding the script tag above,
**Turkish** localization config will be accesible via<br>
`window.lisanLocaleTr` variable.

<!-- markdownlint-enable MD013 -->

<!-- prettier-ignore-end -->

## List of Locales

You can find the full list of Localization configs,
[lisan-locale](https://github.com/lisanjs/lisan/tree/master/packages/lisan-locales) repository.

## Compatibility

<div class="compatibility-table">

| Platform | IE  | Edge | Firefox | Chrome | Nodejs |
| -------- | --- | ---- | ------- | ------ | ------ |
| Version  | 8+  | All  | All     | All    | 8+     |

</div>
