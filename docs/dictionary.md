---
id: dictionary
title: Dictionary
---

## Introduction

A Lisan Dictionary is a **Javascript Object**
that contains **string** or **function** entries.
It can also contain [Conditional Groups](/docs/conditional-groups)

A dictionary can be used after being
registered to lisan instance via
[`lisan.add()`](/docs/full-api-reference#lisanadd) method.

<div class="info-block">

> **Info**
>
> You can **automatically** generate dictionaries
> from [Translations](docs/translations)
> by using [`Lisan CLI`](docs/what-is-lisan-cli).
>
> For full list of options and commands, see: [Lisan CLI API](/docs/lisan-cli).

</div>

## Type Signature

```ts
interface Dictionary {
  locale?: string;
  entries: {
    [EntryKey: string]: DictionaryEntry | ConditionalGroup;
  };
}
```

### Dictionary Entry

Dictionary Entry is a **string**
or a **function** that returns a string.

### Conditional Group

If a Dictionary Entry is an **object**,
it is considered as a [Conditional Group](/docs/conditional-groups).

In that case **Entry Key** is also called [Conditional Group Key](/docs/conditional-groups#conditional-group-key).

## Example

```js
const lisan = require('lisan');

lisan.add({
  locale: 'en-US',
  entries: {
    'hello.world': 'Hello World!',
    'hello.person': ({ name }) => `Hello ${name}`,
  },
});

const text1 = lisan.t('hello.person', { name: 'John' });
console.log(text1);
// Outputs: "Hello John"
```

<div class="hint-block">

> **Hint**
>
> To minimize loading time or main bundle size, you can split
> your entries into several dictionaries.

</div>

## Dictionary Object

### locale (Optional)

`locale` is a string and a valid [BCP 47](https://tools.ietf.org/html/bcp47)
language tag.

It is optional. **However**, when defined it might **change** [`lisan.add()`](/docs/full-api-reference#lisanadddictionary)
method's behaviour.

When using [`lisan-plugin-l10n`](/docs/lisan-plugin-l10n),
if dictionary locale is **defined and different** than
the selected locale name, then
the dictionary object **will not** be registered. (see: [`lisan.setLocale()`](/docs/full-api-reference#lisansetlocalelocale))<br>
This mechanism is there to prevent
loading a dictionary created explicitly
for another language or locale.

**Example:**

```js
const { lisan } = require('lisan');
const { Localization } = require('lisan-plugin-l10n');
const { tr } = require('lisan-locales');

console.log(tr.name); // Outputs: "tr"

lisan.setLocale(tr);

lisan.add({
  locale: 'en-US',
  entries: {
    'hello.world': 'Hello World!',
    'hello.person': ({ name }) => `Hello ${name}`,
  },
}); // Throws: 'Dictionary locale "en-US" is different than selected locale "tr"'
```

<div class="warning-block">

> **Warning**
>
> Please note that in the example above,
> the dictionary **WILL NOT BE REGISTERED**, <br>
> because its locale is different
> than selected locale's name `tr.name` which is `"tr"`.

</div>

### entries

`entries` is a key-value map and have the following type definition:

- **Entry Key** is a **string** and a **unique** identifier for the Dictionary Entry,
- **Dictionary Entry** is a **string**
  or a **function** that returns a _string_
  or a [Conditional Group](#conditional-group)

<div class="warning-block">

> **Warning**
>
> When the Lisan Dictionary was registered, duplicate entries will be **overwritten**.
> So **make sure**, dictionaries **do not share** same Entry Keys.

</div>
