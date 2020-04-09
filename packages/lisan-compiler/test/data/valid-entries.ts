import { ParsedEntry } from '../../src/typings';

interface PlainParsedEntry extends Omit<ParsedEntry, 'key' | 'groupKey'> {
  arrayOutput: string;
}

interface ValidCase {
  input: string;
  expected: PlainParsedEntry;
}

const renderTestOutput = (
  lisanLiteral: string,
  variables: string[],
  functions: string[],
): string => {
  if (!variables.length && !functions.length) {
    return `"${lisanLiteral}"`;
  }

  const templateLiteral = `\`${lisanLiteral}\``;
  const lisanFunctions = functions.length
    ? `, { ${functions.join(', ')} }`
    : '';
  const variablesStr = variables.length ? ` ${variables.join(', ')} ` : '';

  const fnPrefix = `({${variablesStr}}${lisanFunctions})`;
  const output = `${fnPrefix} => ${templateLiteral}`;
  // console.log(`\n${lisanLiteral}\n${output}\n`);
  return output;
};

const parsedEntry = (
  input,
  {
    output,
    arrayOutput,
    variables = [],
    functions = [],
    entryKeys = [],
    conditionalGroupKeys = [],
  }: {
    output?: string;
    arrayOutput?: string;
    variables?: string[];
    functions?: string[];
    entryKeys?: string[];
    conditionalGroupKeys?: string[];
  } = {},
): { input: string; expected: PlainParsedEntry } => ({
  input,
  expected: {
    input,
    output: output || renderTestOutput(input, variables, functions),
    arrayOutput,
    variables,
    functions,
    entryKeys,
    conditionalGroupKeys,
  },
});

