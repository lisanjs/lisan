import { Lisan } from 'lisan';
import { Loader } from '../../src';

describe('lisan-plugin-loader > on node', () => {
  let lisanInstance;
  beforeEach(() => {
    lisanInstance = new Lisan();
  });

  it('should require the js file', () => {
    lisanInstance.use(
      Loader({
        dictionaryUrlFn: dictionaryName =>
          `${__dirname}/../data/${dictionaryName}.js`,
      }),
    );

    lisanInstance.load('example.lisan');

    expect(lisanInstance.t('anInterpolation', { name: 'John' })).toBe(
      'Hello John',
    );
  });

  /**
   * @jest-environment jsdom
   */
  it('should load the js file', () => {
    lisanInstance.use(
      Loader({
        dictionaryUrlFn: dictionaryName =>
          `${__dirname}/../data/${dictionaryName}.js`,
      }),
    );

    lisanInstance.load('example.lisan');

    expect(lisanInstance.t('anInterpolation', { name: 'John' })).toBe(
      'Hello John',
    );
  });
});
