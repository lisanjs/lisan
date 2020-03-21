import { Lisan } from '../../../../src';

describe('lisan.use(fn)', () => {
  let lisanInstance;
  beforeEach(() => {
    lisanInstance = new Lisan();
  });
  describe('when a plugin function was provided', () => {
    it('should pass the lisan instance as the first argument', () => {
      // Arrange
      const pluginFn = jest.fn();

      // Act
      const result = lisanInstance.use(pluginFn);

      // Assert
      expect(pluginFn).toHaveBeenCalledWith(lisanInstance);
      expect(result).toBeUndefined();
    });
  });
});
