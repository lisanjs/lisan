import * as TSLisan from 'lisan-types';

interface Expectation {
  input: number | Date;
  output: string;
}

interface PrepareResult {
  localeConfig: TSLisan.LocaleConfig;
  delta: object;
}

interface Scenario {
  prepare: (localeConfig: TSLisan.LocaleConfig) => PrepareResult;
  expectations: Expectation[];
}

interface Case {
  method: string;
  scenarios: Scenario[];
}

const prepareDateBase = (
  localeConfig: TSLisan.LocaleConfig,
): TSLisan.LocaleConfig => ({
  ...localeConfig,
  ordinal: (num): string => `${num}#ORDINAL$`,
  date: {
    masks: {
      dateTime: 'DD MMMM YYYY HH:mm:ss.SSS',
      dateShort: 'DD/MM/YYYY',
      dateMedium: 'MMM D, YYYY',
      dateLong: 'MMMM D, YYYY',
      dateFull: 'dddd, MMMM D, YYYY',
      timeShort: 'HH:mm',
      timeMedium: 'HH:mm:ss',
      timeLong: 'HH:mm:ss.SSS',
    },
    amPm: ['dummy_AM', 'dummy_PM'],

    // weeks
    weekdays: [
      'WEEKDAY_0',
      'WEEKDAY_1',
      'WEEKDAY_2',
      'WEEKDAY_3',
      'WEEKDAY_4',
      'WEEKDAY_5',
      'WEEKDAY_6',
    ],
    weekdaysShort: [
      'W_DAY_0',
      'W_DAY_1',
      'W_DAY_2',
      'W_DAY_3',
      'W_DAY_4',
      'W_DAY_5',
      'W_DAY_6',
    ],
    weekdaysMin: ['WD_0', 'WD_1', 'WD_2', 'WD_3', 'WD_4', 'WD_5', 'WD_6'],

    // months
    months: [
      'MONTH_0',
      'MONTH_1',
      'MONTH_2',
      'MONTH_3',
      'MONTH_4',
      'MONTH_5',
      'MONTH_6',
      'MONTH_7',
      'MONTH_8',
      'MONTH_9',
      'MONTH_10',
      'MONTH_11',
    ],
    monthsShort: [
      'MTH_0',
      'MTH_1',
      'MTH_2',
      'MTH_3',
      'MTH_4',
      'MTH_5',
      'MTH_6',
      'MTH_7',
      'MTH_8',
      'MTH_9',
      'MTH_10',
      'MTH_11',
    ],
  },
});

export { Scenario, Case, prepareDateBase, PrepareResult };
