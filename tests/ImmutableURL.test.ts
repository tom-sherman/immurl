import { ImmutableURL, ImmutableURLSearchParams } from '../lib/immurl';
import { URL_PROPERTIES } from '../lib/constants';
import flatMap from 'lodash/flatMap';

const URLS = [
  'https://example.com',
  'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash',
  'https://測試',
];

describe('properties are equal with native URL object version', () => {
  test.each<[string, typeof URL_PROPERTIES[number]]>(
    flatMap(URL_PROPERTIES, (property) =>
      URLS.map(
        (url) => [url, property] as [string, typeof URL_PROPERTIES[number]]
      )
    )
  )(
    '"%s" has the same "%s" property as a native URL object',
    (input, property) => {
      const immutable = new ImmutableURL(input);
      const url = new URL(input);

      expect(immutable[property]);
    }
  );
});

test('is immutable', () => {
  const url = new ImmutableURL('https://example.com');

  expect(url.set('hash', 'foo').hash).not.toEqual(url.hash);
});

test('searchParams property is an ImmutableURLSearchParams', () => {
  const url = new ImmutableURL('https://example.com');

  expect(url.searchParams).toBeInstanceOf(ImmutableURLSearchParams);
});
