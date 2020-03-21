import parseErrors from './parse-errors';
import invalidIdentifiers from './invalid-identifiers';
import invalidMemberExpressions from './invalid-member-expressions';
import invalidCallExpressions from './invalid-call-expressions';
import invalidExpressions from './invalid-expressions';
import invalidFormatters from './invalid-formatters';
import invalidSemantic from './invalid-semantic';

const invalidCases = [
  ...parseErrors,
  ...invalidIdentifiers,
  ...invalidMemberExpressions,
  ...invalidCallExpressions,
  ...invalidExpressions,
  ...invalidFormatters,
  ...invalidSemantic,
];

export default invalidCases;
