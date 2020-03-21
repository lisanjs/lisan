import { parse } from '../../../src';
import validJsonFile from '../../data/validJsonFile';

describe('Given a valid json file was provided', () => {
  describe('Given no options were provided', () => {
    it('should successfully parse translations into ParsedDictionary object', () => {
      // Act
      const result = parse(validJsonFile);
      // Assert
      expect(result).toMatchSnapshot();
    });

    it('should successfully parse translations with default options', () => {
      // Arrange
      const resultDefault = parse(validJsonFile, {
        sortEntryKeys: true,
        allowNonExistingKeys: false,
        autoTrimValues: true,
      });

      // Act
      const result = parse(validJsonFile);

      // Assert
      expect(resultDefault).toEqual(result);
    });
  });

  describe('Given sortEntryKeys is false', () => {
    it('should successfully parse translations without sorting keys', () => {
      // Act
      const result = parse(validJsonFile, {
        sortEntryKeys: false,
      });

      // Assert
      expect(result).toMatchSnapshot();
    });
  });

  describe('Given autoTrimValues is false', () => {
    it('should successfully parse translations without sorting keys', () => {
      // Act
      const result = parse(validJsonFile, {
        autoTrimValues: false,
      });

      // Assert
      expect(result).toMatchSnapshot();
    });
  });

  describe('Given "allowNonExistingKeys" is "true"', () => {
    it('should successfully parse translations even non-existing keys exist', () => {
      // Arrange
      const invalidJsonFile = JSON.parse(JSON.stringify(validJsonFile));
      invalidJsonFile.entries.invalid =
        'I call a non existing key ${t("nonExistingKey")}';

      // Act
      const result = parse(invalidJsonFile, {
        allowNonExistingKeys: true,
      });

      // Assert
      expect(result).toMatchSnapshot();
    });
  });
});
