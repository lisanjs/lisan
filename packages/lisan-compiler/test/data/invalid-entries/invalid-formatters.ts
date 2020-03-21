import { ERRORS } from '../../../src/constants';
import { ValidationError } from '../../../src/errors';
import { InvalidCase } from '../../test-utils/types';

export default [
  {
    input: 'Using forbidden function names ${eval(x)}',
    error: new ValidationError(ERRORS.ForbiddenFunctionName('eval'), [34, 38]),
  },
] as InvalidCase[];
