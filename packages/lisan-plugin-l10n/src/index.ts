// for typescript module declaration
// eslint-disable-next-line import/no-extraneous-dependencies
import { Lisan as LisanClass } from 'lisan';
import * as TSLisan from 'lisan-types';
import { generateLocalizationFormatters } from './localization';

/* eslint-disable no-param-reassign */

const ucFirst = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

const Localization: TSLisan.Plugin<LisanClass> = lisan => {
  lisan.setLocale = function setLocale(locale: TSLisan.LocaleConfig): void {
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

    this.setLocaleName(locale.name);
  };
};

declare module 'lisan' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  class Lisan extends LisanClass {
    setLocale(localeConfig: TSLisan.LocaleConfig): void;

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
