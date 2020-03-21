import { parse, generate } from '../../../src';
import validJsonFile from '../../data/validJsonFile';

describe('generate()', () => {
  describe('Given no options were provided', () => {
    it('should successfully generate javascript source code', () => {
      // Arrange
      const parsedDictionary = parse(validJsonFile);

      // Act
      const result = generate(parsedDictionary);

      // Assert
      expect(result).toMatchSnapshot();
    });

    it('should successfully render javascript source code with default options', () => {
      // Arrange
      const parsedDictionary = parse(validJsonFile);
      const resultDefault = generate(parsedDictionary, {
        module: 'lisan',
      });

      // Act
      const result = generate(parsedDictionary);

      // Assert
      expect(resultDefault).toEqual(result);
    });
  });

  describe('Given entries ends with conditional group', () => {
    it('should successfully generate javascript source code', () => {
      // Arrange
      const parsedDictionary = parse(
        {
          entries: {
            key1: 'key1 value',
            key2: 'key2 value',
            group: {
              one: 'one value',
              other: 'other value',
            },
          },
        },
        { sortEntryKeys: false },
      );

      // Act
      const result = generate(parsedDictionary);

      // Assert
      expect(result).toMatchSnapshot();
    });
  });

  describe('Given entries starts with conditional group', () => {
    it('should successfully generate javascript source code', () => {
      // Arrange
      const parsedDictionary = parse(
        {
          entries: {
            group1: {
              one: 'one value',
              other: 'other value',
            },
            key1: 'key1 value',
            key2: 'key2 value',
          },
        },
        { sortEntryKeys: false },
      );

      // Act
      const result = generate(parsedDictionary);

      // Assert
      expect(result).toMatchSnapshot();
    });
  });

  describe('Given entries starts and ends with conditional groups', () => {
    it('should successfully generate javascript source code', () => {
      // Arrange
      const parsedDictionary = parse(
        {
          entries: {
            group1: {
              one: 'one value',
              other: 'other value',
            },
            key1: 'key1 value',
            key2: 'key2 value',
            group3: {
              one: 'one value',
              other: 'other value',
            },
            group2: {
              one: 'one value',
              other: 'other value',
            },
          },
        },
        { sortEntryKeys: false },
      );

      // Act
      const result = generate(parsedDictionary);

      // Assert
      expect(result).toMatchSnapshot();
    });
  });

  describe('Given entries do not have conditional groups', () => {
    it('should successfully generate javascript source code', () => {
      // Arrange
      const parsedDictionary = parse(
        {
          entries: {
            key1: 'key1 value',
            key2: 'key2 value',
            key3: 'key2 value',
          },
        },
        { sortEntryKeys: false },
      );

      // Act
      const result = generate(parsedDictionary);

      // Assert
      expect(result).toMatchSnapshot();
    });
  });

  describe('Given module is "none"', () => {
    it('should successfully generate source code as javascript object', () => {
      // Arrange
      const parsedDictionary = parse(validJsonFile);

      // Act
      const result = generate(parsedDictionary, { module: 'none' });

      // Assert
      expect(result).toMatchSnapshot();
    });
  });

  describe('Given module is "cjs"', () => {
    it('should successfully generate source code as CommonJS module', () => {
      // Arrange
      const parsedDictionary = parse(validJsonFile);

      // Act
      const result = generate(parsedDictionary, { module: 'cjs' });

      // Assert
      expect(result).toMatchSnapshot();
    });
  });

  describe('Given module is "esm"', () => {
    it('should successfully generate source code as ECMA Script module', () => {
      // Arrange
      const parsedDictionary = parse(validJsonFile);

      // Act
      const result = generate(parsedDictionary, { module: 'esm' });

      // Assert
      expect(result).toMatchSnapshot();
    });
  });

  describe('Given module is "lisan"', () => {
    it('should successfully generate source code as lisan module', () => {
      // Arrange
      const parsedDictionary = parse(validJsonFile);

      // Act
      const result = generate(parsedDictionary, { module: 'lisan' });

      // Assert
      expect(result).toMatchSnapshot();
    });
  });
});
