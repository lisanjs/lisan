import { parse } from '../../../../src';

describe('Given t function is using conditional group key', () => {
  it.skip('should throw error', () => {
    // Arrange
    const json = {
      name: 'name',
      locale: 'en-Us',
      entries: {
        keyA: '${t("keyC")}',
        keyC: {
          one: 'simple text',
        },
      },
    };

    // Act && Assert
    expect(() => parse(json)).toThrow();
  });
});

describe('Given c function is using an entry key', () => {
  it.skip('should throw error', () => {
    // Arrange
    const json = {
      name: 'name',
      locale: 'en-Us',
      entries: {
        keyA: '${c("keyB")}',
        keyB: 'simple Text',
      },
    };

    // Act && Assert
    expect(() => parse(json)).toThrow();
  });
});
