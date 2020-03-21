---
id: how-to-write-plugins
title: How to write Lisan plugins?
sidebar_label: Write Plugins
---

If you need to add new methods to lisan instance,
you can write your custom plugin.

## Plugin Function

Lisan plugins passed as an agrument to the [`lisan.use()`](/docs/full-api-reference/#lisanusefn)
method.

The `lisan` instance will be provided to the plugin function as an argument,
after that, you can mutate lisan instance or chance Lisan class prototype.

> If you'd like to create a plugin and share it with the community,<br>
> please use `lisan-plugin-<nameOfThePlugin>` naming convention.

## Example 1 - Adding alias to for `t` method

Here we are adding `lisan._t()` alias for [`lisan.t()`](/docs/full-api-reference/#lisantkey-placeholders)
method.

```js
const { lisan } = require('lisan');

const myCustomPlugin = lisanInstance => {
  lisanInstance._t = lisanInstance.t.bind(lisanInstance);
};

lisan.use(myCustomPlugin);

lisan._t('key');
```

### Adding Typescript Definitions

When you write your plugins, typescript compiler will complain about the
non-existent methods.

You can add the type definitions as below:

```ts
import 'lisan';
import * as TSLisan from 'lisan-types';

declare module 'lisan' {
  interface Lisan {
    _t: TSLisan.TMethod;
  }
}
```

## Example 2 - Logging suspicious entries

Here we are adding some console statements in case
there are unwanted behaviour.

```js
const { lisan } = require('lisan');

const myCustomPlugin = lisanInstance => {
  // Cloning the t function
  const t = lisanInstnace.t.bind(lisanInstance);

  // Overwriting the t method:
  lisanInstance.t = (key, placeholders) => {
    const result = t(key, placeholders);

    if (result === key) {
      console.log(`Entry is equal to its key: "${key}"`);
    }

    if (result === '') {
      console.log(`Entry is empty: "${key}"`);
    }

    return result;
  };
};

lisan.use(myCustomPlugin);

lisan.t('aSuspiciousKey');
```
