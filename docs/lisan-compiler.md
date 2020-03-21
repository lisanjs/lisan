---
id: lisan-compiler
title: Lisan Compiler
---

Here you can find all supported options and methods provided by
[`lisan-compiler`](/docs/what-is-lisan-compiler) library.

## Methods

- [`parseLisanLiteral(lisanLiteral)`](#parselisanliterallisanliteral)
- [`parse(json, parseOptions)`](#parsejson-parseoptions)
- [`generate(parsedDictionary, generateOptions)`](#generateparseddictionary-generateoptions)

<!-- markdownlint-disable MD036 -->

## `parseLisanLiteral(lisanLiteral)`

Parses a single [Lisan Literal](/docs/translations#lisan-literal) string.

**Input**

| parameter    | type   | description                  |
| ------------ | ------ | ---------------------------- |
| lisanLiteral | string | A valid lisan literal string |

**Returns**: `object` - returns `ParsedLisanLiteral` object
that has the following type signature:

```ts
interface ParsedLisanLiteral {
  input: string;
  output: string;
  variables: string[];
  functions: string[];
  conditionalGroupKeys: string[];
  entryKeys: string[];
}
```

**Throws:** exception if the given entry is not valid.

**Usage**

<!-- markdownlint-disable MD013 -->

```ts
import { parseLisanLiteral } from 'lisan-compiler';

const lisanLiteral =
  "Some text ${c('conditionKey1', value1)} ${t('entryKey1', value4)} dateLong(value5) ${c('conditionKey2', value3, {value2})}";

const options = {};
const parsedEntry = parseLisanLiteral(lisanLiteral);

console.log(parsedEntry);
```

```json
{
  "input": "Some text ${c('conditionKey1', value1)} ${t('entryKey1', value4)} dateLong(value5) ${c('conditionKey2', value3, {value2})}",
  "output": "({ value1, value4, value5, value3, value2 }, { c, t, dateLong }) => `Some text ${c('conditionKey1', value1)}  ${t('entryKey1', {value4})} ${dateLong(value5)} ${c('conditionKey2', value3, {value2})}`",
  "variables": ["value1", "value4", "value5", "value3", "value2"],
  "functions": ["c", "t", "dateLong"],
  "conditionalGroupKeys": ["conditionKey1", "conditionKey2"],
  "entryKeys": ["entryKey1"]
}
```

<!-- markdownlint-enable MD013 -->

## `parse(json, parseOptions?)`

Parses a [Translation JSON](/docs/translations) object into a
`parsedDictionary` object that has following type signature:

```ts
interface ParsedEntry {
  input: string;
  output: string;
  variables: string[];
  functions: string[];
  entryKeys: string[];
  conditionalGroupKeys: string[];
  key: string;
  groupKey?: string;
}

interface ParsedDictionary {
  locale: string;
  entries: ParsedEntry[];
}
```

> `parse` function also does a lot of semantic checks. That's why please **always**
> use this function to generate your dictionaries.

**Input**

| parameter    | type              | description                     |
| ------------ | ----------------- | ------------------------------- |
| json         | object            | A valid Translation JSON Object |
| parseOptions | object (optional) | Parse Options                   |

**Returns**: `string` - returns the source code for the dictionary file.

**Throws:** exception if the given JSON contains errors.

**Usage**

```js
import { parse } from 'lisan-compiler';

const source = fs.readFileSync('main.json', 'utf-8');
const json = JSON.parse(source);

const parsedDictionary = parse(json);

console.log(parsedDictionary);
```

### Parse Options

#### `allowNonExistingKeys`

Type: `boolean`<br>
CLI: `--compilerOptions.allowNonExistingKeys`<br>
Default: `false`,

When set to `false`, compiler validates all the key usages in the dictionary.
If Lisan Literal has `t()` or `c()` functions that
are calling a non-existing entry, compiler throws exception.

You may want to set it to `true`, if you split your dictionaries into seperate
chunks and use a key that was created in another dictionary file. However,
in that case, dictionary containing the entry must be loaded before!

#### `autoTrimValues`

Type: `boolean`<br>
CLI: `--compilerOptions.autoTrimValues`<br>
Default: `true`

AUtomatically trims the whitespace characters
from both sides for every Lisan Literal entry.

#### `sortEntryKeys`

Type: `boolean`<br>
CLI: `--compilerOptions.sortEntryKeys`<br>
Default: `true`

Sorts dictionary keys by alphabetical order.

## `generate(parsedDictionary, generateOptions?)`

Generate function always renders a Javascript ES2015 (ES6) code.<br>
If you wish to have ES5 code, you can use
[`lisan-cli`](/docs/what-is-lisan-cli)

**Input**

| parameter        | type              | description                      |
| ---------------- | ----------------- | -------------------------------- |
| parsedDictionary | object            | A valid Parsed Dictionary Object |
| parseOptions     | object (optional) | Compile Options                  |

**Returns**: `string` - returns the source code for the dictionary file.

**Throws:** exception if the given options are not valid.

**Usage**

```js
import { parse, generate } from 'lisan-compiler';

const source = fs.readFileSync('main.json', 'utf-8');
const json = JSON.parse(source);

const parsedDictionary = parse(json);
const dictionarySource = generate(parsedDictionary, {
  module: 'cjs',
});

fs.writeFileSync('main.js', dictionarySource, 'utf-8');
```

### Compile Options

#### `module`

Type: `string`<br>
CLI: `--compilerOptions.module <moduleType>`<br>
Default: `"lisan"`

Specifies the module format of the generated bundle. One of the following:

- `none` – returns plain dictionary object as a string.
- `cjs` – CommonJS, suitable for Node and other bundlers.
- `esm` – Keep the bundle as an ES module file, suitable for other bundlers
  and inclusion as a &lt;script type=module&gt; tag in modern browsers.
- `lisan` - extends CommonJS module definition with an [iife](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
  so that the module can be used with
  [`lisan-plugin-loader`](/docs/lisan-plugin-loader).

`lisan` module looks like below:

```js
(function(module) {
  // exports the dictionary object
  module.exports = {
    locale: 'en-US',
    entries: {
      // entries
    },
  };
})(
  typeof module === 'object' && module.exports
    ? module
    : window.lisanLoaderListener,
);
```
