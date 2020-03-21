---
id: pluralization
title: Pluralization
---

Pluralization is achieved by using [Conditional Groups](/docs/conditional-groups).

There are different [plural forms](https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals)
based on the languages. For instance, English has [2 forms](<https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals#Plural_rule_1_(2_forms)>)

Lisan comes with 3 [built-in tags](/docs/conditional-groups#reserved-words)
`zero`, `one`, `other` to support at least 3 forms.

## Simple Pluralization Example for English

```js
const { lisan } = require('lisan');

lisan.add({
  entries: {
    'plural.child': {
      one: 'child',
      other: 'children',
    },
    'plural.be': {
      one: 'is',
      other: 'are',
    },
    'plural.s.suffix': {
      one: () => `${word}`,
      other: () => `${word}s`,
    },
    sentence: ({ numChild, numToy }) =>
      `${numChild} ${c('plural.child', numChild)} ${c(
        'plural.be',
        numChild,
      )} playing with ${numToy} ${c('plural.s.suffix', numToy, { toy })}.`,
  },
});

lisan.t('sentence', { numChild: 3, numToy: 1, toy: 'computer' });
// Returns: "3 children are playing with 1 computer."

lisan.t('sentence', { numChild: 1, numToy: 1, toy: 'computer' });
// Returns: "1 child is playing with 1 computer."

lisan.t('sentence', { numChild: 1, numToy: 2, toy: 'computer' });
// Returns: "1 child is playing with 2 computers."

lisan.t('sentence', { numChild: 3, numToy: 2, toy: 'computer' });
// Returns: "3 children are playing with 2 computers."
```

## Supporting Complex Pluralization Forms

When you need to support more plural forms,
you can use [`lisan-plugin-l10`](/docs/lisan-plugin-l10).

### Example

Here, you can find the pluralization for [Arabic](<https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals#Plural_rule_12_(6_forms)>)

The Arabic language has **6** pluralization forms.
We only defined **3** extra [condition tags](/docs/conditional-groups#condition-tag)
in locale configuration because
[built-in tags](/docs/conditional-groups#reserved-words)
`zero`, `one`, `other` satisfy remaining 3 forms.

```js
const { lisan } = require('lisan');
const { Localization } = require('lisan-plugin-l10n');

lisan.use(Localization);

lisan.setLocale({
  name: 'ar',
  conditions: {
    // pluralization for Arabic
    two: num => num === 2,
    '00-02': num => (num % 100 >= 0 || num % 100 <= 2) && num > 2,
    '03-10': num => num % 100 >= 3 || num % 100 <= 9,
  },
});

lisan.add({
  entries: {
    'a.word.with.6.forms': {
      zero: 'Form 0',
      one: 'Form 1',
      two: 'Form 2',
      '03-10': 'Form 03-10',
      '02-10': 'Form 02-10',
      other: 'Form Fallback',
    },
    sentence: ({ numChild }) =>
      `The following form will be used: ${c('a.word.with.6.forms', numChild)}`,
  },
});

lisan.t('sentence', { numChild: 0 });
// Returns: "The following form will be used: Form 0."

lisan.t('sentence', { numChild: 1 });
// Returns: "The following form will be used: Form 1."

lisan.t('sentence', { numChild: 2 });
// Returns: "The following form will be used: Form 2."

lisan.t('sentence', { numChild: 104 });
// Returns: "The following form will be used: Form 03-10."

lisan.t('sentence', { numChild: 100 });
// Returns: "The following form will be used: Form 02-10."

lisan.t('sentence', { numChild: 39 });
// Returns: "The following form will be used: Form Fallback."
```
