// eslint-disable-next-line import/no-unresolved
import * as ESTree from 'estree';
import * as AST_NODE_TYPES from '../../../utils/ast-node-types';
import { ERRORS } from '../../../constants';
import validateTFn from './validate-t-fn';
import validateFormatterFn from './validate-formatter-fn';
import validateCFn from './valiate-c-fn';
import { ValidationError } from '../../../errors';
import { ExtractedInfo } from '../../../typings';

const validateCallExpression = (node: ESTree.CallExpression): ExtractedInfo => {
  if (node.callee.type !== AST_NODE_TYPES.Identifier) {
    throw new ValidationError(ERRORS.invalidCallExpression, node.callee.range);
  }

  if (node.callee.name === 't') {
    const { entryKey, variables } = validateTFn(node);
    return {
      variables,
      functions: ['t'],
      entryKeys: [entryKey],
      conditionalGroupKeys: [],
    };
  }

  if (node.callee.name === 'c') {
    const { conditionalGroupKey, variables } = validateCFn(node);
    return {
      variables,
      functions: ['c'],
      entryKeys: [],
      conditionalGroupKeys: [conditionalGroupKey],
    };
  }

  const { variables, functions } = validateFormatterFn(node);
  return {
    variables,
    functions,
    entryKeys: [],
    conditionalGroupKeys: [],
  };
};

export default validateCallExpression;
