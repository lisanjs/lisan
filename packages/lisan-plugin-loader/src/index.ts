// eslint-disable-next-line import/no-extraneous-dependencies
import { Lisan as LisanClass } from 'lisan';
import * as TSLisan from 'lisan-types';
import loadScript from './load-script';

// eslint-disable-next-line no-new-func
const isNode = new Function(
  'try {return this===global;}catch(e){ return false;}',
);

const req = (path: string): TSLisan.Dictionary | TSLisan.Locale =>
  /* eslint-disable-next-line global-require, import/no-dynamic-require */
  require(path);

type LisanWithL10n = LisanClass & {
  setLocale(locale: TSLisan.Locale): void;
};

const Loader = ({
  dictionaryUrlFn,
  localeUrlFn,
}: TSLisan.LisanLoaderOptions): TSLisan.Plugin<LisanWithL10n> => (
  lisan,
): void => {
  if (!isNode()) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).lisanLoaderListener = {
      set exports(obj: TSLisan.Dictionary | TSLisan.Locale) {
        if ((obj as TSLisan.Dictionary).entries) {
          lisan.add(obj as TSLisan.Dictionary);
        } else if ((obj as TSLisan.Locale).name) {
          lisan.setLocale(obj as TSLisan.Locale);
        }
      },
    };
  }

  // eslint-disable-next-line no-param-reassign
  lisan.loadLocale = function loadLocaleInBrowser(
    localeName: string,
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    idPrefix: string = 'Lisan_Locale',
  ): Promise<string> {
    if (typeof localeUrlFn !== 'function') {
      throw new Error('"localeUrlFn" is not defined!');
    }
    const scriptId = `${idPrefix}__${localeName}`;
    const target = localeUrlFn(localeName);

    if (isNode()) {
      const locale = req(target) as TSLisan.Locale;
      lisan.setLocale(locale);
      return Promise.resolve(scriptId);
    }

    return loadScript(target, scriptId);
  };

  // eslint-disable-next-line no-param-reassign
  lisan.load = function loadDictionary(
    dictionaryName: string,
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    idPrefix: string = 'Lisan_Dictionary',
  ): Promise<string> {
    const localeName = lisan.localeName();
    const target = dictionaryUrlFn(dictionaryName, localeName);
    if (localeName) {
      // eslint-disable-next-line no-param-reassign
      idPrefix += `__${localeName}`;
    }
    const scriptId = `${idPrefix}__${dictionaryName}`;

    if (isNode()) {
      const dictionary = req(target) as TSLisan.Dictionary;
      lisan.add(dictionary);
      return Promise.resolve(scriptId);
    }

    return loadScript(target, scriptId);
  };
};

declare module 'lisan' {
  interface Lisan {
    loadLocale: (localeName: string, idPrefix?: string) => Promise<string>;
    load: (dictionaryName: string, idPrefix?: string) => Promise<string>;
  }
}

export { Loader };
