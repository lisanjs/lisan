const toNumber = [
  {
    input: 1.123,
    output: '1,123',
  },
];

const toCurrency = [
  {
    input: 1.123,
    output: '1,12 ₺',
  },
];

const toOrdinal = [
  {
    input: 1,
    output: "1'inci",
  },
  {
    input: 2,
    output: "2'nci",
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
    output: '01.02.2020',
  },
];

const toDateMedium = [
  {
    input: dateInput,
    output: '1 Şubat 2020',
  },
];

const toDateLong = [
  {
    input: dateInput,
    output: '1 Şubat 2020 14:12',
  },
];

const toDateFull = [
  {
    input: dateInput,
    output: 'Cumartesi, 1 Şubat 2020 14:12',
  },
];

const toTimeShort = [
  {
    input: dateInput,
    output: '14:12',
  },
];

const toTimeMedium = [
  {
    input: dateInput,
    output: '14:12:45',
  },
];

const toTimeLong = [
  {
    input: dateInput,
    output: '14:12:45.321',
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
