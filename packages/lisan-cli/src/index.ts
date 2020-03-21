/* istanbul ignore file */
import cli from './cli';

const { argv } = cli;

if (!argv._[0]) {
  cli.showHelp();
}
