type LisanLiteral = string;

interface ParsedEntry {
  input: string;
  output: string;
  variables: string[];
  functions: string[];
  entryKeys: string[];
  conditionalGroupKeys: string[];
  key: string;
  groupKey?: string;
}

type ParsedLisanLiteral = Omit<ParsedEntry, 'key' | 'groupKey'>;

// prettier-ignore
type ExtractedInfo = Omit<ParsedEntry, 'input' | 'output' | 'key' | 'groupKey'>;

interface TranslationJson {
  locale?: string;
  entries: {
    [key: string]: LisanLiteral | { [conditionTag: string]: LisanLiteral };
  };
}

type TemplateFunction = (sourceCode: string) => string;
interface Templates {
  esm: TemplateFunction;
  cjs: TemplateFunction;
  lisan: TemplateFunction;
}

interface ParsedDictionary {
  locale?: string;
  entries: ParsedEntry[];
}

interface ParseOptions {
  sortEntryKeys?: boolean;
  allowNonExistingKeys?: boolean;
  autoTrimValues?: boolean;
}

interface GenerateOptions {
  module?: 'none' | 'cjs' | 'esm' | 'lisan';
}

export {
  LisanLiteral,
  ParsedLisanLiteral,
  ParsedEntry,
  ParsedDictionary,
  TranslationJson,
  ExtractedInfo,
  ParseOptions,
  GenerateOptions,
  Templates,
};
