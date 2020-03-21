type DictionaryResolverFunction = (
  dictionaryName: string,
  localeName?: string,
) => string;

type LocaleResolverFunction = (localeName: string) => string;

interface LisanLoaderOptions {
  dictionaryUrlFn: DictionaryResolverFunction;
  localeUrlFn?: LocaleResolverFunction;
}

export {
  DictionaryResolverFunction,
  LocaleResolverFunction,
  LisanLoaderOptions,
};
