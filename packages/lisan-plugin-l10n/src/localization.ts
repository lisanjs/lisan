import * as TSLisan from 'lisan-types';

type TokenizedDateFn = (time: Date | number) => string;

const str = (num: number): string => num.toString();
const pad = (num: number, length = 2): string => {
  const numStr = str(num);
  if (numStr.length >= length) {
    return numStr;
  }

  return numStr.padStart(length, '0');
};

const printNumber = (
  num: number,
  { grouping, fraction, zeroFormat, nullFormat }: TSLisan.NumberFormatOptions,
): string => {
  if (num === null) {
    return nullFormat !== null ? nullFormat : 'null';
  }

  if (num === 0) {
    return zeroFormat !== null ? zeroFormat : '0';
  }

  const sign = num < 0 ? '-' : '';
  const numAbs = Math.abs(num);
  const numStr =
    fraction.digits > -1 ? numAbs.toFixed(fraction.digits) : str(numAbs);

  const [intPart, decimalPart] = numStr.split('.');

  let intPartGrouped = intPart;
  const blocksLength = grouping.blocks.length;

  if (blocksLength > 0 && grouping.delimiters.length > 0) {
    let endIndex = intPart.length;
    let delimiter = '';
    let blockIndex = 0;

    intPartGrouped = '';

    while (endIndex > 0) {
      const groupLength = grouping.blocks[blockIndex];
      const startIndex = Math.max(endIndex - groupLength, 0);

      const group = intPart.substring(startIndex, endIndex);
      intPartGrouped = `${group}${intPartGrouped}`;

      if (startIndex === 0) {
        break;
      }
      delimiter = grouping.delimiters[blockIndex] || delimiter;
      intPartGrouped = `${delimiter}${intPartGrouped}`;
      endIndex = startIndex;
      if (blockIndex < blocksLength - 1) {
        blockIndex += 1;
      }
    }
  }

  return `${sign}${intPartGrouped}${
    decimalPart ? `${fraction.delimiter}${decimalPart}` : ''
  }`;
};

const $q = ($month: number): number => Math.ceil(($month + 1) / 3);

const $h = (hours: number): number => hours % 12 || 12; // the hour '0' should be '12'

const $k = (hours: number): number => hours || 24; // the hour '0' should be '24'

const $w = (time: number): number => {
  const date = new Date(time);
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  const week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((time - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) /
        7,
    )
  );
};

/**
 * @todo
 * timezones: [
 * {name:"UTC", offset:"-000"},
 * {name:"GMT", offset:"-000"},
 * {name:"EST", offset:"-0500"},
 * {name:"EDT", offset:"-0400"},
 * {name:"CST", offset:"-0600"},
 * {name:"CDT", offset:"-0500"},
 *  {name:"MST", offset:"-0700"},
 * {name:"MDT", offset:"-0600"},
 * {name:"PST", offset:"-0800"},
 * {name:"PDT", offset:"-0700"}
 * ]
 * */
const $z = (timezoneOffset: number): string => {
  // Because a bug at FF24, we're rounding the timezone offset around 15 minutes
  // https://github.com/moment/moment/pull/1871
  const fixedOffset = Math.abs(Math.round(timezoneOffset / 15) * 15);
  const hourOffset = Math.floor(fixedOffset / 60);
  const minuteOffset = fixedOffset % 60;
  return `${timezoneOffset <= 0 ? '+' : '-'}${pad(Math.abs(hourOffset))}:${pad(
    minuteOffset,
  )}`;
};

