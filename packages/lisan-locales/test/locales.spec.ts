import { lisan } from 'lisan';
import { Localization } from 'lisan-plugin-l10n';
import * as locales from '../src';
import * as fixtures from './fixtures';

const localeNames = Object.keys(locales).sort();

const methods = [
  'toNumber',
  'toCurrency',
  'toOrdinal',
  'toDateTime',
  'toDateShort',
  'toDateMedium',
  'toDateLong',
  'toDateFull',
  'toTimeShort',
  'toTimeMedium',
  'toTimeLong',
];

localeNames.forEach((localeName, index) => {
  const locale = locales[localeName];
  const data = fixtures[localeName];

  if (!data) {
    throw new Error(`Fixture for ${localeName} not found!`);
  }

  const localeMethods = Object.keys(data);

  describe(`${index + 1} / ${
    localeNames.length
  } ) Locale Config For: ${localeName}`, () => {
    beforeAll(() => {
      lisan.use(Localization);
    });

    it('should contain test data for all methods', () => {
      expect(localeMethods).toIncludeAllMembers(methods);
    });

    localeMethods.forEach(method => {
      describe(`lisan.${method}`, () => {
        beforeEach(() => {
          lisan.setLocale(locale);
        });

        data[method].forEach(({ input, output }) => {
          it(`should format "${input}" to "${output}"`, () => {
            expect(lisan[method](input)).toBe(output);
          });
        });
      });
    });
  });
});
