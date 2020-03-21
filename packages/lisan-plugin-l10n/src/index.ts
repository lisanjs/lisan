// for typescript module declaration
// eslint-disable-next-line import/no-extraneous-dependencies
import { Lisan as LisanClass } from 'lisan';
import * as TSLisan from 'lisan-types';
import { generateLocalizationFormatters } from './localization';

/* eslint-disable no-param-reassign */

const ucFirst = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

const Localization: TSLisan.Plugin<LisanClass> = lisan => {
  lisan.setLocale = function setLocale(locale: TSLisan.Locale): void {
    this.reset();

    // @locale validators
    if (locale.conditions) {
      this.addConditions(locale.conditions);
    }

    const formatters = generateLocalizationFormatters(locale);
    this.addFormatters(formatters);

    Object.keys(formatters).forEach(formatterName => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this[`to${ucFirst(formatterName)}`] = formatters[formatterName];
    });

    this.localeName = locale.name;
  };

  const { add: addBase } = lisan;

  lisan.add = function addWithLocale({
    locale,
    entries,
  }: TSLisan.Dictionary): LisanClass {
    if (lisan.localeName && locale && locale !== lisan.localeName) {
      throw new Error(
        `Dictionary locale "${locale}" is different than selected locale "${lisan.localeName}"`,
      );
    }

    return addBase.call(this, { locale, entries });
  };
};

declare module 'lisan' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  class Lisan extends LisanClass {
    public localeName: string;

    setLocale(locale: TSLisan.Locale): void;

    toNumber(number: number): string;

    toCurrency(number: number): string;

    toOrdinal(number: number): string;

    toDateShort(time: number | Date): string;

    toDateMedium(time: number | Date): string;

    toDateLong(time: number | Date): string;

    toDateFull(time: number | Date): string;

    toTimeShort(time: number | Date): string;

    toTimeMedium(time: number | Date): string;

    toTimeLong(time: number | Date): string;

    toDateTime(time: number | Date): string;
  }
}

export { Localization };
