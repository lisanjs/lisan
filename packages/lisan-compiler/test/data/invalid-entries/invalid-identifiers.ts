import { ERRORS } from '../../../src/constants';
import { ValidationError } from '../../../src/errors';
import { InvalidCase } from '../../test-utils/types';

export default [
  {
    input: 'Using reserved variable names ${t}',
    error: new ValidationError(ERRORS.ForbiddenVariableName('t'), [33, 34]),
  },
  {
    input: 'Using reserved variable names ${c}',
    error: new ValidationError(ERRORS.ForbiddenVariableName('c'), [33, 34]),
  },
] as InvalidCase[];
