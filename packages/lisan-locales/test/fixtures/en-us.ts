const toNumber = [
  {
    input: 1.123,
    output: '1.123',
  },
];

const toCurrency = [
  {
    input: 1.123,
    output: '$1.12',
  },
];

const toOrdinal = [
  {
    input: 0,
    output: '0th',
  },
  {
    input: 1,
    output: '1st',
  },
  {
    input: 2,
    output: '2nd',
  },
  {
    input: 3,
    output: '3rd',
  },
  {
    input: 4,
    output: '4th',
  },
  {
    input: 11,
    output: '11th',
  },
  {
    input: 12,
    output: '12th',
  },
  {
    input: 13,
    output: '13th',
  },
  {
    input: 21,
    output: '21st',
  },
];

const dateInput = new Date('2020-02-01 14:12:45.321');

const toDateTime = [
  {
    input: dateInput,
    output: '2020-02-01 14:12:45.321',
  },
];

const toDateShort = [
  {
    input: dateInput,
    output: '02/01/20',
  },
];

const toDateMedium = [
  {
    input: dateInput,
    output: '02/01/2020',
  },
];

const toDateLong = [
  {
    input: dateInput,
    output: 'February 1, 2020 14:12',
  },
];

const toDateFull = [
  {
    input: dateInput,
    output: 'Saturday, February 1, 2020 14:12',
  },
];

const toTimeShort = [
  {
    input: dateInput,
    output: '2:12 PM',
  },
];

const toTimeMedium = [
  {
    input: dateInput,
    output: '2:12:45 PM',
  },
];

const toTimeLong = [
  {
    input: dateInput,
    output: '2:12:45.321 PM',
  },
];

export default {
  toNumber,
  toCurrency,
  toOrdinal,
  toDateTime,
  toDateLong,
  toDateMedium,
  toDateShort,
  toDateFull,
  toTimeLong,
  toTimeMedium,
  toTimeShort,
};
