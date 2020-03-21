export default {
  name: 'en-US',

  // Number formating options
  number: {
    grouping: {
      delimiters: [','],
      blocks: [3],
    },
    fraction: {
      delimiter: '.',
      digits: -1,
    },
    zeroFormat: '0',
    nullFormat: '0',
  },

  // Currency formating options
  currency: {
    fraction: {
      delimiter: '.',
      digits: 2,
    },
    template(formattedNumber: string): string {
      return `$${formattedNumber}`;
    },
  },

  // Ordinal formating options
  ordinal(number: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const remaining = number % 100;
    return (
      number +
      (suffixes[(remaining - 20) % 10] || suffixes[remaining] || suffixes[0])
    );
  },

  // Date formating options
  date: {
    masks: {
      dateTime: 'YYYY-MM-DD HH:mm:ss.SSS',
      dateShort: 'MM/DD/YY',
      dateMedium: 'MM/DD/YYYY',
      dateLong: 'MMMM D, YYYY HH:mm',
      dateFull: 'dddd, MMMM D, YYYY HH:mm',
      timeShort: 'h:mm A',
      timeMedium: 'h:mm:ss A',
      timeLong: 'h:mm:ss.SSS A',
    },
    amPm: ['am', 'pm'],

    // weeks
    weekdays: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],

    // months
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthsShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
};
