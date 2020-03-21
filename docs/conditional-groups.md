---
id: conditional-groups
title: Conditional Groups
---

Lisan provides a flexible and powerful way of having conditional translations.

If a Dictionary Entry is an **object**, it is considered as a **Conditional Group**.<br>
In that case **Entry Key** of the object
is also called [Conditional Group Key](#conditional-group-key).

> Conditional Groups are especially useful to achieve [Pluralization](/docs/pluralization).

## Type Signature

```ts
interface Dictionary {
  entries: {
    [ConditionalGroupKey: string]: {
      [ConditionTag: string]: DictionaryEntry;
    };
  };
}
```

<hr>

## Vocabulary

### Conditional Group Key

A `Conditional Group Key` is a **unique string** defined in the Dictionary
and its value can be **anything** defined by the user.

### Condition Tag

A `Condition Tag` is a **string** and it has to have a corresponding
[Condition Function](#condition-function).

> The tags `zero`, `one`, `other` is predefined and cannot be replaced.
> See: [Reserved Words](#reserved-words)

### Condition Function

A `Condition Function` can take **any** type of data as input
and returns a `boolean` value.

When a [Condition Tag](#condition-tag) was linked to a
[Dictionary Entry](/docs/dictionary#entries),
the correspondent Condition Function will be invoked with the given value.
If the Condition Function returns `true`, that
Dictionary Entry will be used
by the [`lisan.c()`](/docs/full-api-reference#lisanckey-value-placeholders) function.

<div class="warning-block">

> **Warning**
>
> Condition Function must return a **boolean** value.
> The comparisson is done with strict equal.

</div>

#### Adding New Conditions

Condition functions can be added via
[`lisan.addConditions()`](/docs/full-api-reference#lisanaddconditionsconditions)
method, and must be added before adding dictionaries.

> If you are using
> [lisan-plugin-l10n](/docs/lisan-plugin-l10n#locale-configuration)
> plugin, you can define condition tags and functions
> with [`conditions`](/docs/lisan-plugin-l10n#conditions) property.

<hr>

## How do Conditional Tags work?

When [`c(conditionalGroupKey, value, placeholders)`](/docs/full-api-reference#lisanckey-value-placeholders)
method was invoked, the given `value` is passed to the **Condition Function**
by the **order of conditional tags** defined in Conditional Group.

> The order of `other` tag in the group is not important
> because `other` is **only** invoked as a fallback function.

If the Condition Function returns `true` for the given `value`,
the [`lisan.c()`](/docs/full-api-reference#lisantkey-placeholders)
method will return related Dictionary Entry.

The `lisan.c()` method
will return the first matching result and
the rest of the conditional tags will be **ignored**.

### Example

The example below may not be an ideal use case,
however, it's a good example
to demonstrate how [`lisan.c()`](/docs/full-api-reference#lisanckey-value-placeholders)
method works.

```js
// 1. First we are adding our condition tags & functions
lisan.addConditions({
  // "Condition Tag": Condition Function,
  success: status => status === 0,
  error: status => status === 1,
  blocked: status => status === 2,
});

// 2. Now we are adding a diftionary that
// uses the condition tags we previously defined.
lisan.add({
  entries: {
    // "Conditional Group Key":
    'signup.messages': {
      // "Condition Tag": Dictionary Entry,
      other: ({ code }) =>
        `Ooops, something really went wrong! Error Code: ${code}.`,
      success: ({ name }) => `Hey ${name}, you have succesfully logged in!`,
      error: 'The email or password is wrong!',
      blocked: ({ minutes }) =>
        `Sorry :( Your account has been blocked for the next ${minutes} minutes.`,
    },
  },
});

lisan.c('signup.messages', 0, { name: 'John' });
// Returns: "Hey John, you have succesfully logged in!"

lisan.c('signup.messages', 1);
// Returns: "The email or password is wrong!"

lisan.c('signup.messages', 2, { minutes: 10 });
// Returns: "Your account has been blocked for the next 10 minutes."

lisan.c('signup.messages', 'fatality', { code: 'TS2029' });
// Returns: "Ooops, something really went wrong! Error Code: TS2029."
```

In the example above;

- `signup.messages` is a **Conditional Group Key**.
- `success`, `error` and `blocked` are **Condition Tags**.

```js
lisan.c('signup.messages', 'error');
```

When [`lisan.c()`](/docs/full-api-reference#lisanckey-value-placeholders) method
was called with the arguments in the code piece above,

1. Condition Function with key `success` will be will return **false**.
2. Condition Function with key `error` will be will return **true**.
3. The rest of the conditional tags will be ignored since we have a match.

> **Notice**
>
> Even though `other` tag was defined as the first tag in the group,
> it was ignored by c function and used only when there were no
> matching case.

<hr>

## Reserved Words

Following keys can not be used as Conditional Tags because they are being used
by lisan internally.

- `zero`, returns true if the given value is a **number** and equals to `0`.
- `one`, returns true if the given value is a **number** and equals to `1`.
- `other` is a **fallback** Condition Tag and being used
  if **none** of the conditions match for the given value.
