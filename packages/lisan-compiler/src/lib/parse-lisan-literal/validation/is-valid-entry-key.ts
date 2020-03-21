// eslint-disable-next-line import/no-unresolved
import * as ESTree from 'estree';
import * as AST_NODE_TYPES from '../../../utils/ast-node-types';

const isValidEntryKey = (entryKeyNode: ESTree.Expression): boolean =>
  // First argument cannot be empty or something other than string
  // Nested template literals are not allowed
  entryKeyNode &&
  entryKeyNode.type === AST_NODE_TYPES.Literal &&
  typeof entryKeyNode.value === 'string' &&
  entryKeyNode.value.trim() !== '';

export default isValidEntryKey;
