import * as constants from '../../../src/constants';

describe('Constants', () => {
  it('should always match the snapshot!', () => {
    expect(constants).toMatchSnapshot();
  });
});
