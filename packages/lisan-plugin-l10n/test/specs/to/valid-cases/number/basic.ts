import { Scenario, PrepareResult } from '../../../../test-utils/localization';

const scenarios: Scenario[] = [
  {
    prepare: (localeConfig): PrepareResult => {
      const { number } = localeConfig;
      const grouping = {
        blocks: [1],
        delimiters: ['#'],
      };
      number.grouping = grouping;
      return { localeConfig: { ...localeConfig, number }, delta: { grouping } };
    },
    expectations: [
      {
        input: 1,
        output: '1',
      },
      {
        input: 21,
        output: '2#1',
      },
      {
        input: 321,
        output: '3#2#1',
      },
      {
        input: 4321,
        output: '4#3#2#1',
      },
      {
        input: 54321,
        output: '5#4#3#2#1',
      },
    ],
  },
  {
    prepare: (localeConfig): PrepareResult => {
      const { number } = localeConfig;
      const grouping = {
        blocks: [2],
        delimiters: ['#'],
      };
      number.grouping = grouping;
      return { localeConfig: { ...localeConfig, number }, delta: { grouping } };
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
        output: '43#21',
      },
      {
        input: 54321,
        output: '5#43#21',
      },
    ],
  },
  {
    prepare: (localeConfig): PrepareResult => {
      const { number } = localeConfig;
      const grouping = {
        blocks: [3],
        delimiters: ['#'],
      };
      number.grouping = grouping;
      return { localeConfig: { ...localeConfig, number }, delta: { grouping } };
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
        output: '321',
      },
      {
        input: 4321,
        output: '4#321',
      },
      {
        input: 54321,
        output: '54#321',
      },
      {
        input: 654321,
        output: '654#321',
      },
      {
        input: 7654321,
        output: '7#654#321',
      },
    ],
  },
  {
    prepare: (localeConfig): PrepareResult => {
      const { number } = localeConfig;
      const grouping = {
        blocks: [3],
        delimiters: ['#'],
      };
      number.grouping = grouping;
      return { localeConfig: { ...localeConfig, number }, delta: { grouping } };
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
        output: '-321',
      },
      {
        input: -4321,
        output: '-4#321',
      },
      {
        input: -54321,
        output: '-54#321',
      },
      {
        input: -654321,
        output: '-654#321',
      },
      {
        input: -7654321,
        output: '-7#654#321',
      },
    ],
  },
];

export default {
  method: 'number',
  scenarios,
};
