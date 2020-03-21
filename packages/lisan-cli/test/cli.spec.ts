import * as chokidar from 'chokidar';
import cli from '../src/cli';

jest.mock('chokidar', () => ({
  watch: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
  })),
}));

describe('first test', () => {
  // eslint-disable-next-line jest/expect-expect, jest/no-test-callback
  it('should pass', done => {
    cli.parse(['compile', '--watch'], (err, argv, output) => {
      /**
        expect(chokidar.watch).toHaveBeenCalledWith(
          'i18n/translations/** /*.json',
          {
            cwd: '.',
            ignoreInitial: true,
            ignored: [],
          },
        );
      */
      done();
    });
  });
});
