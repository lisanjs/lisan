// Dictionary
interface Placeholders {
  [key: string]: string | number | Date | Placeholders;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormatFunction = (value: any) => string;
type FormatFunctions = Record<string, FormatFunction>;

type TMethod = (entryKey: string, placeholders: Placeholders) => string;

type CMethod = (
  entryKey: string,
  value: string | number,
  placeholders: Placeholders,
) => string;

type DictionaryEntryFunction = (
  placeholders: Placeholders,
  fns?: { t: TMethod; c: CMethod } | Record<string, FormatFunction>,
) => string;

type DictionaryEntry = string | DictionaryEntryFunction;
type ConditionalEntryKey = string;

type ConditionalGroup = Record<ConditionalEntryKey, DictionaryEntry>;

// prettier-ignore
type DictionaryEntries = Record<string, DictionaryEntry | ConditionalGroup>;

interface Dictionary {
  locale?: string;
  entries: DictionaryEntries;
}

export {
  Placeholders,
  DictionaryEntry,
  ConditionalGroup,
  DictionaryEntries,
  Dictionary,
  FormatFunction,
  FormatFunctions,
};
