import * as yargs from 'yargs';
import * as compile from './compile';

const commands: { [key: string]: yargs.CommandModule } = {
  compile,
};

const registerCommands = (): void =>
  Object.keys(commands).forEach((key: string): void => {
    yargs.command(commands[key]);
  });

export { registerCommands };
