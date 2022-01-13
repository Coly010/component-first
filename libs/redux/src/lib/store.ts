import { ChangeDetectorRef } from '@angular/core';

interface Action<T> {
  name: string;
  payload?: T;
}

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

  createAction<P extends object>(name: string) {
    return { name, payload: {} as P } as Action<P>;
  }

  createEffect<P>(action: Action<P>, effectHandler: () => void) {}

  createReducer<P>(
    action: Action<P>,
    reducer: (state: T, actionPayload: P) => T
  ) {
    if (!(action.name in this.reducers)) {
      this.reducers[action.name] = [];
    }

    this.reducers[action.name] = [...this.reducers[action.name], reducer];
  }

  dispatchAction<P>(action: Action<P>, payload?: P) {
    this.handleAction(action, payload);
  }

  private handleAction<P>(action: Action<P>, payload?: P) {
    let virtualState = { ...this.state };
    const reducers = this.reducers[action.name];
    for (const reducer of reducers) {
      virtualState = reducer(virtualState, payload);
    }

    this.state = virtualState;
  }
}
