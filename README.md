# immurl

🔗 A tiny (< 500B), 0-dependency, immutable URL library, backed by the native whatwg URL.

## Install

```
npm install immurl
```

Because immurl uses the native whatwg URL API under the hood you'll need a polyfill to support environments that [don't implment this API](https://developer.mozilla.org/en-US/docs/Web/API/URL#Browser_compatibility) eg. IE11.

## Usage

```typescript
import { ImmutableURL } from 'immurl';

const url = new ImmutableURL('https://example.com');
```

## API

See the docs at https://immurl.netlify.app/
