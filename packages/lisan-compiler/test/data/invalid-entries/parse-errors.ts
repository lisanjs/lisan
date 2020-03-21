import { ERRORS } from '../../../src/constants';
import { ParseError } from '../../../src/errors';
import { InvalidCase } from '../../test-utils/types';

export default [
  {
    input: 'A string with unescaped ` character.',
    error: new ParseError(ERRORS.BacktickNotAllowed, [24, 25]),
  },
  {
    input: '`A string with unescaped character.',
    error: new ParseError(ERRORS.BacktickNotAllowed, [0, 1]),
  },
  {
    input: 'Backtick is at the end`',
    error: new ParseError(ERRORS.BacktickNotAllowed, [22, 23]),
  },
  {
    input: 'Multiple`Backticks`',
    error: new ParseError(ERRORS.BacktickNotAllowed, [8, 9]),
  },
  {
    input: 'Template literals are not allowed ${t(`key`)}',
    error: new ParseError(ERRORS.BacktickNotAllowed, [38, 39]),
  },
  {
    input: 'Template literals are not allowed ${t(`${key}`)}',
    error: new ParseError(ERRORS.BacktickNotAllowed, [38, 39]),
  },
  {
    input: '${myvariable',
    error: new ParseError('Unterminated template literal (1:14)', [13, 14]),
  },
  {
    input: `\${
      multiple lines`,
    error: new ParseError('Unexpected token (2:15)', [18, 19]),
  },
] as InvalidCase[];