const validCases: ValidCase[] = [
  // Plain Text
  parsedEntry('', { arrayOutput: '[""]' }),
  parsedEntry('   ', { arrayOutput: '["   "]' }),
  parsedEntry('Hello world', { arrayOutput: '["Hello world"]' }),
  parsedEntry('Hello {world}', { arrayOutput: '["Hello {world}"]' }),
  // Interpolation
  parsedEntry('Hello ${name}', {
    arrayOutput: '({ name }) => ["Hello ",name,""]',
    variables: ['name'],
  }),
  parsedEntry('Hello ${name}', {
    arrayOutput: '({ name }) => ["Hello ",name,""]',
    variables: ['name'],
    output: '({ name }) => `Hello ${name}`',
  }),
  parsedEntry('Hello ${same} ${same}', {
    arrayOutput: '({ same }) => ["Hello ",same," ",same,""]',
    variables: ['same'],
  }),
  parsedEntry('Hello ${name} ${surname}', {
    arrayOutput: '({ name, surname }) => ["Hello ",name," ",surname,""]',
    variables: ['name', 'surname'],
  }),
  parsedEntry('Hello ${name} ${surname} ${name}', {
    arrayOutput:
      '({ name, surname }) => ["Hello ",name," ",surname," ",name,""]',
    variables: ['name', 'surname'],
  }),
  // Accessing Nested Object Properties
  parsedEntry('Hello ${info.name}', {
    arrayOutput: '({ info }) => ["Hello ",info.name,""]',
    variables: ['info'],
  }),
  parsedEntry('Hello ${info.person.name} ${info.person.surname}', {
    arrayOutput:
      '({ info }) => ["Hello ",info.person.name," ",info.person.surname,""]',
    variables: ['info'],
  }),
  parsedEntry('Hello ${deep.nested.object}', {
    arrayOutput: '({ deep }) => ["Hello ",deep.nested.object,""]',
    variables: ['deep'],
  }),
  parsedEntry('Hello ${deep.nested.object} ${info.person.name.x.y.z}', {
    arrayOutput:
      '({ deep, info }) => ["Hello ",deep.nested.object," ",info.person.name.x.y.z,""]',
    variables: ['deep', 'info'],
  }),
  parsedEntry('Hello ${info.t.x}', {
    arrayOutput: '({ info }) => ["Hello ",info.t.x,""]',
    variables: ['info'],
  }),
  parsedEntry('Hello ${info.c.x}', {
    arrayOutput: '({ info }) => ["Hello ",info.c.x,""]',
    variables: ['info'],
  }),
  parsedEntry('Hello ${info.l.x}', {
    arrayOutput: '({ info }) => ["Hello ",info.l.x,""]',
    variables: ['info'],
  }),
  // Escaping
  parsedEntry('Hello ${name} ${surname} \\${escaped}', {
    arrayOutput:
      '({ name, surname }) => ["Hello ",name," ",surname," \\${escaped}"]',
    variables: ['name', 'surname'],
  }),
  // Nested Translations
  parsedEntry("This is a ${t('another.key')}", {
    arrayOutput: '({}, { t }) => ["This is a ",t(\'another.key\'),""]',
    variables: [],
    functions: ['t'],
    entryKeys: ['another.key'],
  }),
  parsedEntry("This is a ${t('key')} ${t('another.key')}", {
    arrayOutput:
      '({}, { t }) => ["This is a ",t(\'key\')," ",t(\'another.key\'),""]',
    variables: [],
    functions: ['t'],
    entryKeys: ['key', 'another.key'],
  }),
  parsedEntry("This is a ${t('same.key')} ${t('same.key')}", {
    arrayOutput:
      '({}, { t }) => ["This is a ",t(\'same.key\')," ",t(\'same.key\'),""]',
    variables: [],
    functions: ['t'],
    entryKeys: ['same.key'],
  }),
  // Interpolation in Nested Translations
  parsedEntry("Today is ${day}! ${t('key', {name, surname})}", {
    arrayOutput:
      '({ day, name, surname }, { t }) => ["Today is ",day,"! ",t(\'key\', {\n    name,\n    surname\n}),""]',
    variables: ['day', 'name', 'surname'],
    functions: ['t'],
    entryKeys: ['key'],
  }),
  parsedEntry(
    "Multiple ${day}! ${t('key', {name})}  ${t('another.key', {surname, birthday})}",
    {
      arrayOutput:
        '({ day, name, surname, birthday }, { t }) => ["Multiple ",day,"! ",t(\'key\', { name }),"  ",t(\'another.key\', {\n    surname,\n    birthday\n}),""]',
      variables: ['day', 'name', 'surname', 'birthday'],
      functions: ['t'],
      entryKeys: ['key', 'another.key'],
    },
  ),
  // Conditional Groups
  parsedEntry("There is ${c('key', number_Of_Kids)}", {
    arrayOutput:
      '({ number_Of_Kids }, { c }) => ["There is ",c(\'key\', number_Of_Kids),""]',
    variables: ['number_Of_Kids'],
    functions: ['c'],
    conditionalGroupKeys: ['key'],
  }),
  parsedEntry("There is ${c('key', myVar1)} ${c('key', myVar2)}", {
    arrayOutput:
      '({ myVar1, myVar2 }, { c }) => ["There is ",c(\'key\', myVar1)," ",c(\'key\', myVar2),""]',
    variables: ['myVar1', 'myVar2'],
    functions: ['c'],
    conditionalGroupKeys: ['key'],
  }),
  parsedEntry(
    "There is ${c('key1', numberOfKids)} ${myVar} some ${c('key2', anotherVar)}",
    {
      arrayOutput:
        '({ numberOfKids, myVar, anotherVar }, { c }) => ["There is ",c(\'key1\', numberOfKids)," ",myVar," some ",c(\'key2\', anotherVar),""]',
      variables: ['numberOfKids', 'myVar', 'anotherVar'],
      functions: ['c'],
      conditionalGroupKeys: ['key1', 'key2'],
    },
  ),
  parsedEntry("There ${numberOfKids} ${c('child', numberOfKids)}", {
    arrayOutput:
      '({ numberOfKids }, { c }) => ["There ",numberOfKids," ",c(\'child\', numberOfKids),""]',
    variables: ['numberOfKids'],
    functions: ['c'],
    conditionalGroupKeys: ['child'],
  }),
  parsedEntry(
    "There ${c('present.be', numberOfKids)} ${numberOfKids} ${c('child', numberOfKids)}",
    {
      arrayOutput:
        '({ numberOfKids }, { c }) => ["There ",c(\'present.be\', numberOfKids)," ",numberOfKids," ",c(\'child\', numberOfKids),""]',
      variables: ['numberOfKids'],
      functions: ['c'],
      conditionalGroupKeys: ['present.be', 'child'],
    },
  ),
  // Interpolation in Conditional Groups
  parsedEntry("Ooops! ${c('item.error', numberOfItems, {item})}", {
    arrayOutput:
      '({ numberOfItems, item }, { c }) => ["Ooops! ",c(\'item.error\', numberOfItems, { item }),""]',
    variables: ['numberOfItems', 'item'],
    functions: ['c'],
    conditionalGroupKeys: ['item.error'],
  }),
  // Localization
  parsedEntry('Localization ${currency(myValue)}', {
    arrayOutput:
      '({ myValue }, { currency }) => ["Localization ",currency(myValue),""]',
    variables: ['myValue'],
    functions: ['currency'],
  }),
  // Escaping quotes
  parsedEntry('Example "quoted"', {
    arrayOutput: '["Example \\"quoted\\""]',
    output: '"Example \\"quoted\\""',
  }),
  parsedEntry('<a href="#link">link</a>', {
    arrayOutput: '["<a href=\\"#link\\">link</a>"]',
    output: '"<a href=\\"#link\\">link</a>"',
  }),
  parsedEntry('<a href="${link}">${t("another.key")}</a>', {
    arrayOutput:
      '({ link }, { t }) => ["<a href="",link,"">",t(\'another.key\'),"</a>"]',
    output: '({ link }, { t }) => `<a href="${link}">${t("another.key")}</a>`',
    variables: ['link'],
    functions: ['t'],
    entryKeys: ['another.key'],
  }),
];

export default validCases;
