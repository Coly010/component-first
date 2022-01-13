export interface Action<T> {
  name: string;
}

export type SelectorResult<T> = () => T;
