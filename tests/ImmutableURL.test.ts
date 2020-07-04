import { ImmutableURL, ImmutableURLSearchParams } from '../lib/immurl';
import { URL_PROPERTIES } from '../lib/constants';
import flatMap from 'lodash/flatMap';

const URLS = [
  'https://example.com',
  'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash',
  'https://測試',
];

const propertiesExcludingSearchParams = URL_PROPERTIES.filter(
  (p) => p !== 'searchParams'
);

describe('equivalent to the native URL object', () => {
  test.each<[string, typeof URL_PROPERTIES[number]]>(
    flatMap(propertiesExcludingSearchParams, (property) =>
      URLS.map(
        (url) => [url, property] as [string, typeof URL_PROPERTIES[number]]
      )
    )
  )(
    '"%s" has the same "%s" property as a native URL object',
    (input, property) => {
      const immutable = new ImmutableURL(input);
      const url = new URL(input);

      expect(immutable[property]).toEqual(url[property]);
    }
  );

  test.each(URLS)('toString - %s', (input) => {
    const immutable = new ImmutableURL(input);
    const url = new URL(input);

    expect(immutable.toString()).toBe(url.toString());
  });

  test.each(URLS)('seachParams - %s', (input) => {
    const immutable = new ImmutableURL(input);
    const url = new URL(input);

    expect(immutable.searchParams.toString()).toBe(url.searchParams.toString());
  });
});

test('is immutable', () => {
  const url = new ImmutableURL('https://example.com');

  expect(url.set('hash', 'foo').hash).not.toEqual(url.hash);
});

test('searchParams property is an ImmutableURLSearchParams', () => {
  const url = new ImmutableURL('https://example.com');

  expect(url.searchParams).toBeInstanceOf(ImmutableURLSearchParams);
});
