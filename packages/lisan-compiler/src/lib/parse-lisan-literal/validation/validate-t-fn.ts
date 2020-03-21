// eslint-disable-next-line import/no-unresolved
import * as ESTree from 'estree';
import * as AST_NODE_TYPES from '../../../utils/ast-node-types';
import { ERRORS } from '../../../constants';
import { ValidationError } from '../../../errors';
import isValidEntryKey from './is-valid-entry-key';
import validateObjectExpression from './validate-object-expression';

const validateTFn = (
  node: ESTree.CallExpression,
): { entryKey: string; variables: string[] } => {
  if (node.arguments.length < 1 || node.arguments.length > 2) {
    throw new ValidationError(ERRORS.InvalidTFnArgumentCount, node.range);
  }

  const [firstArgNode, secondArgNode] = node.arguments;

  if (!isValidEntryKey(firstArgNode as ESTree.Expression)) {
    throw new ValidationError(ERRORS.EntryKeyMustBeString, firstArgNode.range);
  }

  let variables: string[] = [];
  if (secondArgNode) {
    if (secondArgNode.type !== AST_NODE_TYPES.ObjectExpression) {
      throw new ValidationError(
        ERRORS.SecondArgumentMustBeObjectExpression,
        secondArgNode.range,
      );
    }

    variables = validateObjectExpression(secondArgNode);
  }

  return {
    entryKey: (firstArgNode as ESTree.Literal).value as string,
    variables,
  };
};

export default validateTFn;
