import { Lisan } from '../../../../src';

describe('lisan.localeName', () => {
  let lisanInstance;
  beforeEach(() => {
    lisanInstance = new Lisan();
  });

  describe('given a previous localeName was NOT set', () => {
    it('should return "undefined"', () => {
      // Act && Assert
      expect(lisanInstance.getLocaleName()).toBeUndefined();
    });
  });

  describe('given localeName was set', () => {
    it('should return the given value', () => {
      // Arrange
      const localeName = 'someRandomLocaleName';
      lisanInstance.setLocaleName(localeName);

      // Act && Assert
      expect(lisanInstance.getLocaleName()).toBe(localeName);
    });
  });
});
