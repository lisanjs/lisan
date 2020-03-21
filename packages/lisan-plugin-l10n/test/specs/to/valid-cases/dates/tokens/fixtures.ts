const date = new Date('2020-01-01 03:02:05.089');
const x = date.getTime().toString();
const X = Math.floor(date.getTime() / 1000).toString();

const r1 = new RegExp(/GMT([+-]\d{4})/, 'gm');

const timezone = r1.exec(date.toString())[1];

export default [
  {
    // All tokens & first day of year
    date,
    tokens: {
      MMMM: 'MONTH_0',
      MMM: 'MTH_0',
      MM: '01',
      Mo: '1#ORDINAL$',
      M: '1',

      Qo: '1#ORDINAL$',
      Q: '1',

      DDDD: '001',
      DDDo: '1#ORDINAL$',
      DDD: '1',
      DD: '01',
      Do: '1#ORDINAL$',
      D: '1',

      dddd: 'WEEKDAY_3',
      ddd: 'W_DAY_3',
      dd: 'WD_3',
      do: '3#ORDINAL$',
      d: '3',

      w: '1',
      wo: '1#ORDINAL$',
      ww: '01',

      YYYY: '2020',
      YY: '20',

      A: 'DUMMY_AM',
      a: 'dummy_AM',

      H: '3',
      HH: '03',

      h: '3',
      hh: '03',

      k: '3',
      kk: '03',

      m: '2',
      mm: '02',

      s: '5',
      ss: '05',

      S: '0',
      SS: '08',
      SSS: '089',

      Z: [timezone.slice(0, 3), ':', timezone.slice(3)].join(''),
      ZZ: timezone,

      X,
      x,
    },
  },
  {
    // Date tokens & Last day of the year
    date: new Date('2020-12-31'),
    tokens: {
      MMMM: 'MONTH_11',
      MMM: 'MTH_11',
      MM: '12',
      Mo: '12#ORDINAL$',
      M: '12',

      Qo: '4#ORDINAL$',
      Q: '4',

      DDDD: '366',
      DDDo: '366#ORDINAL$',
      DDD: '366',
      DD: '31',
      Do: '31#ORDINAL$',
      D: '31',

      dddd: 'WEEKDAY_4',
      ddd: 'W_DAY_4',
      dd: 'WD_4',
      do: '4#ORDINAL$',
      d: '4',

      w: '53',
      wo: '53#ORDINAL$',
      ww: '53',
    },
  },
  {
    // February 29 & Hour: 00:00:00
    date: new Date('2020-02-29 00:00:00.000'),
    tokens: {
      MMMM: 'MONTH_1',
      MMM: 'MTH_1',
      MM: '02',
      Mo: '2#ORDINAL$',
      M: '2',

      Qo: '1#ORDINAL$',
      Q: '1',

      DDDD: '060',
      DDDo: '60#ORDINAL$',
      DDD: '60',
      DD: '29',
      Do: '29#ORDINAL$',
      D: '29',

      dddd: 'WEEKDAY_6',
      ddd: 'W_DAY_6',
      dd: 'WD_6',
      do: '6#ORDINAL$',
      d: '6',

      w: '9',
      wo: '9#ORDINAL$',
      ww: '09',

      A: 'DUMMY_AM',
      a: 'dummy_AM',

      H: '0',
      HH: '00',

      h: '12',
      hh: '12',

      k: '24',
      kk: '24',

      m: '0',
      mm: '00',

      s: '0',
      ss: '00',

      S: '0',
      SS: '00',
      SSS: '000',
    },
  },
  {
    // Last day of 2020 after noon
    date: new Date('2020-04-30 13:23:45.789'),
    tokens: {
      MMMM: 'MONTH_3',
      MMM: 'MTH_3',
      MM: '04',
      Mo: '4#ORDINAL$',
      M: '4',

      Qo: '2#ORDINAL$',
      Q: '2',

      DDDD: '121',
      DDDo: '121#ORDINAL$',
      DDD: '121',
      DD: '30',
      Do: '30#ORDINAL$',
      D: '30',

      dddd: 'WEEKDAY_4',
      ddd: 'W_DAY_4',
      dd: 'WD_4',
      do: '4#ORDINAL$',
      d: '4',

      w: '18',
      wo: '18#ORDINAL$',
      ww: '18',

      A: 'DUMMY_PM',
      a: 'dummy_PM',

      H: '13',
      HH: '13',

      h: '1',
      hh: '01',

      k: '13',
      kk: '13',

      m: '23',
      mm: '23',

      s: '45',
      ss: '45',

      S: '7',
      SS: '78',
      SSS: '789',
    },
  },
];
