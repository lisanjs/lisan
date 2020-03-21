// eslint-disable-next-line import/no-unresolved
import * as ESTree from 'estree';
import * as AST_NODE_TYPES from '../../../utils/ast-node-types';
import { ERRORS } from '../../../constants';
import { ValidationError } from '../../../errors';
import validateIdentifier from './validate-identifier';

const validateObjectExpression = (
  node: ESTree.ObjectExpression,
): string[] | never => {
  const variables: string[] = [];
  node.properties.forEach((property): void | never => {
    if (
      property.type !== AST_NODE_TYPES.Property ||
      property.key.type !== AST_NODE_TYPES.Identifier ||
      property.value.type !== AST_NODE_TYPES.Identifier ||
      property.key.name !== property.value.name ||
      property.shorthand !== true ||
      property.computed === true ||
      property.method === true
    ) {
      throw new ValidationError(ERRORS.InvalidFnArgument, property.range);
    }

    variables.push(validateIdentifier(property.key as ESTree.Identifier));
  });

  return variables;
};

export default validateObjectExpression;
