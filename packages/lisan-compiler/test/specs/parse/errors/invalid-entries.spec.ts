import { parse } from '../../../../src';
import { formatTitle } from '../../../test-utils';
import validJsonFile from '../../../data/validJsonFile';
import invalidEntries from '../../../data/invalid-entries';

describe('Invalid Cases', () => {
  invalidEntries.forEach(({ input, error }) => {
    it(formatTitle(input), () => {
      try {
        const invalidJsonFile = JSON.parse(JSON.stringify(validJsonFile));
        invalidJsonFile.entries.invalid = input;
        parse(invalidJsonFile);
      } catch (err) {
        // Error Message
        expect(err.message).toBe(error.message);
        // ASTNode Range
        expect([err.index, err.endIndex]).toEqual([
          error.index,
          error.endIndex,
        ]);
        // Error Type
        expect(err.constructor.name).toBe(error.name);
        expect(err.name).toBe(error.name);
      }
      expect.assertions(4);
    });
  });
});
