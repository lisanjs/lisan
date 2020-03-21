// eslint-disable-next-line import/no-unresolved
import * as ESTree from 'estree';
import * as AST_NODE_TYPES from '../../../utils/ast-node-types';
import { ValidationError } from '../../../errors';
import { ERRORS, FORBIDDEN_FUNCTION_NAMES } from '../../../constants';
import validateIdentifier from './validate-identifier';

const validateFormatterFn = (
  node: ESTree.CallExpression,
): { functions: string[]; variables: string[] } => {
  if (node.arguments.length !== 1) {
    throw new ValidationError(
      ERRORS.InvalidFormatterFnArgumentCount,
      node.range,
    );
  }

  const [firstArgNode] = node.arguments;
  if (firstArgNode.type !== AST_NODE_TYPES.Identifier) {
    throw new ValidationError(
      ERRORS.FirstArgumentMustBeAValidIdentifier,
      firstArgNode.range,
    );
  }

  const variable = validateIdentifier(firstArgNode);
  const fnName = (node.callee as ESTree.Identifier).name;

  if (FORBIDDEN_FUNCTION_NAMES.includes(fnName)) {
    throw new ValidationError(
      ERRORS.ForbiddenFunctionName(fnName),
      node.callee.range,
    );
  }

  return {
    variables: [variable],
    functions: [fnName],
  };
};

export default validateFormatterFn;
