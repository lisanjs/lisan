---
id: lisan-plugins
title: Plugins
---

**Lisan** was designed to be as small
and light as possible to provide the best performance
and user experience.

Lisan, at its core, only manages dictionary entries. That's all.

If you do not need more features you **don't have to increase**
your bundle size. However, its functionalities can be extended
by adding plugins.

Lisan provides a [`lisan.use()`](/docs/full-api-reference#lisanusefn) method to
create better abstraction.

> You can learn more about writing your plugins,
> See: [How to write Lisan plugins?](/docs/how-to-write-plugins)

## Official Plugins

### Localization Plugin

Since localization can be achieved in different ways,
like using Javascript's [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
API or with another third party solution,
Lisan does not have a built-in localization capability.

However, it provides probably the **most performant**
localization plugin.

Visit here to learn more: [`lisan-plugin-l10n`](/docs/lisan-plugin-l10n)

### Loader Plugin

Since Lisan uses javascript objects that **contain functions**,
and not plain JSON objects, the dictionaries have to be
stored in Javascript files.

So, if you have an application that does lazy loading,
you'll need to import those dictionary files **dynamically**.

Again, since there are plenty of ways to dynamically import
javascript files like using
[import() expression](https://v8.dev/features/dynamic-import),<br>
[ES Modules in Browsers](https://v8.dev/features/modules#browser)
or a third-party library like [requireJS](https://requirejs.org/) etc.,
instead of forcing developers to use one builtin solution, Lisan provides
a loader plugin.

Visit here to learn more: [`lisan-plugin-loader`](/docs/lisan-plugin-loader)
