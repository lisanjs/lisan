import { Lisan } from '../../../../src';

describe('lisan.c(conditionalGroupKey, value, placeholders?)', () => {
  let lisanInstance: Lisan;
  beforeEach(() => {
    lisanInstance = new Lisan();
  });

  it('should invoke condition functions in given order except "other"', () => {
    // Arrange
    const dict = {
      entries: {
        myConditionalGroup: {
          other: 'Value with other',
          key3: 'Key 3 Value',
          key2: 'Key 3 Value',
          key1: 'Key 1 Value',
        },
      },
    };
    const conditions = {
      key1: jest.fn().mockReturnValue(false),
      key2: jest.fn().mockReturnValue(false),
      key3: jest.fn().mockReturnValue(false),
    };

    lisanInstance.addConditions(conditions);
    lisanInstance.add(dict);

    // Act
    const result = lisanInstance.c('myConditionalGroup', 'someValue');

    // Assert
    expect(result).toBe(dict.entries.myConditionalGroup.other);
    expect(conditions.key3).toHaveBeenCalledBefore(conditions.key2);
    expect(conditions.key2).toHaveBeenCalledBefore(conditions.key1);
  });

  it('should stop invoking condition functions when there is a match', () => {
    // Arrange
    const dict = {
      entries: {
        myConditionalGroup: {
          other: 'Value with other',
          key3: 'Key 3 Value',
          key2: 'Key 2 Value',
          key1: 'Key 1 Value',
        },
      },
    };
    const conditions = {
      key1: jest.fn().mockReturnValue(false),
      key2: jest.fn().mockReturnValue(true),
      key3: jest.fn().mockReturnValue(false),
    };

    lisanInstance.addConditions(conditions);
    lisanInstance.add(dict);

    // Act
    const result = lisanInstance.c('myConditionalGroup', 'someValue');

    // Assert
    expect(result).toBe(dict.entries.myConditionalGroup.key2);
    expect(conditions.key3).toHaveBeenCalledBefore(conditions.key2);
    expect(conditions.key1).not.toHaveBeenCalled();
  });

  describe('when a conditional group is MISSING', () => {
    it('should return dictionaryEntryKey as a response', () => {
      // Arrange
      const missingKey = '#CONDITIONALGROUPKEY####';

      // Act && Assert
      expect(() => lisanInstance.c(missingKey, 1)).toThrow(
        `Invalid conditional group key: "${missingKey}"`,
      );
    });
  });

  describe('when a conditional group is NOT missing', () => {
    const dict = {
      entries: {
        myConditionalGroupKey: {
          zero: 'Value with 0',
          one: 'Value with 1',
          other: 'Value with other',
        },
      },
    };
    beforeEach(() => {
      // Arrange
      lisanInstance.add(dict);
    });
    it('should return the entry with "zero" key, when value is "0"', () => {
      // Act
      const result = lisanInstance.c('myConditionalGroupKey', 0);

      // Assert
      expect(result).toBe(dict.entries.myConditionalGroupKey.zero);
    });

    it('should return the entry with "one" key, when value is "1"', () => {
      // Act
      const result = lisanInstance.c('myConditionalGroupKey', 1);

      // Assert
      expect(result).toBe(dict.entries.myConditionalGroupKey.one);
    });

    it('should return the entry with "other" key, when value is not "0" or "1"', () => {
      // Act
      const result = lisanInstance.c('myConditionalGroupKey', 2);

      // Assert
      expect(result).toBe(dict.entries.myConditionalGroupKey.other);
    });
  });

  describe('when a conditional entry is a FUNCTION', () => {
    it('should invoke the function WITH placeholders and formatter functions', () => {
      // Arrange
      const dict = {
        entries: {
          myConditionalGroupKey: {
            one: jest.fn(),
          },
        },
      };
      const placeholders = {
        random: '##value',
        test: '##placeholder',
      };

      const formatters = {
        myFormatter1: x => x.toString(),
        myFormatter2: x => x.toString(),
      };

      const helpers = { ...formatters, t: lisanInstance.t, c: lisanInstance.c };
      lisanInstance.addFormatters(formatters);
      lisanInstance.add(dict);

      // Act
      lisanInstance.c('myConditionalGroupKey', 1, placeholders);

      // Assert
      expect(dict.entries.myConditionalGroupKey.one).toHaveBeenCalledWith(
        placeholders,
        helpers,
      );
    });

    it('should INVOKE the function and RETURN the result', () => {
      // Arrange
      const dict = {
        entries: {
          myConditionalGroupKey: {
            one: jest.fn().mockImplementation(({ name }) => `Hello ${name}!`),
          },
        },
      };
      lisanInstance.add(dict);

      // Act
      const result = lisanInstance.c('myConditionalGroupKey', 1, {
        name: '##John',
      });

      // Assert
      expect(dict.entries.myConditionalGroupKey.one).toHaveBeenCalledWith(
        { name: '##John' },
        { t: lisanInstance.t, c: lisanInstance.c },
      );
      expect(result).toBe('Hello ##John!');
    });
  });
});
