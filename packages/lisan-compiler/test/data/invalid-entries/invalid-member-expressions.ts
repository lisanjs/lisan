import { ERRORS } from '../../../src/constants';
import { ValidationError } from '../../../src/errors';
import { InvalidCase } from '../../test-utils/types';

export default [
  {
    input: 'Using reserved variable names ${t.nested.param}',
    error: new ValidationError(ERRORS.ForbiddenVariableName('t'), [33, 34]),
  },
  {
    input: 'Using reserved variable names ${c.nested.param}',
    error: new ValidationError(ERRORS.ForbiddenVariableName('c'), [33, 34]),
  },
  {
    input: 'Cannot have call expressions ${first.second()}',
    error: new ValidationError(ERRORS.invalidCallExpression, [32, 44]),
  },
  {
    input: 'Cannot have call expressions ${first.second().third}',
    error: new ValidationError(ERRORS.InvalidMemberExpression, [32, 52]),
  },
  {
    input: 'Cannot have call expressions ${first.second(demo).third}',
    error: new ValidationError(ERRORS.InvalidMemberExpression, [32, 56]),
  },
  {
    input: 'Cannot have call expressions ${first.second("demo").third}',
    error: new ValidationError(ERRORS.InvalidMemberExpression, [32, 58]),
  },
  {
    input: 'Using computed nested params ${first.second[third].fourth}',
    error: new ValidationError(ERRORS.InvalidMemberExpression, [32, 58]),
  },
  {
    input:
      'Having unallowed Expressions in Member Expression ${first.second[func()].fourth}',
    error: new ValidationError(ERRORS.InvalidMemberExpression, [53, 80]),
  },
  {
    input:
      'Having unallowed Expressions in Member Expression ${first.second[() => {}].fourth}',
    error: new ValidationError(ERRORS.InvalidMemberExpression, [53, 82]),
  },
] as InvalidCase[];
