import { parse, generate } from '../../../src';
import validJsonFile from '../../data/validJsonFile';

describe('generate()', () => {
  describe('Given invalid module option was provided', () => {
    it('should throw error', () => {
      // Arrange
      const parsedDictionary = parse(validJsonFile);

      // Act && Assert
      // @ts-ignore
      expect(() => generate(parsedDictionary, { module: 'undefined' })).toThrow(
        'options.module has to be one of "none", "esm", "cjs", "lisan"',
      );
    });
  });
});
