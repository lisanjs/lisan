// eslint-disable-next-line import/no-unresolved
import * as ESTree from 'estree';
import * as AST_NODE_TYPES from '../../../utils/ast-node-types';
import { ValidationError } from '../../../errors';
import { ERRORS } from '../../../constants';
import isValidEntryKey from './is-valid-entry-key';
import validateIdentifier from './validate-identifier';
import validateObjectExpression from './validate-object-expression';

const validateCFn = (
  node: ESTree.CallExpression,
): { conditionalGroupKey: string; variables: string[] } => {
  if (node.arguments.length < 2 || node.arguments.length > 3) {
    throw new ValidationError(ERRORS.InvalidCFnArgumentCount, node.range);
  }

  const [firstArgNode, secondArgNode, thirdArgNode] = node.arguments;

  if (!isValidEntryKey(firstArgNode as ESTree.Expression)) {
    throw new ValidationError(ERRORS.EntryKeyMustBeString, firstArgNode.range);
  }

  const variables: string[] = [];

  if (!secondArgNode || secondArgNode.type !== AST_NODE_TYPES.Identifier) {
    throw new ValidationError(
      ERRORS.ConditionalValueIsMandatory,
      secondArgNode.range,
    );
  }

  variables.push(validateIdentifier(secondArgNode));

  if (thirdArgNode) {
    if (thirdArgNode.type !== AST_NODE_TYPES.ObjectExpression) {
      throw new ValidationError(
        ERRORS.ThirdArgumentMustBeObjectExpression,
        thirdArgNode.range,
      );
    }

    variables.push(...validateObjectExpression(thirdArgNode));
  }

  return {
    conditionalGroupKey: (firstArgNode as ESTree.Literal).value as string,
    variables,
  };
};

export default validateCFn;
