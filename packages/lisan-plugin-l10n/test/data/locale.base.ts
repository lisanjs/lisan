export default {
  // Name of the locale
  name: 'Locale-Base',

  conditions: {},

  // Number formating options
  number: {
    grouping: {
      delimiters: [],
      blocks: [],
    },
    fraction: {
      delimiter: '',
      digits: 0,
    },
    zeroFormat: '',
    nullFormat: '',
  },

  // Currency formating options
  currency: {
    template: undefined,
  },

  // Ordinal formating options
  ordinal: undefined,

  // Date formating options
  date: {
    masks: {
      dateTime: '',
      dateShort: '',
      dateMedium: '',
      dateLong: '',
      dateFull: '',
      timeShort: '',
      timeMedium: '',
      timeLong: '',
    },
    amPm: [],

    // weeks
    weekdays: [],
    weekdaysShort: [],
    weekdaysMin: [],

    // months
    months: [],
    monthsShort: [],
  },
};
