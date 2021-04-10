import { ImmutableHeaders } from '../lib/immurl';

describe.each([
  {
    foo: '1',
    bar: '2',
  },
  [
    ['foo', '1'],
    ['bar', '2'],
  ],
  new Headers({
    foo: '1',
    bar: '2',
  }),
])('equivalent to the native Headers object for input %p', (input) => {
  test('entries()', () => {
    const immutable = new ImmutableHeaders(input);
    const headers = new Headers(input);

    expect([...immutable.entries()]).toEqual([...headers.entries()]);
  });

  test('keys()', () => {
    const immutable = new ImmutableHeaders(input);
    const headers = new Headers(input);

    expect([...immutable.keys()]).toEqual([...headers.keys()]);
  });

  test('values()', () => {
    const immutable = new ImmutableHeaders(input);
    const headers = new Headers(input);

    expect([...immutable.values()]).toEqual([...headers.values()]);
  });
});

test('append() is immutable', () => {
  const headers = new ImmutableHeaders();

  expect(headers.append('foo', 'bar')).not.toBe(headers);
  expect([...headers.append('foo', 'bar')]).not.toEqual([...headers]);
});

test('delete() is immutable', () => {
  const headers = new ImmutableHeaders({ foo: 'bar' });

  expect(headers.delete('foo')).not.toBe(headers);
  expect([...headers.delete('foo')]).not.toEqual([...headers]);
});

test('set() is immutable', () => {
  const headers = new ImmutableHeaders({ foo: 'bar' });

  expect(headers.set('foo', 'baz')).not.toBe(headers);
  expect([...headers.set('foo', 'baz')]).not.toEqual([...headers]);
});
