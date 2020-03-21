import {
  TranslationJson,
  ParsedEntry,
  ParseOptions,
  ParsedDictionary,
} from '../../typings';
import { parseLisanLiteral } from '../parse-lisan-literal';
import { validateParsedDictionary } from './validation';

const parse = (
  { locale, entries }: TranslationJson,
  parseOptions: ParseOptions = {},
): ParsedDictionary => {
  const defaultOptions: ParseOptions = {
    sortEntryKeys: true,
    allowNonExistingKeys: false,
    autoTrimValues: true,
  };

  const options = {
    ...defaultOptions,
    ...parseOptions,
  };

  // validate locale
  if (locale && !locale.trim()) {
    throw new Error('"locale" cannot be empty');
  }

  // validate locale
  if (!entries || typeof entries !== 'object') {
    throw new Error('"entries" is missing');
  }

  // process entries
  const allKeys = options.sortEntryKeys
    ? Object.keys(entries).sort()
    : Object.keys(entries);

  if (!allKeys.length) {
    throw new Error('Entries can not be empty!');
  }

  const parsedEntries: ParsedEntry[] = [];

  allKeys.forEach((key): void => {
    const entry = entries[key];

    if (typeof entry === 'string') {
      const parsedEntry = parseLisanLiteral(
        options.autoTrimValues ? entry.trim() : entry,
      );

      parsedEntries.push({
        key,
        ...parsedEntry,
      });
    }

    // Entry is a conditional group
    if (typeof entry === 'object') {
      const conditionalTags = Object.keys(entry);

      if (conditionalTags.length < 2) {
        throw new Error('Conditional group must contain at least 2 entries!');
      }

      conditionalTags.forEach((conditionalTag): void => {
        const conditionalEntry = entry[conditionalTag];
        const parsedEntry = parseLisanLiteral(
          options.autoTrimValues ? conditionalEntry.trim() : conditionalEntry,
        );

        parsedEntries.push({
          groupKey: key,
          key: conditionalTag,
          ...parsedEntry,
        });
      });
    }
  });

  const parsedDictionary: ParsedDictionary = {
    entries: parsedEntries,
  };

  if (locale) {
    parsedDictionary.locale = options.autoTrimValues ? locale.trim() : locale;
  }

  validateParsedDictionary(parsedDictionary, options);

  return parsedDictionary;
};

export { parse };
