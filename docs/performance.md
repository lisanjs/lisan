---
id: performance
title: Performance
---

Lisan is **super fast** because it doesn't interpolate strings
by finding and replacing placeholders in the translation templates.
Instead, it relies on template literals which are pure string
concatenation functions.

In average usage, Lisan is least 25x times faster than using regex replaces.
However, Lisan is at least 50x times faster when compared to the other i18n
libraries and taking their complexities into account.

## Benchmark.js

### With interpolation

<a href="/img/with-interpolation.png" target="_blank"><img src="/img/with-interpolation.png"></a>

<p align="center" style="font-size: 10px">
on MacBook Pro 2017, 2,8 GHz Quad-Core Intel Core i7 16 GB 2133 MHz LPDDR3
<p>

> As you can predict, Lisan gets **exponentially** faster if
> number of placeholders and localization functions increase.

### When there is no interpolation

Lisan is faster even on entries not containing placeholders.
Because it does not perform placeholder search.

<a href="/img/no-interpolation.png" target="_blank"><img src="/img/no-interpolation.png"></a>

<p align="center" style="font-size: 10px">
on MacBook Pro 2017, 2,8 GHz Quad-Core Intel Core i7 16 GB 2133 MHz LPDDR3
<p>

## Benchmark Repository

See benchmark repository
[https://github.com/lisanjs/benchmark](https://github.com/lisanjs/benchmark).

## JSPerf.com

See it yourself on
[https://jsperf.com/lisan-vs-regex/1](https://jsperf.com/lisan-vs-regex/1).
