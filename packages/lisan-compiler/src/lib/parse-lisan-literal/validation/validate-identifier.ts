// eslint-disable-next-line import/no-unresolved
import * as ESTree from 'estree';
import { FORBIDDEN_VARIABLE_NAMES, ERRORS } from '../../../constants';
import { ValidationError } from '../../../errors';

const validateIdentifier = (node: ESTree.Identifier): string => {
  if (FORBIDDEN_VARIABLE_NAMES.includes(node.name)) {
    throw new ValidationError(
      ERRORS.ForbiddenVariableName(node.name),
      node.range,
    );
  }

  return node.name;
};

export default validateIdentifier;
