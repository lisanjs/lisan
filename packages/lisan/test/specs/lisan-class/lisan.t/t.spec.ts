import * as TSLisan from 'lisan-types';
import { Lisan } from '../../../../src';

describe('lisan.t(dictionaryEntryKey, placeholders?)', () => {
  let lisanInstance: Lisan;
  beforeEach(() => {
    lisanInstance = new Lisan();
  });
  describe('when a dictionary entry is MISSING', () => {
    it('should return dictionaryEntryKey as a response', () => {
      // Arrange
      const missingKey = '#SOMERANDOMKEY####';

      // Act
      const result = lisanInstance.t(missingKey);

      // Assert
      expect(result).toBe(missingKey);
    });
  });

  describe('when a dictionary entry is NOT missing', () => {
    it('should return the entry', () => {
      // Arrange
      const dict = {
        entries: {
          entry1: 'simple text',
        },
      };
      lisanInstance.add(dict);

      // Act
      const result = lisanInstance.t('entry1');

      // Assert
      expect(result).toBe(dict.entries.entry1);
    });
  });

  describe('when a dictionary entry is a FUNCTION', () => {
    it('should invoke the function WITH placeholders and formatter functions', () => {
      // Arrange
      const dict = {
        entries: {
          fakeEntry: jest.fn(),
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
      lisanInstance.t('fakeEntry', placeholders);

      // Assert
      expect(dict.entries.fakeEntry).toHaveBeenCalledWith(
        placeholders,
        helpers,
      );
    });

    it('should INVOKE the function and RETURN the result', () => {
      // Arrange
      const dict: TSLisan.Dictionary = {
        entries: {
          entry2: jest.fn().mockImplementation(({ name }) => `Hello ${name}!`),
        },
      };
      lisanInstance.add(dict);

      // Act
      const result = lisanInstance.t('entry2', { name: '##John' });

      // Assert
      expect(dict.entries.entry2).toHaveBeenCalledWith(
        { name: '##John' },
        { t: lisanInstance.t, c: lisanInstance.c },
      );
      expect(result).toBe('Hello ##John!');
    });
  });
});
