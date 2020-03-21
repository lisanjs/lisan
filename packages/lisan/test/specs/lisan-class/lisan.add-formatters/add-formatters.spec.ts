import * as TSLisan from 'lisan-types';
import { Lisan } from '../../../../src';

describe('lisan.addFormatters(formatters)', () => {
  let lisanInstance: Lisan;
  beforeEach(() => {
    lisanInstance = new Lisan();
  });

  it('should return the class instance', () => {
    // Act
    const result = lisanInstance.addFormatters({});

    // Assert
    expect(result).toBe(lisanInstance);
  });

  it('should overwrite the old formatters with the same name', () => {
    // Arrange
    const myInitialFormatterOld = jest
      .fn()
      .mockImplementation(x => (x ** 2).toString());
    const myInitialFormatterNew = jest
      .fn()
      .mockImplementation(x => (x ** 3).toString());
    lisanInstance.addFormatters({
      myInitialFormatter: myInitialFormatterOld,
    });

    lisanInstance.addFormatters({
      myInitialFormatter: myInitialFormatterNew,
      anotherFormatter: x => (x ** 4).toString(),
    });

    const dict: TSLisan.Dictionary = {
      entries: {
        fakeEntry: (
          { amount },
          {
            myInitialFormatter,
            anotherFormatter,
          }: Record<string, TSLisan.FormatFunction>,
        ) =>
          `The amount "${amount}" is formatted to "${myInitialFormatter(
            amount,
          )}". Another format is: "${anotherFormatter(amount)}"`,
      },
    };
    lisanInstance.add(dict);

    // Act
    const result = lisanInstance.t('fakeEntry', { amount: 4 });

    // Assert
    expect(myInitialFormatterNew).toHaveBeenCalledWith(4);
    expect(myInitialFormatterOld).not.toHaveBeenCalled();
    expect(result).toBe(
      'The amount "4" is formatted to "64". Another format is: "256"',
    );
  });

  describe('gievn a formatter is registered', () => {
    it('should be available in "lisan.t" function', () => {
      // Arrange
      const dict: TSLisan.Dictionary = {
        entries: {
          fakeEntry: (
            { name, amount },
            { myFormatter1 }: { myFormatter1: TSLisan.FormatFunction },
          ) =>
            `Hello ${name}!!, the amount "${amount}" is formatted to "${myFormatter1(
              amount,
            )}".`,
        },
      };
      const placeholders = {
        name: '##John',
        amount: 2,
      };

      const formatters = {
        myFormatter1: x => (x ** 3 - 1).toString(),
      };

      lisanInstance.addFormatters(formatters);
      lisanInstance.add(dict);

      // Act
      const result = lisanInstance.t('fakeEntry', placeholders);

      // Assert
      expect(result).toBe(
        'Hello ##John!!, the amount "2" is formatted to "7".',
      );
    });

    it('should be available in "lisan.c" function', () => {
      // Arrange
      const dict: TSLisan.Dictionary = {
        entries: {
          myConditionalGroupKey: {
            one: (
              { name, amount },
              { myFormatter1 }: { myFormatter1: TSLisan.FormatFunction },
            ) =>
              `Hello ${name}!!, the amount "${amount}" is formatted to "${myFormatter1(
                amount,
              )}".`,
          },
        },
      };
      const placeholders = {
        name: '##John',
        amount: 2,
      };

      const formatters = {
        myFormatter1: x => (x ** 4 - 1).toString(),
      };

      lisanInstance.addFormatters(formatters);
      lisanInstance.add(dict);

      // Act
      const result = lisanInstance.c('myConditionalGroupKey', 1, placeholders);

      // Assert
      expect(result).toBe(
        'Hello ##John!!, the amount "2" is formatted to "15".',
      );
    });
  });
});
