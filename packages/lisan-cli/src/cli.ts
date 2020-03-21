import * as yargs from 'yargs';
import * as findUp from 'find-up';
import * as path from 'path';
import { getConfigFromFile } from './config';
import { registerCommands } from './commands';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../package.json');

registerCommands();

const configPath = findUp.sync(['.lisanrc', '.lisanrc.json']) || '';

// init program
yargs
  .scriptName('lisan')
  .usage('Usage: $0 <command> [options]')
  .epilogue('For more information, please visit http://lisanjs.com')
  .alias('v', 'version')
  .config(getConfigFromFile(configPath))
  .option('c', {
    alias: 'config',
    desc: 'Path to JSON config file',
    default: path.relative(process.cwd(), configPath),
  })
  .version(pkg.version)
  .alias('h', 'help')
  .help('help')
  .showHelpOnFail(false, 'Specify --help for available options');

export default yargs;
