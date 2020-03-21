// eslint-disable-next-line import/no-unresolved
import * as ESTree from 'estree';
import * as AST_NODE_TYPES from '../../utils/ast-node-types';
import { ValidationError } from '../../errors';
import { ERRORS } from '../../constants';
import {
  validateIdentifier,
  validateMemberExpression,
  validateCallExpression,
} from './validation';
import { ExtractedInfo } from '../../typings';
import uniqify from '../../utils/uniqify';

const extractLisanLiteral = (
  expression: ESTree.TemplateLiteral,
): ExtractedInfo => {
  const extractedInfo: ExtractedInfo = {
    variables: [],
    functions: [],
    entryKeys: [],
    conditionalGroupKeys: [],
  };

  expression.expressions.forEach((node): void | never => {
    // Check against reserved variable names
    if (node.type === AST_NODE_TYPES.Identifier) {
      const variableName = validateIdentifier(node);
      extractedInfo.variables.push(variableName);
      return;
    }

    if (node.type === AST_NODE_TYPES.MemberExpression) {
      const variableName = validateMemberExpression(node);
      extractedInfo.variables.push(variableName);
      return;
    }

    if (node.type === AST_NODE_TYPES.CallExpression) {
      const {
        variables,
        functions,
        entryKeys,
        conditionalGroupKeys,
      } = validateCallExpression(node);
      extractedInfo.variables.push(...variables);
      extractedInfo.functions.push(...functions);
      extractedInfo.entryKeys.push(...entryKeys);
      extractedInfo.conditionalGroupKeys.push(...conditionalGroupKeys);
      return;
    }

    throw new ValidationError(ERRORS.InvalidExpression, node.range);
  });

  return {
    variables: uniqify(extractedInfo.variables),
    functions: uniqify(extractedInfo.functions),
    entryKeys: uniqify(extractedInfo.entryKeys),
    conditionalGroupKeys: uniqify(extractedInfo.conditionalGroupKeys),
  };
};

export default extractLisanLiteral;
