import { URL_PROPERTIES } from './constants';

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
   *
   * @param property The property to set
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
 */
type SearchParamsMutatingProperties = 'sort' | 'set' | 'delete' | 'append';

/**
 * Methods that should return a new ImmutableURLSearchParams
 */
type SearchParamsModifiers = {
  [method in SearchParamsMutatingProperties]: (
    ...args: any[]
  ) => ImmutableURLSearchParams;
};

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
