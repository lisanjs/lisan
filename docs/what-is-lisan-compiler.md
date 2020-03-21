---
id: what-is-lisan-compiler
title: What is Lisan Compiler?
sidebar_label: Lisan Compiler
---

**Lisan Compiler** is a javascript library
created to improve development experience with Lisan.

It helps you to compile [Translations](/docs/translations)
into [Dictionaries](/docs/dictionary).

> You can also parse a single [Lisan Literal](/docs/translations#lisan-literal)
> via [`parseLisanLiteral`](/docs/lisan-compiler#parselisanliterallisanliteral)
> function.

## Installation

You can install lisan from the sources below, as you see fit.

### from npm

```bash
npm install lisan-compiler --save-dev
```

### from CDN

<!-- prettier-ignore-start -->

<!-- markdownlint-disable MD013 -->

```html
<script src="https://unpkg.com/lisan-compiler/dist/index.umd.js" type="text/javascript"></script>
```

After adding the script tag above,
Lisan Compiler instance will be accessible via <br>
`window.lisanCompiler` variable.

<!-- markdownlint-enable MD013 -->

<!-- prettier-ignore-end -->

**Usage:**

```html
<script
  src="https://unpkg.com/lisan-compiler/dist/index.umd.js"
  type="text/javascript"
></script>
<script type="text/javascript">
  (() => {
    const { parseLisanLiteral, parse, generate } = window.lisanCompiler;
  })();
</script>
```

## Methods

For the full list of methods, see [Lisan Compiler API](/docs/lisan-compiler).

## Compatibility

<div class="compatibility-table">

| Platform | IE  | Edge | Firefox | Chrome | Nodejs |
| -------- | --- | ---- | ------- | ------ | ------ |
| Version  | 11  | All  | All     | All    | 10+    |

</div>
