import { lisan } from 'lisan';
import cases from './valid-cases';
import LocaleBase from '../../data/locale.base';
import { Localization } from '../../../src';

const ucFirst = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

cases.forEach(({ method, scenarios }) => {
  const methodname = ucFirst(method);
  describe(`lisan.to${methodname}`, () => {
    beforeAll(() => {
      lisan.use(Localization);
    });
    scenarios.forEach(({ expectations, prepare }) => {
      const localeClone = JSON.parse(JSON.stringify(LocaleBase));
      const { locale, delta } = prepare(localeClone);
      describe(JSON.stringify(delta), () => {
        beforeEach(() => {
          lisan.setLocale(locale);
        });

        expectations.forEach(({ input, output }) => {
          it(`should format input "${input}" as "${output}"`, () => {
            expect(lisan[`to${methodname}`](input as number)).toBe(output);
          });
        });
      });
    });
  });
});
