// eslint-disable-next-line import/no-unresolved
import * as ESTree from 'estree';
import { Parser } from 'acorn';
import { LisanLiteral } from '../../typings';
import { ParseError } from '../../errors';
import { ERRORS } from '../../constants';

const validateBackticks = (str: string): void => {
  const backTickIndex = str.indexOf('`');
  if (
    backTickIndex > -1 &&
    (backTickIndex === 0 || str[backTickIndex - 1] !== '\\')
  ) {
    throw new ParseError(ERRORS.BacktickNotAllowed, [
      backTickIndex,
      backTickIndex + 1,
    ]);
  }
};

const convertToAst = (lisanLiteral: LisanLiteral): ESTree.Program => {
  validateBackticks(lisanLiteral);
  const templateLiteral = `\`${lisanLiteral}\``;

  try {
    return (Parser.parse(templateLiteral, {
      ranges: true,
      locations: false,
    }) as unknown) as ESTree.Program;
  } catch (err) {
    throw new ParseError(err.message, [err.pos - 1, err.pos]);
  }
};

export default convertToAst;
