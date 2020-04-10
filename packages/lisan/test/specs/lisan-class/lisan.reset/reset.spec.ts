import { Lisan } from '../../../../src';

describe('lisan.reset()', () => {
  let lisanInstance: Lisan;
  beforeEach(() => {
    lisanInstance = new Lisan();
  });
  describe('when a dictionary was registered', () => {
    it('should remove all entries', () => {
      // Arrange
      lisanInstance.add({
        entries: {
          entry1: 'entry-one',
          entry2: () => 'another entry',
          conditionalGroup: {
            one: 'First condition',
            other: 'Other condition',
          },
        },
      });

      // Act
      lisanInstance.reset();

      // Assert
      expect(lisanInstance.t('entry1')).toBe('entry1');
      expect(lisanInstance.t('entry2')).toBe('entry2');
      expect(() => lisanInstance.c('conditionalGroup', 2)).toThrow(
        'Invalid conditional group key: "conditionalGroup"',
      );
    });
  });

  describe('when formatters were registered', () => {
    it('should remove all formatters', () => {
      // Arrange
      const fakeFormatter = jest.fn();
      lisanInstance.addFormatters({
        myFormatter: fakeFormatter,
      });

      // Act
      lisanInstance.reset();

      lisanInstance.add({
        entries: {
          entryWithFormatter: ({ amount }, { myFormatter }) =>
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

  describe('given conditions were registered', () => {
    it('should reset conditions', () => {
      // Arrange
      const conditionFn = jest.fn().mockReturnValue(true);
      lisanInstance.addConditions({
        myConditionFn: conditionFn,
      });

      // Act
      lisanInstance.reset();

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

  describe('given locale name was set', () => {
    it('should NOT change locale name', () => {
      // Arrange
      const localeName = 'someLocalename...';
      lisanInstance.setLocaleName(localeName);

      // Act
      lisanInstance.reset();

      // Assert
      expect(lisanInstance.getLocaleName()).toBe(localeName);
    });
  });
});
