import { parse } from '../../../../src';

describe('Given a t function calling another t function without providing arguments', () => {
  it.skip('should throw error', () => {
    // Arrange
    const json = {
      name: 'name',
      locale: 'en-Us',
      entries: {
        keyA: 'I use ${myVar}',
        keyB: 'We do not provide myVar to t call: ${t("keyA")}',
      },
    };

    // Act && Assert
    expect(() => parse(json)).toThrow();
  });
});
