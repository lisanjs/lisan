---
id: how-lisan-works
title: How it works?
---

Below, you can find a very simple use case
to get the basic idea about Lisan.

But of course, functionalities are **not limited** with these examples.
You can learn about all Lisan components by visiting
[`Translations`](/docs/translations),
[`Dictionary`](/docs/dictionary),
[`Conditional Groups`](/docs/conditional-groups) pages.

## 1. Storing translations

Translation files are stored in **json files** as
valid **[JSON5](https://json5.org/)** (JSON with Comments) format.

Let's assume we have the JSON translation file below:

```json
// src/translations/tr-TR/main.json

// JSON file can contain comments
{
  "locale": "tr-TR",
  "entries": {
    "hello.world": "Merhaba Dünya",

    // Translation can contain placeholders.
    "hello.person": "Merhaba ${name}"
  }
}
```

## 2. Generating dictionaries

After installing [Lisan CLI](/docs/lisan-cli) as a dev dependency,
simply run it like below:

```bash
lisan compile --inputDir src/translations/ --outputDir static/dictionaries/ --watch
```

**lisan-cli** will find all **\*\*/\*.json** files in the **input directory**,
and generate javascript files to the **output directory**
keeping the same folder structure in the input directory.

<div class="hint-block">

> **Hint**
>
> **--watch** flag watches translation folder against
> changes and generates dictionaries automatically. Therefore,
> it can be useful during **development**.
>
> You can use [`.lisanrc`](/docs/lisan-cli#configuration-file)
> file to configure [Lisan CLI](/docs/what-is-lisan-cli).

</div>

Output:

```js
// static/dictionaries/tr-TR/main.js

module.exports = {
  locale: 'tr-TR',
  keys: {
    'hello.world': 'Merhaba Dünya',
    'hello.person': ({ name }) => `Merhaba ${name}`,
  },
};
```

## 3. Using dictionaries

After generating dictionaries,
you can simply import your dictionaries
and register them to lisan instance by using
[`lisan.add()`](/docs/full-api-reference#lisanadddictionary)
method.

```js
// index.js
const { lisan } = require('lisan');
const mainDictionary = require('./static/dictionaries/tr-TR/main');

lisan.add(mainDictionary);

const translated = lisan.t('hello.person', {
  name: 'John Doe',
});
console.log(translated); // Merhaba John Doe
```

> For client side rendering or for dynamically importing
> dictionaries you can check [lisan-plugin-loader](/docs/lisan-plugin-loader).
