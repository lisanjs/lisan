---
id: what-is-lisan
title: What is Lisan?
sidebar_label: Lisan
---

**Lisan** _(Turkish: lee &#183; sun)_ is an i18n
([internationalization](https://en.wikipedia.org/wiki/Internationalization_and_localization#Naming))
library.

It provides all essential tooling to
have **multiple languages** in your applications and
format **numbers**, **currencies**, **ordinals** & **dates** based on locale.

Lisan's biggest difference compared to traditional i18n libraries
is taking advantage of
[ES6 Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
and using them to generate functions to interpolate strings.

<hr>

## What is Lisan trying to solve?

Most of the i18n libraries are based on some sort
of **template engine** to
[interpolate](https://en.wikipedia.org/wiki/String_interpolation#JavaScript)
strings and these template engines use **regex** or **loops**
under the hood to find & replace the placeholders.

However, using regex lookups or javascript loops
**decreases the performance [significantly](/docs/performance)**
(especially on client-side) since
find & replace is being done on _runtime_.

<hr>

## How lisan solves it?

Lisan adds an extra step to CI, but a giant performance gain to app kind!

Lisan introduces a [Dictionary](/docs/dictionary) concept
where a dictionary entry can be either just a **string**
or a javascript **function** that interpolates placeholders and returns a string.
Since there is no need finding & replacing placeholder templates,
we can _avoid_ using regex or loops.

It is that simple.

Of course, maintaining javascript files
to store translations could be challenging and not ideal.
Especially when using third-party software like
[transifex](https://www.transifex.com/) or
[crowdin](https://crowdin.com/).

That's why Lisan also provides a [compiler](/docs/what-is-lisan-compiler)
and a [command line tool](/docs/what-is-lisan-cli)
to generate Dictionary objects from
[Translation](/docs/translations) JSON files.
Dictionary objects are saved in javascript files.

### Enriched with plugins

Also, you can use existing plugins or
write your plugins
to extend the capabilities of Lisan.

- [`lisan-plugin-l10n`](/docs/lisan-plugin-l10n):
  adds localization formatters.
- [`lisan-plugin-loader`](/docs/lisan-plugin-loader):
  adds loading methods to _dynamically import_ javascript files.

## Installation

You can install lisan from the sources below, as you see fit.

### from npm

```bash
npm install lisan
```

### from CDN

<!-- prettier-ignore-start -->

<!-- markdownlint-disable MD013 -->

```html
<script src="https://unpkg.com/lisan/dist/index.umd.js" type="text/javascript"></script>
```

<!-- markdownlint-enable MD013 -->

<!-- prettier-ignore-end -->

After adding the script tag above, all public variables
will be accessible via `window.lisanJS` variables.

**Usage:**

```html
<script
  src="https://unpkg.com/lisan/dist/index.umd.js"
  type="text/javascript"
></script>
<script type="text/javascript">
  (() => {
    const { lisan, t, c, Lisan } = window.lisanJS;
  })();
</script>
```

## Compatibility

<div class="compatibility-table">

| Platform | IE  | Edge | Firefox | Chrome | Nodejs |
| -------- | --- | ---- | ------- | ------ | ------ |
| Version  | 8+  | All  | All     | All    | 8+     |

</div>
