---
id: lisan-plugin-l10n
title: Lisan Localization Plugin
sidebar_label: Localization
---

<!-- markdownlint-disable MD036 -->

Lisan localization plugin allows you
to format your data based on the locale.

## Installation

You can install lisan from the sources below, as you see fit.

### from npm

```bash
npm install lisan-plugin-l10n
```

### from CDN

<!-- prettier-ignore-start -->

<!-- markdownlint-disable MD013 -->

```html
<script src="https://unpkg.com/lisan-plugin-l10n/dist/index.umd.js" type="text/javascript"></script>
```

<!-- markdownlint-enable MD013 -->

<!-- prettier-ignore-end -->

After adding the script tag above, all public variables
will be accessible via `window.lisanPluginL10n` variables.

## Usage

```js
const { lisan } = require('lisan');
const { Localization } = require('lisan-plugin-l10n');
const { tr } = require('lisan-locales');

lisan.use(Localization);

lisan.setLocale(tr);

lisan.toOrdinal(3); // Returns: 3'üncü
```

<div class="hint-block">

> **Hint**
>
> Lisan provides [`Lisan Locales`](/docs/what-is-lisan-locales) package which
> contains production-ready Localization configurations.
>
> You can find the full list of Localization configs
> [here](https://github.com/lisanjs/lisan/tree/master/packages/lisan-locales).

</div>

## Methods

For the full list of methods, see [Lisan Localization API](/docs/full-api-reference#localization-plugin).

## Locale Configuration

**Type Signature**

```ts
interface Locale {
  name: string;

  conditions?: Conditions;

  number?: NumberFormatOptions;
  currency?: CurrencyFormatOptions;

  ordinal?: (num: number) => string;

  date?: {
    masks: DateMasks;
    amPm: string[];

    // weeks
    // Sunday is the first day
    weekdays: string[];
    weekdaysShort: string[];
    weekdaysMin: string[];

    // months
    months: string[];
    monthsShort: string[];
  };
}
```

### name

Type: **string** (Required)<br>
Default: `""`

`name` is a string with a [BCP 47](https://tools.ietf.org/html/bcp47)
language tag.

<hr>

### conditions

Type: **Conditions** (Optional)<br>
Default: `{}`

`conditions` is an object contains
[Condition Tag](/docs/conditional-groups#condition-tag) and
[Condition Functions](/docs/conditional-groups#condition-function).

`conditions` object will be passed down to
[`lisan.addConditions`](/docs/full-api-reference#lisanaddconditionsconditions)
method.

**Type Signature**

```ts
type ConditionFunction = (num: string | number) => boolean;
type Conditions = Record<string, ConditionFunction>;
```

> Condition keys are especially useful to achieve [Pluralization](/docs/pluralization).

<hr>

### number

Type: **NumberFormatOptions** (Optional)<br>
Default: `{}`

`number` takes number formatting options. When defined,
the `number` formatter will be available in translations and
[`lisan.toNumber`](/docs/full-api-reference#lisantonumbernumber)
method will be added to lisan instance.

Number formatting options have the following type definition.

**Type Signature**

```ts
interface NumberFormatOptions {
  grouping: {
    delimiters: string[];
    blocks: number[];
  };
  fraction: {
    delimiter: string;
    digits: number;
  };
  zeroFormat: string;
  nullFormat: string;
}
```

#### `number.grouping`

This option is being used to format numbers to have groups.
Eg. thousand separators, lakh, wan

##### `number.grouping.blocks`

`blocks` is an `array` of numbers to define the length of each group.

- Grouping is done from `right` to `left` that means
  the first number in the array determines the last group length.
- The Grouping will continue by the **last** number in the array.

##### `number.grouping.delimiters`

`delimiters` is an `array` of numbers to define the delimiter of each group.

- Delimiters match with groups by the array `indices`.
- If the length of the `blocks` array is bigger than the length of delimiters,
  the last delimiter will be used for the rest of the groups.
- If the length of the `blocks` array is less than the length of delimiters,
  `registerLocale` method **throws** an `Exception`.

##### Grouping Examples

```js
const output = lisan.toNumber(12345678901234567890);
```

 <table class="table table-striped table-bordered">
  <tbody>
    <tr>
      <th><code>blocks</code></th>
      <th><code>delimiters</code></th>
      <th>Output</th>
    </tr>
    <tr>
      <td><code>[3]</code></td>
      <td><code>[',']</code></td>
      <td>12,345,678,901,234,567,890</td>
    </tr>
    <tr>
      <td><code>[3, 2]</code></td>
      <td><code>[',']</code></td>
      <td>1,23,45,67,89,01,23,45,67,890</td>
    </tr>
    <tr>
      <td><code>[3, 2]</code></td>
      <td><code>['-', '.']</code></td>
      <td>1.23.45.67.89.01.23.45.67-890</td>
    </tr>
    <tr>
      <td><code>[2, 1, 2, 3]</code></td>
      <td><code>['-', ' ', '#']</code></td>
      <td>12#345#678#901#234#56 7-90</td>
    </tr>
    <tr>
      <td><code>[3, 2, 2, 4]</code></td>
      <td><code>['-', ' ',' ','#']</code></td>
      <td>1#2345#6789#0123 45 67-890</td>
    </tr>
  </tbody>
</table>

<div class="info-block">

> **Info**
>
> Grouping configuration options were inspired by
> [cleave.js](https://github.com/nosir/cleave.js/blob/master/doc/options.md#blocks)
> configuration options.

</div>

#### number.floating

##### `number.floating.precision`

This option is used to define the length of the decimal points.

- If the length of decimal points is longer than `precision` value,
  the decimal points will be **rounded**.
- If `precision` is `0`, the floating-point will be hidden.
- If `precision` is `-1`, the floating-point will be printed as it is.

##### `number.floating.delimiter`

This option is used to define delimiter for the decimal point.

##### Decimal Point Examples

```js
const output = lisan.toNumber(1234.1234567);
```

 <table class="table table-striped table-bordered">
  <tbody>
    <tr>
      <th><code>precision</code></th>
      <th><code>delimiters</code></th>
      <th>Output</th>
    </tr>
    <tr>
      <td><code>0</code></td>
      <td><code>.</code></td>
      <td>1234</td>
    </tr>
    <tr>
      <td><code>-1</code></td>
      <td><code>.</code></td>
      <td>1234.1234567</td>
    </tr>
    <tr>
      <td><code>2</code></td>
      <td><code>.</code></td>
      <td>1234.12</td>
    </tr>
     <tr>
      <td><code>3</code></td>
      <td><code>,</code></td>
      <td>1234,123</td>
    </tr>
     <tr>
      <td><code>5</code></td>
      <td><code>#</code></td>
      <td>1234#12346</td>
    </tr>
  </tbody>
</table>

#### number.zeroFormat

This option is used to output a custom text when the given number equals `0`.

#### number.nullFormat

This option is used to output a custom text when the given number equals to `null`.

<hr>

### currency

Type: **CurrencyFormatOptions** (Optional)<br>
Default: `{}`

`currency` takes currency formatting options. When defined,
the `currency` formatter will be available in translations and
[`lisan.toCurrency`](/docs/full-api-reference#lisantocurrencyamount) method
will be added to lisan instance.

Currency formatting options have the following type definition.

**Type Signature**

```ts
interface CurrencyFormatOptions {
  grouping?: {
    delimiters: string[];
    blocks: number[];
  };
  fraction?: {
    delimiter: string;
    digits: number;
  };
  zeroFormat?: string;
  nullFormat?: string;
  template: (formattedNumber: string) => string;
}
```

<div class="hint-block">

> **Hint**
>
> `currency` inherits configuration from `number` configuration.
> So you can override any of the configurations.

</div>

```js
{
  "currency": {
    "floating": {
      "delimiter": ".",
      "precision": 2
    },
    "template": function(formattedNumber) {
      return "$" + formattedNumber;
    }
  }
}
```

#### `currency.template`

`template` is a function used to format price values.

<hr>

### ordinal

Type: **CurrencyFormatOptions** (Optional)<br>
Default: `x => x.toString()`

`ordinal` takes ordinal function.
The `ordinal` formatter is always available in translations and
[`lisan.toOrdinal`](/docs/full-api-reference#lisantoordinalnumber) method
is always added lisan instance.

**Type Signature**

```ts
{
  ordinal: (number: number) => string;
}
```

<hr>

### date

Type: **DateOptions** (Optional)<br>
Default: `{}`

`date` is being used to set the configuration for
various date formatters and
it has the following type definition.

```ts
interface DateOptions {
  masks: {
    dateTime: string;
    dateShort: string;
    dateMedium: string;
    dateLong: string;
    dateFull: string;
    timeShort: string;
    timeMedium: string;
    timeLong: string;
  };
  amPm: string[];

  // weeks
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];

  // months
  months: string[];
  monthsShort: string[];
}
```

#### date.masks

`date.masks` is being used to generate formatters with the same mask name:

- `dateTime`
- `dateShort`
- `dateMedium`
- `dateLong`
- `dateFull`
- `timeShort`
- `timeMedium`
- `timeLong`

These formatters then can be used in dictionaries as below:

```js
lisan.add({
  entries: {
    simpleExample: ({ date }, { dateTime }) =>
      `This is formatted ${dateTime(date)}`,
  },
});
```

Also a method is created for corresponding formatter.

- [`lisan.toDateTime()`](/docs/full-api-reference#lisantodatetimetime)
- [`lisan.toDateFull()`](/docs/full-api-reference#lisantodatefulltime)
- [`lisan.toDateLong()`](/docs/full-api-reference#lisantodatelongtime)
- [`lisan.toDateMedium()`](/docs/full-api-reference#lisantodatemediumtime)
- [`lisan.toDateShort()`](/docs/full-api-reference#lisantodateshorttime)
- [`lisan.toTimeLong()`](/docs/full-api-reference#lisantotimelongtime)
- [`lisan.toTimeMedium()`](/docs/full-api-reference#lisantotimemediumtime)
- [`lisan.toTimeShort()`](/docs/full-api-reference#lisantotimeshorttime)

#### date.amPm

`amPM` is an array. Only takes two string values in **lowercase** format,
first being the _am_ indicator and the second indicating _pm_.

#### date.weekdays

`weekdays` is an array and contains the names of the weekdays.
The first item of the array has to be **Sunday**.

#### date.weekdaysShort

Same as `date.weekdays`, but shorter day names (usually 3 letters, eg. Sat)

#### date.weekdaysMin

Same as `date.weekdays`, but shorter day names (usually 2 letters, eg. St).

#### date.months

`months` is an array and contains the names of the months.
The first item of the array has to be **January**.

#### date.monthsShort

Same as `date.months`, but shorter month names (usually 3 letters, eg. Jan).

## Date Formatting Tokens

<table class="table table-striped table-bordered">
  <tbody>
    <tr>
      <th></th>
      <th>Token</th>
      <th>Output</th>
    </tr>
    <tr>
      <td><b>Month</b></td>
      <td>M</td>
      <td>1 2 ... 11 12</td>
    </tr>
    <tr>
      <td></td>
      <td>Mo</td>
      <td>1st 2nd ... 11th 12th</td>
    </tr>
    <tr>
      <td></td>
      <td>MM</td>
      <td>01 02 ... 11 12</td>
    </tr>
    <tr>
      <td></td>
      <td>MMM</td>
      <td>Jan Feb ... Nov Dec</td>
    </tr>
    <tr>
      <td></td>
      <td>MMMM</td>
      <td>January February ... November December</td>
    </tr>
    <tr>
      <td><b>Quarter</b></td>
      <td>Q</td>
      <td>1 2 3 4</td>
    </tr>
    <tr>
      <td></td>
      <td>Qo</td>
      <td>1st 2nd 3rd 4th</td>
    </tr>
    <tr>
      <td><b>Day of Month</b></td>
      <td>D</td>
      <td>1 2 ... 30 31</td>
    </tr>
    <tr>
      <td></td>
      <td>Do</td>
      <td>1st 2nd ... 30th 31st</td>
    </tr>
    <tr>
      <td></td>
      <td>DD</td>
      <td>01 02 ... 30 31</td>
    </tr>
    <tr>
      <td><b>Day of Year</b></td>
      <td>DDD</td>
      <td>1 2 ... 364 365</td>
    </tr>
    <tr>
      <td></td>
      <td>DDDo</td>
      <td>1st 2nd ... 364th 365th</td>
    </tr>
    <tr>
      <td></td>
      <td>DDDD</td>
      <td>001 002 ... 364 365</td>
    </tr>
    <tr>
      <td><b>Day of Week</b></td>
      <td>d</td>
      <td>0 1 ... 5 6</td>
    </tr>
    <tr>
      <td></td>
      <td>do</td>
      <td>0th 1st ... 5th 6th</td>
    </tr>
    <tr>
      <td></td>
      <td>dd</td>
      <td>Su Mo ... Fr Sa</td>
    </tr>
    <tr>
      <td></td>
      <td>ddd</td>
      <td>Sun Mon ... Fri Sat</td>
    </tr>
    <tr>
      <td></td>
      <td>dddd</td>
      <td>Sunday Monday ... Friday Saturday</td>
    </tr>
    <tr>
      <td>
        <a href="https://en.wikipedia.org/wiki/ISO_week_date#First_week">
          <b>ISO Week Number of Year</b>
        </a>
      </td>
      <td>w</td>
      <td>1 2 ... 52 53</td>
    </tr>
    <tr>
      <td></td>
      <td>wo</td>
      <td>1st 2nd ... 52nd 53rd</td>
    </tr>
    <tr>
      <td></td>
      <td>ww</td>
      <td>01 02 ... 52 53</td>
    </tr>
    <tr>
      <td><b>Year</b></td>
      <td>YY</td>
      <td>70 71 ... 29 30</td>
    </tr>
    <tr>
      <td></td>
      <td>YYYY</td>
      <td>1970 1971 ... 2029 2030</td>
    </tr>
    <tr>
      <td><b>AM/PM</b></td>
      <td>A</td>
      <td>AM PM</td>
    </tr>
    <tr>
      <td></td>
      <td>a</td>
      <td>am pm</td>
    </tr>
    <tr>
      <td><b>Hour</b></td>
      <td>H</td>
      <td>0 1 ... 22 23</td>
    </tr>
    <tr>
      <td></td>
      <td>HH</td>
      <td>00 01 ... 22 23</td>
    </tr>
    <tr>
      <td></td>
      <td>h</td>
      <td>1 2 ... 11 12</td>
    </tr>
    <tr>
      <td></td>
      <td>hh</td>
      <td>01 02 ... 11 12</td>
    </tr>
    <tr>
      <td></td>
      <td>k</td>
      <td>1 2 ... 23 24</td>
    </tr>
    <tr>
      <td></td>
      <td>kk</td>
      <td>01 02 ... 23 24</td>
    </tr>
    <tr>
      <td><b>Minute</b></td>
      <td>m</td>
      <td>0 1 ... 58 59</td>
    </tr>
    <tr>
      <td></td>
      <td>mm</td>
      <td>00 01 ... 58 59</td>
    </tr>
    <tr>
      <td><b>Second</b></td>
      <td>s</td>
      <td>0 1 ... 58 59</td>
    </tr>
    <tr>
      <td></td>
      <td>ss</td>
      <td>00 01 ... 58 59</td>
    </tr>
    <tr>
      <td><b>Fractional Second</b></td>
      <td>S</td>
      <td>0 1 ... 8 9</td>
    </tr>
    <tr>
      <td></td>
      <td>SS</td>
      <td>00 01 ... 98 99</td>
    </tr>
    <tr>
      <td></td>
      <td>SSS</td>
      <td>000 001 ... 998 999</td>
    </tr>
    <tr>
      <td><b>Time Zone</b></td>
      <td>Z</td>
      <td>-07:00 -06:00 ... +06:00 +07:00</td>
    </tr>
    <tr>
      <td></td>
      <td>ZZ</td>
      <td>
        -0700 -0600 ... +0600 +0700
      </td>
    </tr>
    <tr>
      <td><b>Unix Timestamp</b></td>
      <td>X</td>
      <td>1360013296</td>
    </tr>
    <tr>
      <td><b>Unix Millisecond Timestamp</b></td>
      <td>x</td>
      <td>1360013296123</td>
    </tr>
  </tbody>
</table>