const $DDD = (
  fullYear: number,
  time: number,
  timezoneOffset: number,
): number => {
  const start = new Date(fullYear, 0, 0);
  const diff =
    time -
    start.getTime() +
    (start.getTimezoneOffset() - timezoneOffset) * 60 * 1000;

  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

const detokenizeDates = ({
  mask,
  months,
  monthsShort,
  weekdays,
  weekdaysShort,
  weekdaysMin,
  amPm,
  ordinal,
}: {
  mask: string;
  months: string[];
  monthsShort: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  weekdays: string[];
  amPm: string[];
  ordinal: (num: number) => string;
}): TokenizedDateFn => {
  const r1 = new RegExp(
    /YYYY|YY|Mo|M{1,4}|wo|w{1,2}|Qo|Q|Do|DDDo|D{1,4}|do|d{1,4}|([Hhskm])\1?|S{1,3}|Z{1,2}|[aA]|X|x/,
    'gm',
  );
  let result: RegExpExecArray | null;
  const arr: Array<string | string[]> = [];
  const matchedTokens: string[] = [];
  let lastIndex = 0;
  // eslint-disable-next-line no-cond-assign
  while ((result = r1.exec(mask)) !== null) {
    const word = result[0];
    const endIndex = r1.lastIndex - word.length;
    if (endIndex > 0) {
      arr.push([mask.substring(lastIndex, endIndex)]);
    }
    arr.push(word);
    matchedTokens.push(word);
    lastIndex = r1.lastIndex;
  }

  const getTokens = ($d: Date): Record<string, string> => {
    const month = $d.getMonth();
    const day = $d.getDay();
    const fullYear = $d.getFullYear();
    const date = $d.getDate();
    const time = $d.getTime();
    const hours = $d.getHours();
    const minutes = $d.getMinutes();
    const seconds = $d.getSeconds();
    const milliSeconds = $d.getMilliseconds();
    const timezoneOffset = $d.getTimezoneOffset();

    const $$q = $q(month);
    const $$DDD = $DDD(fullYear, time, timezoneOffset);
    const $$w = $w(time);
    const $$h = $h(hours);
    const $$k = $k(hours);
    const $$a = amPm[hours >= 0 && hours < 12 ? 0 : 1];

    const tokenFns = {
      MMMM: (): string => months[month],
      MMM: (): string => monthsShort[month],
      MM: (): string => pad(month + 1),
      Mo: (): string => ordinal(month + 1),
      M: (): string => str(month + 1),

      Qo: (): string => ordinal($$q),
      Q: (): string => str($$q),

      DDDD: (): string => pad($$DDD, 3),
      DDDo: (): string => ordinal($$DDD),
      DDD: (): string => str($$DDD),
      DD: (): string => pad(date),
      Do: (): string => ordinal(date),
      D: (): string => str(date),

      dddd: (): string => weekdays[day],
      ddd: (): string => weekdaysShort[day],
      dd: (): string => weekdaysMin[day],
      do: (): string => ordinal(day),
      d: (): string => str(day),

      w: (): string => str($$w),
      wo: (): string => ordinal($$w),
      ww: (): string => pad($$w),

      YYYY: (): string => str(fullYear),
      YY: (): string => str(fullYear % 100),

      A: (): string => $$a.toUpperCase(),
      a: (): string => $$a,

      H: (): string => str(hours),
      HH: (): string => pad(hours),

      h: (): string => str($$h),
      hh: (): string => pad($$h),

      k: (): string => str($$k),
      kk: (): string => pad($$k),

      m: (): string => str(minutes),
      mm: (): string => pad(minutes),

      s: (): string => str(seconds),
      ss: (): string => pad(seconds),

      S: (): string => str(Math.floor(milliSeconds / 100)),
      SS: (): string => pad(Math.floor(milliSeconds / 10)),
      SSS: (): string => pad(milliSeconds, 3),

      Z: (): string => $z(timezoneOffset),
      ZZ: (): string => $z(timezoneOffset).replace(':', ''),

      X: (): string => str(Math.floor(time / 1000)),
      x: (): string => str(time),
    };

    const tokens: Record<string, string> = {};
    matchedTokens.forEach(matchedToken => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      tokens[matchedToken] = tokenFns[matchedToken]();
    });

    return tokens;
  };

  return (time: number | Date): string => {
    const $d = typeof time === 'number' ? new Date(time) : time;

    const tokens = getTokens($d);

    let output = '';

    arr.forEach((item): void => {
      const token = tokens[item as string];
      if (token) {
        output += token;
        return;
      }

      output += item[0];
    });

    return output;
  };
};

const generateLocalizationFormatters = ({
  date,
  ordinal = (x: number): string => x.toString(),
  number: numberOptions,
  currency: currencyOptions,
}: TSLisan.LocaleConfig): TSLisan.FormatFunctions => {
  const l = {} as TSLisan.FormatFunctions;

  if (numberOptions) {
    l.number = (num: number): string => printNumber(num, numberOptions);
  }

  if (currencyOptions?.template) {
    l.currency = (num: number): string => {
      const options = {
        ...numberOptions,
        ...currencyOptions,
      };

      const number = printNumber(num, options as TSLisan.NumberFormatOptions);
      return `${options.template(number)}`;
    };
  }

  l.ordinal = (num: number): string => ordinal(num);

  if (date) {
    Object.keys(date.masks).forEach((maskName): void => {
      const mask = date.masks[maskName as keyof TSLisan.DateMasks];
      l[maskName as keyof TSLisan.DateMasks] = detokenizeDates({
        mask,
        ...date,
        ordinal,
      });
    });
  }

  return l;
};

export { generateLocalizationFormatters };
