import { Lisan } from '../../../../src';

describe('lisan.localeName(localeName)', () => {
  let lisanInstance;
  beforeEach(() => {
    lisanInstance = new Lisan();
  });

  describe('given a previous localeName was NOT set and localeName was NOT provided', () => {
    it('should return "undefined"', () => {
      // Act && Assert
      expect(lisanInstance.localeName()).toBeUndefined();
    });
  });

  describe('given localeName was provided', () => {
    it('should set localeName to given value and return it', () => {
      // Arrange
      const localeName = 'someRandomLocaleName';
      // Act && Assert
      expect(lisanInstance.localeName(localeName)).toBe(localeName);
      expect(lisanInstance.localeName()).toBe(localeName);
    });
  });
});
