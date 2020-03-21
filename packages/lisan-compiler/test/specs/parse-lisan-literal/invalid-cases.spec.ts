import { parseLisanLiteral } from '../../../src';
import { formatTitle } from '../../test-utils';
import invalidEntries from '../../data/invalid-entries';

describe('Invalid Cases', () => {
  invalidEntries.forEach(({ input, error }) => {
    it(formatTitle(input), () => {
      try {
        parseLisanLiteral(input);
      } catch (err) {
        // Error Message
        expect(err.message).toBe(error.message);
        // ASTNode Range

        // Error Type
        expect(err.constructor.name).toBe(error.name);
        expect(err.name).toBe(error.name);
      }
      expect.assertions(3);
    });
  });
});
