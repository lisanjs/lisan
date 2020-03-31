import { Lisan } from 'lisan';
import { Localization } from '../../src';

describe('lisan.setLocale', () => {
  let lisanInstance;
  beforeEach(() => {
    lisanInstance = new Lisan();
    lisanInstance.use(Localization);
  });
  describe('given lisan instance contains entries', () => {
    it('should reset entries', () => {
      // Arrange
      lisanInstance.add({
        entries: {
          simpleEntry: 'A DUMMY ENTRY',
        },
      });

      // Act
      lisanInstance.setLocale({ name: 'tr' });

      // Assert
      expect(lisanInstance.t('simpleEntry')).toBe('simpleEntry');
    });
  });

  describe('given lisan instance contains conditions', () => {
    it('should reset conditions', () => {
      // Arrange
      const conditionFn = jest.fn().mockReturnValue(true);
      lisanInstance.addConditions({
        myConditionFn: conditionFn,
      });

      // Act
      lisanInstance.setLocale({ name: 'tr' });

      lisanInstance.add({
        entries: {
          myDummyGroup: {
            one: 'one value',
            myConditionFn: 'a condition value',
            other: 'other value',
          },
        },
      });

      // Assert
      expect(lisanInstance.c('myDummyGroup', 5)).toBe('other value');
      expect(conditionFn).not.toHaveBeenCalled();
    });
  });

  describe('given lisan instance contains formatters', () => {
    it('should remove all formatters', () => {
      // Arrange
      const fakeFormatter = jest.fn();
      lisanInstance.addFormatters({
        myFormatter: fakeFormatter,
      });

      // Act
      lisanInstance.setLocale({ name: 'tr' });

      lisanInstance.add({
        entries: {
          entryWithFormatter: (
            { amount },
            { myFormatter }: { myFormatter: (x: number) => string },
          ) =>
            `Amount "${amount}" is formatted to "${myFormatter(
              amount as number,
            )}"`,
        },
      });

      // Assert
      expect(() => lisanInstance.t('entryWithFormatter')).toThrow(
        'myFormatter is not a function',
      );
    });
  });

  describe('given conditions are provided in locale configuration', () => {
    it('should register conditions', () => {
      // Arrange
      const fakeFormatter = jest.fn();
      lisanInstance.addFormatters({
        myFormatter: fakeFormatter,
      });

      // Act
      lisanInstance.setLocale({ name: 'tr' });

      lisanInstance.add({
        entries: {
          entryWithFormatter: (
            { amount },
            { myFormatter }: { myFormatter: (x: number) => string },
          ) =>
            `Amount "${amount}" is formatted to "${myFormatter(
              amount as number,
            )}"`,
        },
      });

      // Assert
      expect(() => lisanInstance.t('entryWithFormatter')).toThrow(
        'myFormatter is not a function',
      );
    });
  });

  describe('given formatters provided in locale configuration', () => {
    it('should register formatters', () => {
      // Arrange
      const fakeFormatter = jest.fn();
      lisanInstance.addFormatters({
        myFormatter: fakeFormatter,
      });

      // Act
      lisanInstance.setLocale({ name: 'tr' });

      lisanInstance.add({
        entries: {
          entryWithFormatter: (
            { amount },
            { myFormatter }: { myFormatter: (x: number) => string },
          ) =>
            `Amount "${amount}" is formatted to "${myFormatter(
              amount as number,
            )}"`,
        },
      });

      // Assert
      expect(() => lisanInstance.t('entryWithFormatter')).toThrow(
        'myFormatter is not a function',
      );
    });
  });
});
