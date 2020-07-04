import { ImmutableURLSearchParams } from '../lib/immurl';

/**
 * Array of search params defined without the leading ?
 */
export const SEARCH_PARAMS = [
  'q=URLUtils.searchParams&topic=api',
  'query',
  'foo=1&bar=2&foo=4',
];

const paramNamesToTest = ['topic', 'q', 'query', 'foo', 'bar'];

const searchParamStrings = [
  ...SEARCH_PARAMS,
  ...SEARCH_PARAMS.map((q) => `?${q}`),
];

describe('equivalent to the native URLSearchParams object', () => {
  test.each(searchParamStrings)('iterable - %s', (input) => {
    const immutable = new ImmutableURLSearchParams(input)[Symbol.iterator]();
    const native = new URLSearchParams(input)[Symbol.iterator]();

    // Spread operator here accomplishes everything we need to test about the iterators being equivalent:
    // - The lengths are the same
    // - Each value is the same and in the correct position
    expect([...immutable]).toEqual([...native]);
  });

  test.each(searchParamStrings)('toString() - %s', (input) => {
    const immutable = new ImmutableURLSearchParams(input);
    const native = new URLSearchParams(input);

    expect(immutable.toString()).toBe(native.toString());
  });

  test.each(searchParamStrings)('entries() - %s', (input) => {
    const immutable = new ImmutableURLSearchParams(input);
    const native = new URLSearchParams(input);

    expect(immutable.entries()).toEqual(native.entries());
  });

  test.each(searchParamStrings)('keys() - %s', (input) => {
    const immutable = new ImmutableURLSearchParams(input);
    const native = new URLSearchParams(input);

    expect(immutable.keys()).toEqual(native.keys());
  });

  test.each(searchParamStrings)('values() - %s', (input) => {
    const immutable = new ImmutableURLSearchParams(input);
    const native = new URLSearchParams(input);

    expect(immutable.values()).toEqual(native.values());
  });

  test.each(searchParamStrings)('forEach() - %s', (input) => {
    const immutable = new ImmutableURLSearchParams(input);
    const native = new URLSearchParams(input);

    const immutablesCallbackArgs: unknown[] = [];
    const nativeCallbackArgs: unknown[] = [];

    const immutableCallback = jest.fn((...args) =>
      immutablesCallbackArgs.push(args)
    );
    const nativeCallback = jest.fn((...args) => nativeCallbackArgs.push(args));

    immutable.forEach(immutableCallback);
    native.forEach(nativeCallback);

    expect(immutablesCallbackArgs).toEqual(nativeCallbackArgs);
  });

  test.each(searchParamStrings)('get() - %s', (input) => {
    const immutable = new ImmutableURLSearchParams(input);
    const native = new URLSearchParams(input);

    for (const paramName of paramNamesToTest) {
      expect(immutable.get(paramName)).toBe(native.get(paramName));
    }
  });

  test.each(searchParamStrings)('getAll() - %s', (input) => {
    const immutable = new ImmutableURLSearchParams(input);
    const native = new URLSearchParams(input);

    for (const paramName of paramNamesToTest) {
      expect(immutable.getAll(paramName)).toEqual(native.getAll(paramName));
    }
  });

  test.each(searchParamStrings)('has() - %s', (input) => {
    const immutable = new ImmutableURLSearchParams(input);
    const native = new URLSearchParams(input);

    for (const paramName of paramNamesToTest) {
      expect(immutable.has(paramName)).toBe(native.has(paramName));
    }
  });
});

test('append() is immutable', () => {
  const params = new ImmutableURLSearchParams();

  expect(params.append('foo', 'bar')).not.toBe(params);
  expect(params.append('foo', 'bar').toString()).not.toEqual(params.toString());
});

test('delete() is immutable', () => {
  const params = new ImmutableURLSearchParams('foo=bar');

  expect(params.delete('foo')).not.toBe(params);
  expect(params.delete('foo').toString()).not.toEqual(params.toString());
});

test('set() is immutable', () => {
  const params = new ImmutableURLSearchParams('foo=bar');

  expect(params.set('foo', 'baz')).not.toBe(params);
  expect(params.set('foo', 'baz').toString()).not.toEqual(params.toString());
});

test('sort() is immutable', () => {
  const params = new ImmutableURLSearchParams('foo=bar&bar=foo');

  expect(params.sort()).not.toBe(params);
  expect(params.sort().toString()).not.toEqual(params.toString());
});
