import { Lisan } from '../../../../src';

describe('lisan.add(dictionary)', () => {
  let lisanInstance;
  beforeEach(() => {
    lisanInstance = new Lisan();
  });

  it('should return the class instance', () => {
    // Act
    const result = lisanInstance.add({ entries: {} });

    // Assert
    expect(result).toBe(lisanInstance);
  });

  describe('given there are NO registered dictionaries', () => {
    it('should ADD new dictionary entries', () => {
      // Arrange
      const dictionary = {
        entries: {
          entry1: 'simple text',
          entry2: 'another simple text',
          conditionGroup: {
            zero: 'zero',
            one: 'one',
            other: 'other',
          },
        },
      };

      // Act
      lisanInstance.add(dictionary);

      // Assert
      expect(lisanInstance.t('entry1')).toBe(dictionary.entries.entry1);
      expect(lisanInstance.t('entry2')).toBe(dictionary.entries.entry2);
      expect(lisanInstance.c('conditionGroup', 0)).toBe(
        dictionary.entries.conditionGroup.zero,
      );
      expect(lisanInstance.c('conditionGroup', 1)).toBe(
        dictionary.entries.conditionGroup.one,
      );
      expect(lisanInstance.c('conditionGroup', 5)).toBe(
        dictionary.entries.conditionGroup.other,
      );
    });
  });

  describe('given there ARE registered dictionaries', () => {
    it('should MERGE new dictionary entries OVER the old ones', () => {
      // Arrange
      const dictionaryOld = {
        entries: {
          entry1: 'simple text',
          entry2: 'another simple text',
        },
      };
      const dictionaryNew = {
        entries: {
          entry1: 'New simple text',
          entry2: 'New another simple text',
        },
      };

      lisanInstance.add(dictionaryOld);

      // Act
      lisanInstance.add(dictionaryNew);

      // Assert
      expect(lisanInstance.t('entry1')).toBe(dictionaryNew.entries.entry1);
      expect(lisanInstance.t('entry2')).toBe(dictionaryNew.entries.entry2);
    });
  });
});
