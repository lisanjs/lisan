import * as TSLisan from 'lisan-types';
import { lisan, t } from '../../../src';

describe('public t', () => {
  it('should return the entries registered to `lisan` instance', () => {
    // Arrange
    const dict: TSLisan.Dictionary = {
      entries: {
        entry1: 'simple text',
      },
    };
    lisan.add(dict);

    // Act && Assert
    expect(t('entry1')).toEqual(dict.entries.entry1);
  });

  describe('Given an entry is a function', () => {
    it('should invoke entry function registered to `lisan` instance', () => {
      // Arrange
      const dict: TSLisan.Dictionary = {
        entries: {
          entry2: ({ name }) => `Hello ${name}!`,
        },
      };
      lisan.add(dict);

      // Act && Assert
      expect(t('entry2', { name: 'John' })).toEqual('Hello John!');
    });
  });
});
