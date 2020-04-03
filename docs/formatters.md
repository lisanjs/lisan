---
id: formatters
title: Formatters
---

Any formatter function that was registered via
[`lisan.addFormatters()`](/docs/full-api-reference#lisanaddformattersformatters)
method can be used in Lisan Literals.

Formatters can be very useful when you'd like to transform values
into the desired format.

If you are using [lisan-plugin-l10n](/docs/lisan-plugin-l10n),
all [localization formatters](/docs/full-api-reference#localization-plugin)
will be available in Lisan Literal.

## Example 1 - Simple Number Formatting

```js
const { lisan } = require('lisan');

lisan.addFormatters({
  toFixed: num => num.toFixed(2),
  roundNumber: num => Math.round(num).toString(),
});

lisan.add({
  entries: {
    'rounded.number': ({ value }, { roundNumber, toFixed }) =>
      `${${toFixed(value)}} is rounded to ${roundNumber(value)}.`,
  },
});

const text = lisan.t('rounded.number', {
  value: 5.3123,
});

console.log(text);
// Outputs: "5.31 is rounded to 5."
```

## Example 2 - Using Localization Plugin

```js
const { lisan } = require('lisan');
const { Localization } = require('lisan-plugin-l10n');
const { enUS } = require('lisan-locales');

lisan.use(Localization);
lisan.setLocale(enUs);
// `dateTime` formatter is added by setLocale method.

lisan.add({
  entries: {
    'today.message': ({ date }, { dateTime }) => `Today is ${dateTime(date)}.`,
  },
});

const text = lisan.t('today.message', {
  date: new Date('2020-01-01 13:03:22'),
});

console.log(text);
// Outputs: "Today is 01 January 2020, 01:03 PM."
```
