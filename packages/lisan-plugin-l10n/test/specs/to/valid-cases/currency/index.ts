import numberBasic from '../number/basic';
import numberFraction from '../number/fraction';
import numberMultipleBlocks from '../number/multiple-blocks';
import numberZeroNullFormat from '../number/zero-null-format';
import { PrepareResult } from '../../../../test-utils/localization';

const cases = [
  numberBasic,
  numberMultipleBlocks,
  numberFraction,
  numberZeroNullFormat,
];

const templateFn = (str: string): string => `TEMPLATE#${str}#TEMPLATE`;

export default cases.map(testCase => ({
  method: 'currency',
  scenarios: testCase.scenarios.map(scenario => ({
    prepare: (locale): PrepareResult => {
      const l = scenario.prepare(locale);
      l.delta = {
        ...l.delta,
        currency: true,
      };
      l.locale.currency.template = templateFn;
      return l;
    },
    expectations: scenario.expectations.map(expectation => ({
      ...expectation,
      output: templateFn(expectation.output),
    })),
  })),
}));
