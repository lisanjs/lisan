import { Scenario, PrepareResult } from '../../../../test-utils/localization';

const scenarios: Scenario[] = [
  {
    prepare: (localeConfig): PrepareResult => {
      const { number } = localeConfig;
      const grouping = {
        blocks: [2, 1],
        delimiters: ['#'],
      };
      const fraction = {
        delimiter: '***',
        digits: 2,
      };
      number.grouping = grouping;
      number.fraction = fraction;
      return {
        localeConfig: { ...localeConfig, number },
        delta: { grouping, fraction },
      };
    },
    expectations: [
      {
        input: 1,
        output: '1***00',
      },
      {
        input: 1.0,
        output: '1***00',
      },
      {
        input: 1.9,
        output: '1***90',
      },
      {
        input: 1.99,
        output: '1***99',
      },
      {
        input: 1.01,
        output: '1***01',
      },
      {
        input: 1.123,
        output: '1***12',
      },
      {
        input: 21.467,
        output: '21***47',
      },
      {
        input: 321.567,
        output: '3#21***57',
      },
      {
        input: 4321.9999,
        output: '4#3#22***00',
      },
      {
        input: 54321,
        output: '5#4#3#21***00',
      },
    ],
  },
  {
    prepare: (localeConfig): PrepareResult => {
      const { number } = localeConfig;
      const grouping = {
        blocks: [2, 1],
        delimiters: [' ', '#'],
      };
      number.grouping = grouping;
      // removes fraction if fraction was not defined
      return {
        localeConfig: { ...localeConfig, number },
        delta: { grouping, fraction: undefined },
      };
    },
    expectations: [
      {
        input: 1.123,
        output: '1',
      },
      {
        input: 21.0001,
        output: '21',
      },
      {
        input: 321.123,
        output: '3 21',
      },
      {
        input: 4321.012,
        output: '4#3 21',
      },
      {
        input: 54321.11,
        output: '5#4#3 21',
      },
    ],
  },
  {
    prepare: (localeConfig): PrepareResult => {
      const { number } = localeConfig;
      const grouping = {
        blocks: [2, 1],
        delimiters: [' ', '#'],
      };
      const fraction = {
        delimiter: '.',
        digits: 0,
      };
      number.grouping = grouping;
      number.fraction = fraction;
      return {
        localeConfig: { ...localeConfig, number },
        delta: { grouping, fraction },
      };
    },
    expectations: [
      {
        input: 1.123,
        output: '1',
      },
      {
        input: 21.0001,
        output: '21',
      },
      {
        input: 321.123,
        output: '3 21',
      },
      {
        input: 4321.012,
        output: '4#3 21',
      },
      {
        input: 54321.11,
        output: '5#4#3 21',
      },
    ],
  },
  {
    prepare: (localeConfig): PrepareResult => {
      const { number } = localeConfig;
      const grouping = {
        blocks: [2, 1],
        delimiters: [' ', '#'],
      };
      const fraction = {
        delimiter: '.',
        digits: 1,
      };
      number.grouping = grouping;
      number.fraction = fraction;
      return {
        localeConfig: { ...localeConfig, number },
        delta: { grouping, fraction },
      };
    },
    expectations: [
      {
        input: 1.123,
        output: '1.1',
      },
      {
        input: 21.0001,
        output: '21.0',
      },
      {
        input: 321.123,
        output: '3 21.1',
      },
      {
        input: 4321.012,
        output: '4#3 21.0',
      },
      {
        input: 54321.56,
        output: '5#4#3 21.6',
      },
      {
        input: 54321.99,
        output: '5#4#3 22.0',
      },
    ],
  },
  {
    prepare: (localeConfig): PrepareResult => {
      const { number } = localeConfig;
      const grouping = {
        blocks: [2, 1],
        delimiters: [' ', '#'],
      };
      const fraction = {
        delimiter: '.',
        digits: -1,
      };
      number.grouping = grouping;
      // if digits === -1 prints the fraction as it is
      number.fraction = fraction;
      return {
        localeConfig: { ...localeConfig, number },
        delta: { grouping, fraction },
      };
    },
    expectations: [
      {
        input: 1.123,
        output: '1.123',
      },
      {
        input: 21.0001,
        output: '21.0001',
      },
      {
        input: 321.123,
        output: '3 21.123',
      },
      {
        input: 4321.012,
        output: '4#3 21.012',
      },
      {
        input: 54321.56,
        output: '5#4#3 21.56',
      },
      {
        input: 54321.99,
        output: '5#4#3 21.99',
      },
    ],
  },
];

export default {
  method: 'number',
  scenarios,
};
