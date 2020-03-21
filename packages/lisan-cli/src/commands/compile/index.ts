import yargs from 'yargs';
import compile from './compile';
import { CompileCommandArgs } from '../../typings';
import { getConfigFromFile } from '../../config';

const command = ['compile'];
const describe = 'Compile translation files into dictionary files';
const builder = {
  i: {
    alias: 'inputDir',
    desc: 'Source directory where translation files are located.',
    string: true,
    normalize: true,
    group: 'Main',
  },
  o: {
    alias: 'outputDir',
    desc: 'Directory where dictionary files will be generated!',
    string: true,
    normalize: true,
    group: 'Main',
  },
  e: {
    alias: 'exclude',
    desc: 'Exclude all json files matching with glob-like file pattern.',
    array: true,
    default: [],
    group: 'Main',
  },
  allowNonExistingKeys: {
    group: 'Compiler Options',
    desc: 'Allows using non-existing keys in t() and c() functions.',
    boolean: true,
    default: false,
  },
  autoTrimValues: {
    group: 'Compiler Options',
    desc: 'Trims the whitespace chars from every Lisan Literal entry.',
    boolean: true,
    default: true,
  },
  sortEntryKeys: {
    group: 'Compiler Options',
    desc: 'Sorts dictionary keys by alphabetical order.',
    boolean: true,
    default: true,
  },
  module: {
    group: 'Compiler Options',
    desc: 'Sorts dictionary keys by alphabetical order.',
    string: true,
    normalize: true,
    default: 'lisan',
    choices: ['none', 'cjs', 'esm', 'lisan'],
  },
  w: {
    alias: 'watch',
    desc: 'Enable watching source directory for changes!',
    boolean: true,
    default: false,
    group: 'Development',
  },
};
const handler = async (argv: yargs.Arguments): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _, $0, config: configPath, ...compileCommandOptions } = argv;

  const fileConfig = getConfigFromFile(configPath as string) as {
    compile: CompileCommandArgs;
  };

  const compileOptions = (fileConfig?.compile ||
    (compileCommandOptions as unknown)) as CompileCommandArgs;

  try {
    compile(compileOptions);
  } catch (err) {
    // console.error(err.message);
    // throw err;
  }
};

export { command, describe, builder, handler };
