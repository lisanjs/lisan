import { parse } from '../../../../../src';
import validJsonFile from '../../../../data/validJsonFile';

describe('Given allowNonExistingKeys is false', () => {
  it('should throw error', () => {
    // Arrange
    const invalidJsonFile = JSON.parse(JSON.stringify(validJsonFile));
    invalidJsonFile.entries.invalid =
      'I call a non existing key ${t("nonExistingKey")}';

    // Act && Assert
    expect(() =>
      parse(invalidJsonFile, {
        allowNonExistingKeys: false,
      }),
    ).toThrow('["invalid"]: Entry Key "nonExistingKey" does not exist!');
  });

  it('should throw error for conditional group', () => {
    // Arrange
    const invalidJsonFile = JSON.parse(JSON.stringify(validJsonFile));
    invalidJsonFile.entries.invalid =
      'I call a non existing key ${c("nonExistingGroupKey", num)}';

    // Act && Assert
    expect(() =>
      parse(invalidJsonFile, {
        allowNonExistingKeys: false,
      }),
    ).toThrow(
      '["invalid"]: Conditional Group Key "nonExistingGroupKey" does not exist!',
    );
  });
});
