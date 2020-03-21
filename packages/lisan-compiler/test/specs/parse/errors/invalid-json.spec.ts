import { parse } from '../../../../src';
// import validJsonFile from '../../../data/validJsonFile';

describe('Given invalid inputs was provided', () => {
  it('should throw error', () => {
    // @ts-ignore
    expect(() => parse()).toThrow();
    // @ts-ignore
    expect(() => parse('')).toThrow();
    // @ts-ignore
    expect(() => parse(3)).toThrow();
    // @ts-ignore
    expect(() => parse({})).toThrow();
  });
});

describe('Given invalid "locale" was provided', () => {
  it('should throw error', () => {
    // @ts-ignore
    expect(() => parse({ locale: '' })).toThrow();
    // @ts-ignore
    expect(() => parse({ locale: '  ' })).toThrow();
  });
});

describe('Given empty "entries" was provided', () => {
  it('should throw error', () => {
    expect(() => parse({ locale: 'locale', entries: {} })).toThrow();

    expect(() =>
      parse({
        locale: 'locale',
        entries: {
          conditional: {},
        },
      }),
    ).toThrow();
  });
});

describe('Given empty conditional group was provided', () => {
  it('should throw error', () => {
    expect(() =>
      parse({
        locale: 'locale',
        entries: {
          key1: 'a simple key',
          conditional: {},
        },
      }),
    ).toThrow();
  });
});

describe('Given conditional group contains only 1 entry', () => {
  it('should throw error', () => {
    expect(() =>
      parse({
        locale: 'locale',
        entries: {
          key1: 'a simple key',
          conditional: {
            one: 'simple text',
          },
        },
      }),
    ).toThrow();
  });
});

describe('Given there are duplicate values', () => {
  it.skip('should throw error', () => {
    expect(() =>
      parse({
        locale: 'locale',
        entries: {
          duplicate: 'sameValue',
          duplicate2: 'sameValue',
        },
      }),
    ).toThrow();
  });
});
