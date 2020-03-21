import { Scenario, PrepareResult } from '../../../../test-utils/localization';

const scenarios: Scenario[] = [
  {
    prepare: (locale): PrepareResult => {
      const { number } = locale;
      const zeroFormat = '#ZERO_FORMAT#';
      const nullFormat = '#NULL_FORMAT#';
      number.zeroFormat = zeroFormat;
      number.nullFormat = nullFormat;
      return {
        locale: { ...locale, number },
        delta: { zeroFormat, nullFormat },
      };
    },
    expectations: [
      {
        input: 0,
        output: '#ZERO_FORMAT#',
      },
      {
        input: null,
        output: '#NULL_FORMAT#',
      },
      {
        input: 1,
        output: '1',
      },
    ],
  },
  {
    prepare: (locale): PrepareResult => {
      const { number } = locale;
      const zeroFormat = '';
      const nullFormat = '';
      number.zeroFormat = zeroFormat;
      number.nullFormat = nullFormat;
      return {
        locale: { ...locale, number },
        delta: { zeroFormat, nullFormat },
      };
    },
    expectations: [
      {
        input: 0,
        output: '',
      },
      {
        input: null,
        output: '',
      },
      {
        input: 1,
        output: '1',
      },
    ],
  },
  {
    prepare: (locale): PrepareResult => {
      const { number } = locale;
      const zeroFormat = null;
      const nullFormat = null;
      number.zeroFormat = zeroFormat;
      number.nullFormat = nullFormat;
      return {
        locale: { ...locale, number },
        delta: { zeroFormat, nullFormat },
      };
    },
    expectations: [
      {
        input: 0,
        output: '0',
      },
      {
        input: null,
        output: 'null',
      },
      {
        input: 1,
        output: '1',
      },
    ],
  },
];

export default {
  method: 'number',
  scenarios,
};
