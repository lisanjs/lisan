import { ERRORS } from '../../../src/constants';
import { ValidationError } from '../../../src/errors';
import { InvalidCase } from '../../test-utils/types';

export default [
  {
    input: 'Using duplicate ${myfunc} function names ${myfunc(x)}',
    error: new ValidationError(ERRORS.ConflictingFunctionName('myfunc')),
  },
  {
    input: 'Using duplicate function names ${afunction(afunction)}',
    error: new ValidationError(ERRORS.ConflictingFunctionName('afunction')),
  },
] as InvalidCase[];
