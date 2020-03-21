import { ERRORS } from '../../../src/constants';
import { ValidationError } from '../../../src/errors';
import { InvalidCase } from '../../test-utils/types';

export default [
  {
    input: '${() => {}}',
    error: new ValidationError(ERRORS.InvalidExpression, [3, 11]),
  },
  {
    input: '${3 * 4}',
    error: new ValidationError(ERRORS.InvalidExpression, [3, 8]),
  },
] as InvalidCase[];
