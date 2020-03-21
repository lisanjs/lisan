import {
  Scenario,
  prepareDateBase,
  PrepareResult,
} from '../../../../test-utils/localization';
import data from './tokens/fixtures';

const method = 'dateTime';

const scenarios: Scenario[] = [];

data.forEach(dateCase => {
  Object.keys(dateCase.tokens).forEach(token => {
    scenarios.push({
      prepare: (locale): PrepareResult => {
        const { date, ordinal } = prepareDateBase(locale);
        date.masks = {
          ...date.masks,
          [method]: token,
        };
        return {
          locale: { ...locale, date, ordinal },
          delta: { method, token },
        };
      },
      expectations: [
        {
          input: dateCase.date,
          output: dateCase.tokens[token],
        },
        {
          input: dateCase.date.getTime(),
          output: dateCase.tokens[token],
        },
      ],
    });
  });
});

export default {
  method,
  scenarios,
};
