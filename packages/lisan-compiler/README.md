<p align="center">
  <img alt="Lisan.js" src="https://lisanjs.com/img/logo/banners/5_big.png" width="480">
  <br>
  <strong>i18n</strong>, Reimagined!
</p>

<p align="center">
  A blazing fast and super small i18n library for Javascript
</p>

<hr>

<p align="center">
<a href="https://lisanjs.com"><strong>Website</strong></a><br><br>
<a href="https://lisanjs.com/docs/what-is-lisan#installation">Installation</a> ·
<a href="https://lisanjs.com/docs/docs/full-api-reference">API</a> ·
<a href="https://lisanjs.com/docs/docs/pluralization">Guides & Tips</a>
</p>

<hr>

# Lisan Compiler

**Lisan Compiler** is a javascript library
created to improve development experience with Lisan.

It helps you to compile [Translations](https://lisanjs.com/docs/translations)
into [Dictionaries](https://lisanjs.com/docs/dictionary).

> You can also parse a single [Lisan Literal](https://lisanjs.com/docs/translations#lisan-literal)
> via [`parseLisanLiteral`](https://lisanjs.com/docs/lisan-compiler#parselisanliterallisanliteral)
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

For the full list of methods, see [Lisan Compiler API](https://lisanjs.com/docs/lisan-compiler).

## Compatibility

<div class="compatibility-table">

| Platform | IE  | Edge | Firefox | Chrome | Nodejs |
| -------- | --- | ---- | ------- | ------ | ------ |
| Version  | 11  | All  | All     | All    | 10+    |

</div>

## License

This package is [MIT licensed](./LICENCE).
