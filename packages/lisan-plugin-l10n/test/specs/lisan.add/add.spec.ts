import { Lisan } from 'lisan';
import { Localization } from '../../../src';

describe('lisan-plugin-l10n > modifies lisan.add', () => {
  let lisanInstance;
  beforeEach(() => {
    lisanInstance = new Lisan();
    lisanInstance.use(Localization);
  });
  describe('given locale config WAS provided', () => {
    it('should ADD dictionary if dictionary does NOT have locale defined', () => {
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
      lisanInstance.setLocale({ name: 'tr' });

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

    it('should ADD dictionary if dictionary HAVE the SAME locale defined', () => {
      // Arrange
      const dictionary = {
        locale: 'tr',
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
      lisanInstance.setLocale({ name: 'tr' });

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

    it('should NOT add dictionary if dictionary does NOT have the SAME locale defined', () => {
      // Arrange
      const dictionary = {
        locale: 'en-US',
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

      lisanInstance.setLocale({ name: 'tr' });

      // Act && Assert
      expect(() => lisanInstance.add(dictionary)).toThrow(
        'Dictionary locale "en-US" is different than selected locale "tr"',
      );
    });
  });
});
