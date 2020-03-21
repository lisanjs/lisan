import { parse } from '../../../../src';
import { ERRORS } from '../../../../src/constants';

describe('Given there are recursive key calls', () => {
  describe('Given a "t" function calls its own entry key', () => {
    it('should throw error', () => {
      // Arrange
      const json = {
        name: 'name',
        locale: 'en-Us',
        entries: {
          keyA: '${t("keyA")}',
        },
      };

      // Act && Assert
      expect(() => parse(json)).toThrow(ERRORS.NoParentKeyCall);
    });
  });

  describe('Given two "t" functions are calling each other in their entries', () => {
    it.skip('should throw error', () => {
      // Arrange
      const json = {
        name: 'name',
        locale: 'en-Us',
        entries: {
          keyA: '${t("keyB")}',
          keyB: '${t("keyA")}',
        },
      };

      // Act && Assert
      expect(() => parse(json)).toThrow();
    });
  });

  describe('Given a "t" function in a conditional group is calling another t function that calls itself', () => {
    it.skip('should throw error', () => {
      // Arrange
      const json = {
        name: 'name',
        locale: 'en-Us',
        entries: {
          keyA: '${c("keyC", num)}',
          keyC: {
            one: '${t("keyA")}',
          },
        },
      };

      // Act && Assert
      expect(() => parse(json)).toThrow();
    });
  });
});
