import { parseLisanLiteral } from '../../../src';
import { formatTitle } from '../../test-utils';
import validEntries from '../../data/valid-entries';

describe('Valid Cases', () => {
  validEntries.forEach(({ input, expected }) => {
    it(formatTitle(input), () => {
      const output = parseLisanLiteral(input);
      expect(output).toEqual(expected);
    });
  });
});
