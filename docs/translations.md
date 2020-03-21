---
id: translations
title: Translations
---

To create dictionaries automatically,
your translation files should be compatible with
[Lisan JSON Schema](#lisan-json-schema) and your translation texts
must follow [Lisan Literal](#lisan-literal) conventions.

Translations must be valid [JSON5](https://json5.org/) objects and preferably
should be stored in JSON files.

<div class="hint-block">

> **Best Practice**
>
> Please always maintain your translations as JSON files,
> and generate [dictionaries](/docs/dictionary)
> by using [Lisan CLI](/docs/what-is-lisan-cli)
> or [Lisan Compiler](/docs/what-is-lisan-compiler), since
> compiler will also validate your translations.

</div>

## Lisan JSON Schema

```ts
interface TranslationJson {
  locale?: string;
  entries: {
    [translationKey: string]: LisanLiteral;
    [conditionalGroupKey: string]: {
      [conditionTag: string]: LisanLiteral;
    };
  };
}
```

## Lisan Literal

**Lisan Literal** is a **string** and must have a valid Javascript
[Template Literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
syntax. However, the text is not enclosed with backtick
([grave accent](https://en.wikipedia.org/wiki/Grave_accent))
character but with single (') or double (") quote characters.

Template Literal is a great and powerful feature of javascript
allowing to have embedded expressions. **However**, to avoid security risks and
make interpolation rules easy to understand,
almost every embed expression is forbidden.

Only variables and a handful of [call expressions](#allowed-functions)
are allowed in **Lisan Literal**.

Below, you can find the list of Lisan Literal rules and capabilities.

> You can also try [Lisan Online Compiler](/try-it-out) to see how translations
> are compiled into dictionaries.

### Plain Text

Lisan Literal can be a simple string.

```json
{
  "locale": "en-US",
  "entries": {
    /**
     * @compiledTo:
     *  { "simple.text.key": "Simple text" }
     */
    "simple.text.key": "Simple text"
  }
}
```

**Usage:**

```js
const text = lisan.t('simple.text.key');

console.log(text);
// Outputs: "Simple Text"
```

<hr>

### Interpolation

Lisan Literal can contain variables.

<!-- markdownlint-disable MD013 -->

```json
{
  "locale": "en-US",
  "entries": {
    /**
     * @compiledTo:
     *  { "interpolationExample": ({name, surname}) => `Hello ${name} ${surname}` }
     */
    "interpolationExample": "Hello ${name} ${surname}"
  }
}
```

<!-- markdownlint-enable MD013 -->

**Usage:**

```js
const text = lisan.t('interpolationExample', {
  name: 'John',
  surname: 'Doe',
});

console.log(text);
// Outputs: "Hello John Doe"
```

<hr>

### Accessing Child Properties of an Object

Lisan Literal can contain a deep object as a variable,
as long as the value of last child property is
**string** or **number**.

<!-- markdownlint-disable MD013 -->

```json
{
  "locale": "en-US",
  "entries": {
    /**
     * @compiledTo:
     *  { "deep-object": ({info}) => `Hi ${info.person.name} ${info.person.surname}` }
     */
    "deep-object": "Hi ${info.person.name} ${info.person.surname}"
  }
}
```

<!-- markdownlint-enable MD013 -->

**Usage:**

```js
const data = {
  person: {
    name: 'John',
    surname: 'Doe',
  },
};

const text = lisan.t('deep-object', data);

console.log(text);
// Outputs: "Hi John Doe"
```

<hr>

### Escaping

Lisan Literal can contain escaped placeholders,
in that case, the expression is ignored.

```json
{
  "locale": "en-US",
  "entries": {
    /**
     * @compiledTo:
     *  { "escaped_exp": ({name}) => `Hello ${name} \${surname}` }
     */
    "escaped_exp": "Hello ${name} \\${surname}"
  }
}
```

**Usage:**

```js
const text = lisan.t('escaped_exp', {
  name: 'John',
  surname: 'Doe',
});

console.log(text);
// Outputs: "Hello John ${surname}"
```

<hr>

### Nested Translations

Lisan Literal can contain the [`lisan.t()`](/docs/full-api-reference#lisantkey-placeholders)
method.

```json
{
  "locale": "en-US",
  "entries": {
    "a.simple.text": "Simple text",

    /**
     * @compiledTo:
     *  { "tInception": ({name}, {t}) => `This is a ${t('a.simple.text')}.` }
     */
    "tInception": "This is a ${t('a.simple.text')}."
  }
}
```

**Usage:**

```js
const text = lisan.t('tInception');

console.log(text);
// Outputs: "This is a Simple text."
```

<hr>

### Interpolation in Nested Translations

Lisan Literal can contain the [`lisan.t()`](/docs/full-api-reference#lisant)
method with variables.

<div class="warning-block">

> **Caution**
>
> All variables must be passed to `t()` function as
> an object with
> [shorthand property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015).

</div>

```json
{
  "locale": "en-US",
  "entries": {
    "greetings.hello": "Hello ${name} ${surname}",
    /**
     * @compiledTo:
     *  { "fun.stuff": ({day, name, surname}, {t}) =>
     *        `Today is ${day}! ${t('greetings.hello', {name, surname})}` }
     */
    "fun.stuff": "Today is ${day}! ${t('greetings.hello', {name, surname})}"
  }
}
```

**Usage:**

```js
const text = lisan.t('fun.stuff', {
  day: 'Monday',
  name: 'John',
  surname: 'Doe',
});

console.log(text);
// Outputs: "Today is Monday! Hello John Doe."
```

<hr>

### Conditional Groups

[`Conditional Groups`](/docs/conditional-groups) is a very useful concept to
easily achieve logical interpolations such as **pluralization**.

<div class="warning-block">

> **Hint**
>
> Please note that Conditional Group Keys used in [`lisan.c()`](/docs/full-api-reference#lisanckey-value-placeholders)
> method and **not** with `lisan.t()`.

</div>

<!-- markdownlint-disable MD013 -->

```json
{
  "locale": "en-US",
  "entries": {
    "hello": "Hello ${name}",

    // Conditional Group Key
    "verb.present.be": {
      // Condition Tag: LisanLiteral
      "one": "is",
      "other": "are"
    },

    "child": {
      "one": "child",
      "other": "children"
    },

    /**
     * @compiledTo:
     *  { "wow": ({name, numberOfKids}, {c, t}) =>
     *    `${t('hello', {name})}. There ${c('verb.present.be', numberOfKids)} ${numberOfKids} ${c('child', numberOfKids)}`}
     */
    "wow!": "${t('hello', {name})}. There ${c('verb.present.be', numberOfKids)} ${numberOfKids} ${c('child', numberOfKids)}"
  }
}
```

<!-- markdownlint-enable MD013 -->

**Usage:**

```js
lisan.c('verb.present.be', 1); // Returns: "is"
lisan.c('verb.present.be', 2); // Returns: "are"

const text1 = lisan.t('wow!', {
  name: 'John',
  numberOfKids: 1,
});

console.log(text1);
// Outputs: "Hello John. There is 1 child."

const text2 = lisan.t('wow!', {
  name: 'Jane',
  numberOfKids: 3,
});

console.log(text2);
// Outputs: "Hello Jane. There are 3 children."
```

<hr>

### Interpolation in Conditional Groups

Interpolation with Conditional Groups is the same as LisanLiteral entries.

<div class="warning-block">

> **Caution**
>
> All variables must be passed to `c()` function as
> an object with
> [shorthand property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015).

</div>

<!-- markdownlint-disable MD013 -->

```json
{
  "locale": "en-US",
  "entries": {
    // Conditional Group Key
    "item.error": {
      // Condition Tag: LisanLiteral
      "zero": "You still don't have a ${item}, buy one now?",
      "other": "You can't buy more than 1 ${item}, sorry."
    },

    /**
     * @compiledTo:
     *  { "actually key can be a sentence as well":
     *    ({numberOfItems, item}) => `Ooops! ${c('item.error', numberOfItems, {item)}`
     */
    "actually key can be a sentence as well!": "Ooops! ${c('item.error', numberOfItems, {item)}"
  }
}
```

<!-- markdownlint-enable MD013 -->

**Usage:**

```js
const text1 = lisan.t('actually key can be a sentence as well!', {
  numberOfItems: 0,
  item: 'sofa',
});

console.log(text1);
// Outputs: "Ooops! You still don't have a sofa, buy one now?."

const text2 = lisan.t('actually key can be a sentence as well!', {
  numberOfItems: 2,
  item: 'chair',
});

console.log(text2);
// Outputs: "Ooops! You can't buy more than 1 chair, sorry."
```

### Missing Keys

If an entry is missing t function returns the entry key.

<div class="hint-block">

> **Hint**
>
> If you'd like to log missing entries or have a custom
> behaviour you can check
> [Loging suspicious entries](/docs/how-to-write-plugins#example-2---logging-suspicious-entries)
> example on [How to write plugins?](/docs/how-to-write-plugins) section.

</div>

```json
{
  "locale": "en-US",
  "entries": {
    "How do you bend the spoon?": "Maybe spoon does not exist, but this entry does!"
  }
}
```

**Usage:**

```js
const text1 = lisan.t('How do you bend the spoon?');

console.log(text1);
// Outputs: "Maybe spoon does not exist, but this entry does!"

const text2 = lisan.t('This is not the entry you are looking for!');

console.log(text2);
// Outputs: "This is not the entry you are looking for!"
```

### Using Formatters Inside Entries

[`lisan.addFormatters()`](/docs/full-api-reference#lisanaddformattersformatters)
method allows you to add formatter functions to **transform** values
into desired format.

```json
{
  "locale": "en-US",
  "entries": {
    /**
     * @compiledTo:
     *  { "tInception": ({date}, {dateTime}) => `Today is ${dateTime(date)}.` }
     */
    "today.message": "Today is ${dateTime(date)}."
  }
}
```

**Usage:**

```js
const text = lisan.t('today.message', {
  date: new Date('2020-01-01 13:03:22'),
});

console.log(text);
// Outputs: "Today is 01 January 2020, 01:03 PM."
```

<div class="warning-block">

> **Warning**
>
> Before using formatters, formatters **have to be** registered
> to lisan instance via [`lisan.addFormatters()`](/docs/full-api-reference#lisanaddformattersformatters).

</div>

> For more information, see: [Formatters](/docs/formatters)

## Allowed Functions

### t function

```json
{
  /**
   * @compiledTo:
   *  {
   *    "key": ({param1, param2}, {t}) => `${t('entryKey', {param1, param2})}`
   *  }
   */
  "key": "${t('entryKey', {param1, param2})}"
}
```

- The first argument is the translation key.
- The second argument is a JSON object **enforced** with
  shorthand syntax and being used for interpolation.
  The arguments that were provided can be **number** or **string**
  or **object** containing [nested object properties](/docs/translations#accessing-nested-object-properties).

### c function

<!-- markdownlint-disable MD013 -->

```json
{
  /**
   * @compiledTo:
   *  {
   *    "key": ({param1, param2, value}, {c}) => `${c('condtionalGroupKey', value, {param1, param2})}`
   *  }
   */
  "key": "${c('condtionalGroupKey', value, {param1, param2})}"
}
```

<!-- markdownlint-enable MD013 -->

- The first argument is a conditional group key.
- The second argument is the value that will be passed down to
  [condition functions](/docs/conditional-groups#condition-function).
- The third argument is a JSON object **enforced** with
  shorthand syntax and being used for interpolation.
  The arguments that were provided can be **number** or **string**
  or **object** containing [nested object properties](/docs/translations#accessing-nested-object-properties).

### Formatters

Any formatter function that was registered via
[`lisan.addFormatters()`](/docs/full-api-reference#lisanaddformattersformatters)
method can be used in Lisan Literals.

For more information, see: [Formatters](/docs/formatters)
