// eslint-disable-next-line import/no-unresolved
import * as ESTree from 'estree';
import * as AST_NODE_TYPES from '../../utils/ast-node-types';
import convertToAst from './convert-to-ast';
import extractLisanLiteral from './extract-lisan-literal';
import { LisanLiteral, ParsedLisanLiteral } from '../../typings';
import { ERRORS } from '../../constants';
import { ValidationError } from '../../errors';
import render from './render';

const parseLisanLiteral = (lisanLiteral: LisanLiteral): ParsedLisanLiteral => {
  const astRoot = convertToAst(lisanLiteral);

  // Must be a valid Template Literal
  const { type, expression } = astRoot.body[0] as ESTree.ExpressionStatement;

  /* istanbul ignore if */
  if (
    astRoot.type !== AST_NODE_TYPES.Program ||
    type !== AST_NODE_TYPES.ExpressionStatement ||
    expression.type !== AST_NODE_TYPES.TemplateLiteral
  ) {
    throw new ValidationError(
      ERRORS.InvalidTemplateLiteral,
      astRoot.range || [0, 0],
    );
  }

  const extractedInfo = extractLisanLiteral(expression);

  extractedInfo.functions.forEach(fnName => {
    if (extractedInfo.variables.includes(fnName)) {
      throw new ValidationError(ERRORS.ConflictingFunctionName(fnName));
    }
  });

  return {
    input: lisanLiteral,
    output: render(
      lisanLiteral,
      extractedInfo.variables,
      extractedInfo.functions,
    ),
    ...extractedInfo,
  };
};

export { parseLisanLiteral };
