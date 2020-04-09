// eslint-disable-next-line import/no-unresolved
import * as ESTree from 'estree';
import { generate } from 'escodegen';
import * as AST_NODE_TYPES from '../../utils/ast-node-types';
import convertToAst from './convert-to-ast';
import extractLisanLiteral from './extract-lisan-literal';
import { LisanLiteral, ParsedLisanLiteral } from '../../typings';
import { ERRORS } from '../../constants';
import { ValidationError } from '../../errors';
import render from './render';

const parseLisanLiteral = (
  lisanLiteral: LisanLiteral,
  { returnArray = false }: { returnArray?: boolean } = {},
): ParsedLisanLiteral => {
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

  const isArray =
    returnArray &&
    (extractedInfo.variables.length || extractedInfo.functions.length);

  let outputArray = lisanLiteral;
  if (isArray) {
    const elements = [...expression.quasis, ...expression.expressions];
    const pieces = elements
      .sort(
        (a, b): number =>
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          a.range![0] - b.range![0],
      )
      .map(node => {
        const code = generate(node);
        if (node.type === AST_NODE_TYPES.TemplateElement) {
          return `"${code}"`;
        }

        return code;
      });
    outputArray = `[${pieces.join(',')}]`;
  }

  return {
    input: lisanLiteral,
    output: render({
      input: isArray ? outputArray : lisanLiteral,
      returnArray,
      variables: extractedInfo.variables,
      functions: extractedInfo.functions,
    }),
    ...extractedInfo,
  };
};

export { parseLisanLiteral };
