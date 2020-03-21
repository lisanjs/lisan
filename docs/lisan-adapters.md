---
id: lisan-adapters
title: Adapters
---

**Lisan** is a library taking advantage of
[ES6 Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
to increase performance.

However, i18n is not a new topic and
there are already plenty of widely adopted solutions like
[ICU Message Format](http://userguide.icu-project.org/formatparse/messages),
[gettext](https://en.wikipedia.org/wiki/Gettext),
[PO files](https://www.icanlocalize.com/site/tutorials/how-to-translate-with-gettext-po-and-pot-files/)
etc.

Also considering projects might be relying on third-party
services like [transifex](https://www.transifex.com/) or
[crowdin](https://crowdin.com/).

To integrate Lisan with existing solutions, or make migration easier
for each integration, an adapter needs to be developed.

These adapters also will be pluggable into [Lisan CLI](/docs/what-is-lisan-cli).

## Official Adapters

Currently, Lisan does not provide any official Adapter
but they are certainly on our roadmap.

If you'd like to start writing an
adapter for a tool and like to promote it,
you are more than welcome to reach out to us.
