import { parseLisanLiteral } from '../../../src';
import { formatTitle } from '../../test-utils';
import validEntries from '../../data/valid-entries';

describe('Valid Cases', () => {
  describe('returnArray = false', () => {
    validEntries.forEach(({ input, expected }) => {
      it(formatTitle(input), () => {
        const { arrayOutput, ...expectedOutput } = expected;
        const result = parseLisanLiteral(input);
        expect(result).toEqual(expectedOutput);
      });
    });
  });

  describe('returnArray = true', () => {
    validEntries.forEach(({ input, expected }) => {
      it(formatTitle(input), () => {
        const { output, arrayOutput, ...expectedOutput } = expected;
        const result = parseLisanLiteral(input, { returnArray: true });
        expect(result).toEqual({ ...expectedOutput, output: arrayOutput });
      });
    });
  });
});
