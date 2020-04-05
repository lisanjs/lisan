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
          'hello.world': 'Hello World!',
          myGroup: {
            one: 'value 1',
            other: 'value other',
          },
          simpleEntry: jest
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

      lisanInstance.addFormatters(formatters);
      lisanInstance.add(dict);

      // Act
      const result = lisanInstance.t('simpleEntry', placeholders);

      // Assert
      expect(dict.entries.simpleEntry).toHaveBeenCalledWith(placeholders, {
        ...formatters,
        t: expect.any(Function),
        c: expect.any(Function),
      });
      expect(result).toBe(
        'Hello ##name, Hello World!, value other, Wed Jan 01 2020 03:00:00 GMT+0300 (GMT+03:00), 4.556',
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
        { t: expect.any(Function), c: expect.any(Function) },
      );
      expect(result).toBe('Hello ##John!');
    });
  });
});
