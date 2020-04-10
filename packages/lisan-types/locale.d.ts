// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConditionFunction = (...params: any[]) => boolean;
type Conditions = Record<string, ConditionFunction>;

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

interface DateMasks {
  dateTime: string;
  dateShort: string;
  dateMedium: string;
  dateLong: string;
  dateFull: string;
  timeShort: string;
  timeMedium: string;
  timeLong: string;
}

interface LocaleConfig {
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

type LocalizationFormatters = {
  number: (number: number) => string;
  currency: (number: number) => string;
  ordinal: (number: number) => string;
  dateShort: (time: number | Date) => string;
  dateMedium: (time: number | Date) => string;
  dateLong: (time: number | Date) => string;
  dateFull: (time: number | Date) => string;
  timeShort: (time: number | Date) => string;
  timeMedium: (time: number | Date) => string;
  timeLong: (time: number | Date) => string;
  dateTime: (time: number | Date) => string;
};

export {
  LocaleConfig,
  DateMasks,
  NumberFormatOptions,
  Conditions,
  LocalizationFormatters,
};
