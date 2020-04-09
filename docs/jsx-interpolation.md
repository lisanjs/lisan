---
id: jsx-interpolation
title: JSX Interpolation
---

[JSX](https://reactjs.org/docs/introducing-jsx.html) is
a great and widely adopted
syntax extension for Javascript.

However, even though it looks like HTML JSX is actually
a Javascript object and it has to be rendered.
So, if you have HTML source code as string,
the only way to inject that HTML code is to use
[`dangerouslySetInnerHTML`](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
property.

As the property name suggests is not ideal and dangerous
since you don't have control over what's going to be rendered
and this can lead to [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks.

## Problem

When an entry contains html elements it gets complicated to generate
translation text.

A typical use case of this property is having a link in a translation
string.

<!-- prettier-ignore-start -->

```jsx
<p>
  Please click <a href="#path" onClick={handleClick}>here</a> to download
  <code>build-x64.zip</code> file!
</p>
```

<!-- prettier-ignore-end -->

As you can see, the real fun begins
when you have an event handler like `onClick`, where
even `dangerouslySetInnerHTML` property is not the direct
solution.

## How Lisan Solves it?

`lisan-compiler`, with `>v0.0.40` takes [`returnArray`](/docs/lisan-compiler#returnarray)
option.

This option converts dictionary entries to Arrays, where
JSX can easily join and render them.

### Example

1. Lets assume we have a translation file like below:

```jsonc
// translations/main.json

{
  "entries": {
    "word.here": "here",
    "download.text": "Please click ${downloadLink} to download ${codeElement} file!"
  }
}
```

2. We compile it using `--returnArray` flag.

```bash
lisan compile --returnArray --module=esm
```

3. Generated dictionary looks like below.

```js
// dictionaries/main.js

export default {
  entries: {
    'download.text': ({ downloadLink, codeElement }) => [
      'Please click ',
      downloadLink,
      ' to download ',
      codeElement,
      ' file!',
    ],
    'word.here': ['here'],
  },
};
```

4. We use generated dictionary in our JSX syntax like below:

```jsx
<p>{t("download.text", {
  downloadLink: <a href="#path" onClick={handleClick}>{t("word.here")}</a>,
  codeElement: <code>build-x64.zip</code>
})}<p>
```

## More Examples

- [Hello World React](https://github.com/lisanjs/examples/tree/master/03-hello-world-react)
- [Next.js ServerSide Rendering](https://github.com/lisanjs/examples/tree/master/04-nextjs-ssr)
- [ServerSide Rendering with Loader Plugin](https://github.com/lisanjs/examples/tree/master/05-ssr-with-lisan-plugin-loader)
