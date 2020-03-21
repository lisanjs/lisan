---
id: multiple-instances
title: Multiple Lisan Instances
sidebar_label: Multiple Instances
---

Lisan provides a default `lisan` instance for convenience
which can be imported from the module as below.

```js
const { lisan } = require('lisan');
```

## Custom Instance

If you need to have multiple lisan instances for any reason,
you can import `Lisan` class from the lisan package
and create a new lisan instance.

This instance will **not inherit** any entries or installed plugins
from the default `lisan` instance.

```js
const { Lisan } = require('lisan');

const myLisanInstance = new Lisan();

module.exports = myLisanInstance;
```
