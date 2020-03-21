import { GenerateOptions, ParsedDictionary } from '../../typings';
import render from './render';
import templates from './templates';

const modules = ['none', 'esm', 'cjs', 'lisan'];

const generate = (
  parsedDictionary: ParsedDictionary,
  generateOptions: GenerateOptions = {},
): string => {
  const defaultOptions: GenerateOptions = {
    module: 'lisan',
  };

  const options = {
    ...defaultOptions,
    ...generateOptions,
  };

  if (!options.module || !modules.includes(options.module)) {
    throw new Error(
      `options.module has to be one of ${modules
        .map(m => `"${m}"`)
        .join(', ')}`,
    );
  }

  const dictionarySource = render(parsedDictionary);

  if (options.module === 'none') {
    return dictionarySource;
  }

  const templateFunction = templates[options.module];
  const sourceCode = templateFunction(dictionarySource);

  return sourceCode;
};

export { generate };
