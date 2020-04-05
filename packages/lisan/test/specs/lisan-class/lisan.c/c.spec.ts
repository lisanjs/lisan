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

  describe('when a conditional tag is MISSING', () => {
    it('should ignore the missing tag', () => {
      // Arrange
      lisanInstance.add({
        entries: {
          myGroup: {
            one: 'value for 1',
            missingTag: 'tag',
            other: 'other value',
          },
        },
      });

      // Act && Assert
      expect(lisanInstance.c('myGroup', 2)).toBe('other value');
    });
  });

  describe('when there is no matching tag', () => {
    it('return "conditionGroupKey.other" as result', () => {
      // Arrange
      lisanInstance.add({
        entries: {
          myGroup: {
            one: 'value for 1',
            missingTag: 'tag',
          },
        },
      });

      // Act && Assert
      expect(lisanInstance.c('myGroup', 2)).toBe('myGroup.other');
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
          'hello.world': 'Hello World!',
          myGroup: {
            one: 'value 1',
            other: 'value other',
          },
          myConditionalGroupKey: {
            one: jest
              .fn()
              .mockImplementation(
                (
                  { name, number, value1, value2 },
                  { t, c, myFormatter1, myFormatter2 },
                ) =>
                  `Hello ${name}, ${t('hello.world')}, ${c(
                    'myGroup',
                    number,
                  )}, ${myFormatter1(value1)}, ${myFormatter2(value2)}`,
              ),
          },
        },
      };
      const placeholders = {
        name: '##name',
        number: 3,
        value1: new Date('2020-01-01'),
        value2: 4.556,
      };

      const formatters = {
        myFormatter1: x => x.toString(),
        myFormatter2: x => x.toString(),
      };

      const helpers = {
        ...formatters,
        t: expect.any(Function),
        c: expect.any(Function),
      };
      lisanInstance.addFormatters(formatters);
      lisanInstance.add(dict);

      // Act
      const result = lisanInstance.c('myConditionalGroupKey', 1, placeholders);

      // Assert
      expect(dict.entries.myConditionalGroupKey.one).toHaveBeenCalledWith(
        placeholders,
        helpers,
      );
      expect(result).toBe(
        'Hello ##name, Hello World!, value other, Wed Jan 01 2020 03:00:00 GMT+0300 (GMT+03:00), 4.556',
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
        { t: expect.any(Function), c: expect.any(Function) },
      );
      expect(result).toBe('Hello ##John!');
    });
  });
});
