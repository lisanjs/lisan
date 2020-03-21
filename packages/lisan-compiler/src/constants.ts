const FORBIDDEN_VARIABLE_NAMES = Object.freeze(['t', 'c']);
const FORBIDDEN_FUNCTION_NAMES = Object.freeze(['eval']);

const LOCALIZATION_METHODS = Object.freeze([
  'currency',
  'ordinal',
  'number',
  'dateTime',
  'dateShort',
  'dateMedium',
  'dateLong',
  'dateFull',
  'timeShort',
  'timeMedium',
  'timeLong',
]);

const ERRORS = Object.freeze({
  InvalidTemplateLiteral:
    'Provided Lisan literal has to be a valid javascript template literal.',
  InvalidMemberExpression:
    'A member expression cannot contain call expressions or dynamic property accessing!',
  InvalidExpression: 'Entry contains invalid Expression statement.',
  // @todo improve this error message with list of allowed functions
  invalidCallExpression: 'Entry contains invalid call expression.',
  InvalidFormatterFnArgumentCount:
    'Formatters cannot take more than 1 arguments.',
  InvalidTFnArgumentCount: '"t" function cannot take more than 2 arguments.',
  InvalidCFnArgumentCount: '"c" function cannot take more than 3 arguments.',
  InvalidFnArgument:
    'Provided argument can only be an object expression with shorthand properties. Example: `{prop1, prop2, prop3}`',
  EntryKeyMustBeString: 'Entry key must be valid string.',
  FirstArgumentMustBeAValidIdentifier:
    'First argument must be valid identifier. Example: `timeShort(myValue)`',
  SecondArgumentMustBeObjectExpression:
    'Second argument must be an object expression.',
  ThirdArgumentMustBeObjectExpression:
    'Third argument must be an object expression.',
  ConditionalValueIsMandatory:
    '"c" requires a conditional value pick conditional entry.',
  ForbiddenVariableName: (name: string) =>
    `Lisan literal contains a forbidden variable name: "${name}".`,
  ForbiddenFunctionName: (name: string) =>
    `Lisan literal contains a forbidden variable name: "${name}".`,
  ConflictingFunctionName: (name: string) =>
    `Lisan literal contains a function with same variable name: "${name}".`,
  BacktickNotAllowed:
    'Backticks are not allowed in lisan literals. Please use backspace "\\" to escape backtick characters. Example: "\\`"',
  NoParentKeyCall:
    'Lisan literal cannot have a function call with its own entry key',
});

export {
  ERRORS,
  FORBIDDEN_VARIABLE_NAMES,
  LOCALIZATION_METHODS,
  FORBIDDEN_FUNCTION_NAMES,
};
