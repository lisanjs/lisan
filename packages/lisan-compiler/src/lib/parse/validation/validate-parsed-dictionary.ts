import { ParsedEntry, ParsedDictionary, ParseOptions } from '../../../typings';
import { ERRORS } from '../../../constants';

const getAllKeys = (
  entries: ParsedEntry[],
): {
  allEntryKeys: string[];
  allConditionalGroupKeys: string[];
} => {
  const allEntryKeys = entries.reduce((keys: string[], { key, groupKey }) => {
    if (!groupKey) {
      keys.push(key);
    }

    return keys;
  }, []);

  const allConditionalGroupKeys = entries.reduce(
    (keys: string[], { groupKey }) => {
      if (groupKey && !keys.includes(groupKey)) {
        keys.push(groupKey);
      }

      return keys;
    },
    [],
  );

  return {
    allEntryKeys,
    allConditionalGroupKeys,
  };
};

const validateParsedDictionary = (
  { entries }: ParsedDictionary,
  options: ParseOptions,
): string[] => {
  // code here
  const warnings: string[] = [];
  const { allConditionalGroupKeys, allEntryKeys } = getAllKeys(entries);

  entries.forEach(entry => {
    // Validate Non Existing Keys
    if (!options.allowNonExistingKeys) {
      entry.conditionalGroupKeys.forEach(conditionalGroupKey => {
        if (!allConditionalGroupKeys.includes(conditionalGroupKey)) {
          throw new Error(
            `["${entry.key}"]: Conditional Group Key "${conditionalGroupKey}" does not exist!`,
          );
        }
      });

      entry.entryKeys.forEach(entryKey => {
        if (!allEntryKeys.includes(entryKey)) {
          throw new Error(
            `["${entry.key}"]: Entry Key "${entryKey}" does not exist!`,
          );
        }
      });
    }

    if (entry.entryKeys.length) {
      // functions can't call its own parents
      if (entry.entryKeys.includes(entry.key)) {
        throw new Error(ERRORS.NoParentKeyCall);
      }

      /**
        const relatedEntries = parsedEntries.filter(parsedEntry =>
          entryKeys.includes(parsedEntry.key),
        );
      */
    }
  });

  // @todo validate against recursive entry keys
  // @todo validate same key used in c and t functions
  // @todo validate against same values
  // @todo validate against empty values
  // @todo validate bcp47 locale values (warnings)
  // @todo validate if formatter names conflict with variables
  // @todo validate reserved words

  return warnings;
};

export { validateParsedDictionary };
