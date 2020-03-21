import { Lisan } from '../../../../src';

describe('lisan.addConditions(conditions)', () => {
  let lisanInstance: Lisan;
  beforeEach(() => {
    lisanInstance = new Lisan();
  });

  it('should return the class instance', () => {
    // Act
    const result = lisanInstance.addConditions({});

    // Assert
    expect(result).toBe(lisanInstance);
  });

  it('should overwrite the old conditions with the same name', () => {
    // Arrange
    const myInitialConditionKeyOld = jest.fn().mockImplementation(x => x === 2);
    lisanInstance.addConditions({
      myInitialConditionKey: myInitialConditionKeyOld,
    });

    const dict = {
      entries: {
        myConditionalGroup: {
          one: 'Value 1',
          myInitialConditionKey: 'myInitialConditionKey Value',
          other: 'Other value',
        },
      },
    };
    lisanInstance.add(dict);

    const myInitialConditionKeyNew = jest.fn().mockImplementation(x => x === 3);
    lisanInstance.addConditions({
      myInitialConditionKey: myInitialConditionKeyNew,
    });

    // Act
    const result = lisanInstance.c('myConditionalGroup', 3);

    // Assert
    expect(myInitialConditionKeyNew).toHaveBeenCalledWith(3);
    expect(myInitialConditionKeyOld).not.toHaveBeenCalled();
    expect(result).toBe(dict.entries.myConditionalGroup.myInitialConditionKey);
  });

  describe('when registering new conditions', () => {
    it('should ignore "zero", "one", "other" keywords', () => {
      // Arrange
      const conditions = {
        zero: jest.fn(),
        one: jest.fn(),
        other: jest.fn(),
      };
      lisanInstance.addConditions(conditions);

      const dict = {
        entries: {
          myConditionalGroupKey: {
            zero: 'Value 0',
            one: 'Value 1',
            other: 'Other value',
          },
        },
      };
      lisanInstance.add(dict);

      // Act && Assert
      expect(lisanInstance.c('myConditionalGroupKey', 0)).toBe(
        dict.entries.myConditionalGroupKey.zero,
      );
      expect(lisanInstance.c('myConditionalGroupKey', 1)).toBe(
        dict.entries.myConditionalGroupKey.one,
      );
      expect(lisanInstance.c('myConditionalGroupKey', 2)).toBe(
        dict.entries.myConditionalGroupKey.other,
      );

      expect(conditions.zero).not.toHaveBeenCalled();
      expect(conditions.one).not.toHaveBeenCalled();
      expect(conditions.other).not.toHaveBeenCalled();
    });

    it('should throw error if condition function is not valid', () => {
      // Act && Assert
      expect(() =>
        lisanInstance.addConditions({
          key: () => true,
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          invalidKey: 'not a function',
        }),
      ).toThrow('Invalid condition function: "invalidKey"');
    });
  });

  describe('given a conditionTag is registered', () => {
    it('should be available in "lisan.c" function', () => {
      // Arrange
      const conditions = {
        myConditionKey1: (x: number) => x === 3,
        anotherConditionKey: (x: number) => x === 4,
      };
      lisanInstance.addConditions(conditions);

      const dict = {
        entries: {
          myConditionalGroupKey: {
            one: 'Value 1',
            myConditionKey1: '   Value',
            anotherConditionKey: 'anotherConditionKey Value',
            other: 'Other value',
          },
        },
      };
      lisanInstance.add(dict);

      // Act && Assert
      expect(lisanInstance.c('myConditionalGroupKey', 1)).toBe(
        dict.entries.myConditionalGroupKey.one,
      );
      expect(lisanInstance.c('myConditionalGroupKey', 2)).toBe(
        dict.entries.myConditionalGroupKey.other,
      );
      expect(lisanInstance.c('myConditionalGroupKey', 3)).toBe(
        dict.entries.myConditionalGroupKey.myConditionKey1,
      );
      expect(lisanInstance.c('myConditionalGroupKey', 4)).toBe(
        dict.entries.myConditionalGroupKey.anotherConditionKey,
      );
    });
  });
});
