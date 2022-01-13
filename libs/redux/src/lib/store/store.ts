import { ChangeDetectorRef } from '@angular/core';
import { Action, SelectorResult } from '../types';

export class Store<T> {
  private state!: T;
  private reducers: Record<
    string,
    Array<(state: T, actionPayload?: any) => T>
  > = {};
  private effects: Record<string, () => void> = {};
  private cd!: ChangeDetectorRef;

  init(cd: ChangeDetectorRef, state: T) {
    this.cd = cd;
    this.state = state;
  }

  get() {
    return this.state;
  }

  select<R>(selector: (state: T) => R): SelectorResult<R | null> {
    return () => (this.state ? selector(this.state) : null);
  }

  createAction<P extends object>(name: string) {
    return { name } as Action<P>;
  }

  createEffect<P>(action: Action<P>, effectHandler: () => void) {}

  createReducer<P, R extends T>(
    action: Action<P>,
    reducer: (
      state: T,
      actionPayload: P
    ) => R extends T ? (T extends R ? R : never) : never
  ) {
    if (!(action.name in this.reducers)) {
      this.reducers[action.name] = [];
    }

    this.reducers[action.name] = [...this.reducers[action.name], reducer];
  }

  dispatchAction<P>(action: Action<P>, payload?: P) {
    this.handleAction(action, payload);
    console.log(this.state);
  }

  private handleAction<P>(action: Action<P>, payload?: P) {
    let virtualState = { ...this.state };
    const reducers = this.reducers[action.name];
    for (const reducer of reducers) {
      virtualState = reducer(virtualState, payload);
    }

    this.state = virtualState;
    this.cd.markForCheck();
  }
}
