import { ChangeDetectorRef } from '@angular/core';

export class Store<T> {
  cd!: ChangeDetectorRef;
  state!: T;
  reducers: Record<string, Array<(state: T, actionPayload?: any) => T>> = {};
  effects: Record<string, () => void> = {};

  init(cd: ChangeDetectorRef, state: T) {
    this.cd = cd;
    this.state = state;
  }

  createEffect(action: string, effectHandler: () => void) {}

  createReducer(action: string, reducer: (state: T, actionPayload?: any) => T) {
    if (!(action in this.reducers)) {
      this.reducers[action] = [];
    }

    this.reducers[action] = [...this.reducers[action], reducer];
  }

  dispatchAction(action: string, payload?: any) {
    this.handleAction(action, payload);
  }

  private handleAction(action: string, payload?: any) {
    let virtualState = { ...this.state };
    const reducers = this.reducers[action];
    for (const reducer of reducers) {
      virtualState = reducer(virtualState, payload);
    }

    this.state = virtualState;
  }
}
