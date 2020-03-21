// eslint-disable-next-line import/no-unresolved
import * as ESTree from 'estree';
import * as AST_NODE_TYPES from '../../../utils/ast-node-types';
import { ValidationError } from '../../../errors';
import { ERRORS } from '../../../constants';
import validateIdentifier from './validate-identifier';

const validateMemberExpression = (
  node: ESTree.MemberExpression,
  // eslint-disable-next-line consistent-return
): string => {
  if (node.object.type === AST_NODE_TYPES.MemberExpression) {
    // if MemberExpression is something like:
    // first.second[third].fourth
    if (node.object.computed) {
      throw new ValidationError(ERRORS.InvalidMemberExpression, node.range);
    }

    return validateMemberExpression(node.object);
  }

  // If last item of the member expression is not an identifier
  if (node.object.type !== AST_NODE_TYPES.Identifier) {
    throw new ValidationError(ERRORS.InvalidMemberExpression, node.range);
  }

  // parent object name can't be reserved word
  validateIdentifier(node.object);
  // return identifier name
  return node.object.name;
};

export default validateMemberExpression;
