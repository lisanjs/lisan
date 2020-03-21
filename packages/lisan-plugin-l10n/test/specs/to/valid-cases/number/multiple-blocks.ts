import { Scenario, PrepareResult } from '../../../../test-utils/localization';

const scenarios: Scenario[] = [
  {
    prepare: (locale): PrepareResult => {
      const { number } = locale;
      const grouping = {
        blocks: [2, 1],
        delimiters: ['#'],
      };
      number.grouping = grouping;
      return { locale: { ...locale, number }, delta: { grouping } };
    },
    expectations: [
      {
        input: 1,
        output: '1',
      },
      {
        input: 21,
        output: '21',
      },
      {
        input: 321,
        output: '3#21',
      },
      {
        input: 4321,
        output: '4#3#21',
      },
      {
        input: 54321,
        output: '5#4#3#21',
      },
    ],
  },
  {
    prepare: (locale): PrepareResult => {
      const { number } = locale;
      const grouping = {
        blocks: [2, 1],
        delimiters: [' ', '#'],
      };
      number.grouping = grouping;
      return { locale: { ...locale, number }, delta: { grouping } };
    },
    expectations: [
      {
        input: 1,
        output: '1',
      },
      {
        input: 21,
        output: '21',
      },
      {
        input: 321,
        output: '3 21',
      },
      {
        input: 4321,
        output: '4#3 21',
      },
      {
        input: 54321,
        output: '5#4#3 21',
      },
    ],
  },
  {
    prepare: (locale): PrepareResult => {
      const { number } = locale;
      const grouping = {
        blocks: [2, 1, 3],
        delimiters: ['-', ' ', '#'],
      };
      number.grouping = grouping;
      return { locale: { ...locale, number }, delta: { grouping } };
    },
    expectations: [
      {
        input: 1,
        output: '1',
      },
      {
        input: 21,
        output: '21',
      },
      {
        input: 321,
        output: '3-21',
      },
      {
        input: 4321,
        output: '4 3-21',
      },
      {
        input: 54321,
        output: '54 3-21',
      },
      {
        input: 654321,
        output: '654 3-21',
      },
      {
        input: 7654321,
        output: '7#654 3-21',
      },
      {
        input: 87654321,
        output: '87#654 3-21',
      },
      {
        input: 987654321,
        output: '987#654 3-21',
      },
      {
        input: 1987654321,
        output: '1#987#654 3-21',
      },
    ],
  },
  {
    prepare: (locale): PrepareResult => {
      const { number } = locale;
      const grouping = {
        blocks: [2, 3],
        delimiters: ['-', ' '],
      };
      number.grouping = grouping;
      return {
        locale: { ...locale, number },
        delta: { grouping, negative: true },
      };
    },
    expectations: [
      {
        input: -1,
        output: '-1',
      },
      {
        input: -21,
        output: '-21',
      },
      {
        input: -321,
        output: '-3-21',
      },
      {
        input: -4321,
        output: '-43-21',
      },
      {
        input: -54321,
        output: '-543-21',
      },
      {
        input: -654321,
        output: '-6 543-21',
      },
      {
        input: -7654321,
        output: '-76 543-21',
      },
      {
        input: -87654321,
        output: '-876 543-21',
      },
      {
        input: -987654321,
        output: '-9 876 543-21',
      },
      {
        input: -1987654321,
        output: '-19 876 543-21',
      },
    ],
  },
];

export default {
  method: 'number',
  scenarios,
};
