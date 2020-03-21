import * as TSLisan from 'lisan-types';

const err = (message: string): never => {
  throw new Error(message);
};

const defaultConditions: TSLisan.Conditions = {
  zero: (num: number): boolean => num === 0,
  one: (num: number): boolean => num === 1,
};

const defaultConditionTags = ['zero', 'one', 'other'];

export { err, defaultConditions, defaultConditionTags };
