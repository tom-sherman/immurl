# immurl

🔗 A tiny (< 500B), 0-dependency, immutable URL library, backed by the native whatwg URL.

## Install

```
npm install immurl
```

Because immurl uses the native whatwg URL API under the hood you'll need a polyfill to support environments that [don't implment this API](https://developer.mozilla.org/en-US/docs/Web/API/URL#Browser_compatibility) eg. IE11.

## Usage

### `ImmutableURL`

`ImmutableURL` works as you expect, it contains all of the properties of the native [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL).

```typescript
import { ImmutableURL } from 'immurl';

const url = new ImmutableURL('https://example.com');

console.log(url.href); // 'https://example.com'

// Set properties with the .set() method

let newUrl = url.set('pathname', '/login');

// Because the set API is immutable you can chain calls to .set()

newUrl = url.set('pathname', '/bar').set('hash', '#heading'); // https://example.com/bar#heading
```

### `ImmutableURLSearchParams`

immurl also contains an immutable version of the [`URLSearchParams` API](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams); `ImmutableURLSearchParams`.

The API for `ImmutableURLSearchParams` is exactly the same as the native version except the methods that usually mutate (`.append()`, `.delete()`, `.sort()`) return a new `ImmutableURLSearchParams` instance.

```typescript
import { ImmutableURLSearchParams } from 'immurl';

let params = new ImmutableURLSearchParams('q=URLUtils.searchParams&topic=api');

params = params.append('foo', 'bar').delete('q'); // topic=api&foo=bar
```

The `searchParams` property of `ImmutableURL` returns an `ImmutableURLSearchParams`.

```typescript
const url = new ImmutableURL('https://example.com?foo=bar');

const newParams = url.searchParams
  .append('q', 'search-term')
  .set('foo', 'fuz')
  .sort();

// url.searchParams is unaffected (thanks to immutability 🎉)

// We can pass our newParams into url.set() to create a new url with the updated params
const newUrl = url.set('searchParams', newParams);

// The following code is equvalent to the above

const newUrl2 = url.set(
  'searchParams',
  url.searchParams.append('q', 'search-term').set('foo', 'fuz').sort()
);
```

## API

See the docs at https://immurl.netlify.app/
