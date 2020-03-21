import { ERRORS } from '../../../src/constants';
import { ValidationError } from '../../../src/errors';
import { InvalidCase } from '../../test-utils/types';

export default [
  {
    input: 'Unallowed call expression ${first.second()}',
    error: new ValidationError(ERRORS.invalidCallExpression, [29, 41]),
  },
  {
    input: 'Unallowed call expression ${first.second.third()}',
    error: new ValidationError(ERRORS.invalidCallExpression, [29, 47]),
  },
  {
    input: 'Invalid Formatter function arguments ${number()}',
    error: new ValidationError(ERRORS.InvalidFormatterFnArgumentCount, [
      40,
      48,
    ]),
  },
  {
    input: 'Invalid Formatter function arguments ${number(valid, invalid)}',
    error: new ValidationError(ERRORS.InvalidFormatterFnArgumentCount, [
      40,
      62,
    ]),
  },
  {
    input: 'Invalid Formatter function arguments ${number("valid")}',
    error: new ValidationError(ERRORS.FirstArgumentMustBeAValidIdentifier, [
      47,
      54,
    ]),
  },
  {
    input: 'Invalid Identifier for call expression ${[m]()}',
    error: new ValidationError(ERRORS.invalidCallExpression, [42, 45]),
  },
  {
    input: 'Invalid Identifier for call expression ${m()()}',
    error: new ValidationError(ERRORS.invalidCallExpression, [42, 45]),
  },
  // t function
  {
    input: 'Invalid t function arg count ${t(arg1, arg2, arg3)}',
    error: new ValidationError(ERRORS.InvalidTFnArgumentCount, [32, 51]),
  },
  {
    input: 'Invalid t function arg count ${t()}',
    error: new ValidationError(ERRORS.InvalidTFnArgumentCount, [32, 35]),
  },
  {
    input: 'Invalid t function first arg ${t("")}',
    error: new ValidationError(ERRORS.EntryKeyMustBeString, [34, 36]),
  },
  {
    input: 'Invalid t function first arg ${t("    ")}',
    error: new ValidationError(ERRORS.EntryKeyMustBeString, [34, 40]),
  },
  {
    input: 'Invalid t function first arg ${t(arg1)}',
    error: new ValidationError(ERRORS.EntryKeyMustBeString, [34, 38]),
  },
  {
    input: 'Invalid t function first arg ${t(5)}',
    error: new ValidationError(ERRORS.EntryKeyMustBeString, [34, 35]),
  },
  {
    input: 'Invalid t function first arg ${t(true)}',
    error: new ValidationError(ERRORS.EntryKeyMustBeString, [34, 38]),
  },
  {
    input: 'Invalid t function first arg ${t(x.y.z)}',
    error: new ValidationError(ERRORS.EntryKeyMustBeString, [34, 39]),
  },
  {
    input: 'Invalid t function second arg ${t("key", 3)}',
    error: new ValidationError(ERRORS.SecondArgumentMustBeObjectExpression, [
      42,
      43,
    ]),
  },
  {
    input: 'Invalid t function second arg ${t("key", x)}',
    error: new ValidationError(ERRORS.SecondArgumentMustBeObjectExpression, [
      42,
      43,
    ]),
  },
  {
    input: 'Invalid t function second arg ${t("key", true)}',
    error: new ValidationError(ERRORS.SecondArgumentMustBeObjectExpression, [
      42,
      46,
    ]),
  },
  {
    input: 'Invalid t function second arg ${t("key", {[a]: true})}',
    error: new ValidationError(ERRORS.InvalidFnArgument, [43, 52]),
  },
  {
    input: 'Invalid t function second arg ${t("key", {a, b: 4})}',
    error: new ValidationError(ERRORS.InvalidFnArgument, [46, 50]),
  },
  {
    input: 'Invalid t function second arg reserved ${t("key", {t})}',
    error: new ValidationError(ERRORS.ForbiddenVariableName('t'), [52, 53]),
  },
  {
    input: 'Invalid t function second arg reserved ${t("key", {c})}',
    error: new ValidationError(ERRORS.ForbiddenVariableName('c'), [52, 53]),
  },
  // c function
  {
    input: 'Invalid c function arg count ${c(arg1, arg2, arg3, arg4)}',
    error: new ValidationError(ERRORS.InvalidCFnArgumentCount, [32, 57]),
  },
  {
    input: 'Invalid c function arg count ${c()}',
    error: new ValidationError(ERRORS.InvalidCFnArgumentCount, [32, 35]),
  },
  {
    input: 'Invalid c function first arg ${c("", myval)}',
    error: new ValidationError(ERRORS.EntryKeyMustBeString, [34, 36]),
  },
  {
    input: 'Invalid c function first arg ${c("    ", myval)}',
    error: new ValidationError(ERRORS.EntryKeyMustBeString, [34, 40]),
  },
  {
    input: 'Invalid c function first arg ${c(arg1, myval)}',
    error: new ValidationError(ERRORS.EntryKeyMustBeString, [34, 38]),
  },
  {
    input: 'Invalid c function first arg ${c(5, myval)}',
    error: new ValidationError(ERRORS.EntryKeyMustBeString, [34, 35]),
  },
  {
    input: 'Invalid c function first arg ${c(true, myval)}',
    error: new ValidationError(ERRORS.EntryKeyMustBeString, [34, 38]),
  },
  {
    input: 'Invalid c function first arg ${c(x.y.z, myval)}',
    error: new ValidationError(ERRORS.EntryKeyMustBeString, [34, 39]),
  },
  {
    input: 'Invalid c function second arg ${c("key", 3)}',
    error: new ValidationError(ERRORS.ConditionalValueIsMandatory, [42, 43]),
  },
  {
    input: 'Invalid c function second arg ${c("key", {x})}',
    error: new ValidationError(ERRORS.ConditionalValueIsMandatory, [42, 45]),
  },
  {
    input: 'Invalid c function second arg reserved ${c("key", {t})}',
    error: new ValidationError(ERRORS.ConditionalValueIsMandatory, [51, 54]),
  },
  {
    input: 'Invalid c function second arg reserved ${c("key", {c})}',
    error: new ValidationError(ERRORS.ConditionalValueIsMandatory, [51, 54]),
  },
  {
    input: 'Invalid c function second arg reserved ${c("key", {l})}',
    error: new ValidationError(ERRORS.ConditionalValueIsMandatory, [51, 54]),
  },
  {
    input: 'Invalid c function second arg reserved ${c("key", {_t})}',
    error: new ValidationError(ERRORS.ConditionalValueIsMandatory, [51, 55]),
  },
  {
    input: 'Invalid c function second arg reserved ${c("key", {_c})}',
    error: new ValidationError(ERRORS.ConditionalValueIsMandatory, [51, 55]),
  },
  {
    input: 'Invalid c function second arg reserved ${c("key", {_l})}',
    error: new ValidationError(ERRORS.ConditionalValueIsMandatory, [51, 55]),
  },
  {
    input: 'Invalid c function third arg ${c("key", x, y)}',
    error: new ValidationError(ERRORS.ThirdArgumentMustBeObjectExpression, [
      44,
      45,
    ]),
  },
  {
    input: 'Invalid c function third arg ${c("key", x, true)}',
    error: new ValidationError(ERRORS.ThirdArgumentMustBeObjectExpression, [
      44,
      48,
    ]),
  },
  {
    input: 'Invalid c function third arg ${c("key", x, {[a]: true})}',
    error: new ValidationError(ERRORS.InvalidFnArgument, [45, 54]),
  },
  {
    input: 'Invalid c function third arg ${c("key", x, {a, b: 4})}',
    error: new ValidationError(ERRORS.InvalidFnArgument, [48, 52]),
  },
  {
    input: 'Invalid c function third arg reserved ${c("key", x, {t})}',
    error: new ValidationError(ERRORS.ForbiddenVariableName('t'), [54, 55]),
  },
  {
    input: 'Invalid c function third arg reserved ${c("key", x, {c})}',
    error: new ValidationError(ERRORS.ForbiddenVariableName('c'), [54, 55]),
  },
] as InvalidCase[];
