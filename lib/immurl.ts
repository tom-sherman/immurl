import { URL_PROPERTIES } from './constants';

/**
 * Identical to the native URL interface except that all mutable properties are
 * readonly. To change any of these properties instead you should call the
 * `.set()` method which will return a new ImmutableURL object.
 *
 * All properties are identical to their native counterparts excelt
 * `searchParams` which instead is a `ImmutableURLSearchParams` whose methods
 * are all fully immutable.
 *
 * ```typescript
 * let url = new ImmutableURL('http://example.com');
 * url = url.set('path', '/foo'); // = ImmutableURL { http://example.com/foo }
 *```
 *
 * To modify the search params you can call the immutable methods on
 * searchParams to return a new ImmutableURLSearchParams which can then be
 * passed to .set()
 *
 * ```typescript
 * const newSearchParams = url.searchParams.append('foo', 'bar');
 *
 * url = url.set('searchParams', newSearchParams);
 *
 * // Or a shorthand
 *
 * url = url.set('searchParams', url.searchParams.append('foo', 'bar'));
 * ```
 */
export class ImmutableURL implements Readonly<URL> {
  private readonly _url: URL;
  readonly hash!: string;
  readonly host!: string;
  readonly hostname!: string;
  readonly href!: string;
  readonly origin!: string;
  readonly password!: string;
  readonly pathname!: string;
  readonly port!: string;
  readonly protocol!: string;
  readonly search!: string;
  readonly searchParams!: ImmutableURLSearchParams;
  readonly username!: string;

  constructor(url: URL);
  constructor(url: string, base?: string | URL);
  constructor(url: string | URL, base?: string | URL) {
    this._url = typeof url === 'object' ? url : new URL(url, base);

    for (const key of URL_PROPERTIES) {
      this[key] = this._url[key] as any;
    }

    this.searchParams = new ImmutableURLSearchParams(this.searchParams);
  }

  toString() {
    return this._url.toString();
  }

  toJSON() {
    return this._url.toJSON();
  }

  /**
   * @param property The property of the URL to set
   * @param newValue The new value
   */
  set<P extends Exclude<keyof URL, 'toJSON' | 'origin'>>(
    property: P,
    newValue: URL[P]
  ): ImmutableURL {
    const newUrl = new URL(this.toString());

    newUrl[property] = newValue;

    return new ImmutableURL(newUrl);
  }
}

/**
 * Properties on URLSearchParams that mutate the instance
 * @internal
 */
type SearchParamsMutatingProperties = 'sort' | 'set' | 'delete' | 'append';

/**
 * Methods that should return a new ImmutableURLSearchParams
 * @internal
 */
type SearchParamsModifiers = {
  [method in SearchParamsMutatingProperties]: (
    ...args: any[]
  ) => ImmutableURLSearchParams;
};

/**
 * Identical to the native URLSearchParams interface except that all mutable methods instead return a new `ImmutableURLSearchParams`.
 */
export class ImmutableURLSearchParams
  implements
    Omit<URLSearchParams, SearchParamsMutatingProperties>,
    SearchParamsModifiers {
  private readonly _params: URLSearchParams;

  constructor(
    init?: string[][] | Record<string, string> | string | URLSearchParams
  ) {
    this._params = new URLSearchParams(init);
  }

  append(key: string, value: string): ImmutableURLSearchParams {
    const newParams = new URLSearchParams(this.toString());

    newParams.append(key, value);

    return new ImmutableURLSearchParams(newParams);
  }

  delete(key: string): ImmutableURLSearchParams {
    const newParams = new URLSearchParams(this.toString());

    newParams.delete(key);

    return new ImmutableURLSearchParams(newParams);
  }

  set(key: string, value: string): ImmutableURLSearchParams {
    const newParams = new URLSearchParams(this.toString());

    newParams.set(key, value);

    return new ImmutableURLSearchParams(newParams);
  }

  sort(): ImmutableURLSearchParams {
    const newParams = new URLSearchParams(this.toString());

    newParams.sort();

    return new ImmutableURLSearchParams(newParams);
  }

  forEach(
    callbackfn: (value: string, key: string, parent: URLSearchParams) => void,
    thisArg?: any
  ) {
    return this._params.forEach(callbackfn, thisArg);
  }

  get(name: string) {
    return this._params.get(name);
  }

  getAll(name: string) {
    return this._params.getAll(name);
  }

  has(name: string) {
    return this._params.has(name);
  }

  toString() {
    return this._params.toString();
  }

  entries() {
    return this._params.entries();
  }

  keys() {
    return this._params.keys();
  }

  values() {
    return this._params.values();
  }

  [Symbol.iterator]() {
    return this._params.entries();
  }
}
