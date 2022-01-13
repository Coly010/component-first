import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Store } from '@component-first/redux';

interface AppState {
  title: string;
}

@Injectable()
export class AppStore extends Store<AppState> {
  actions = {
    updateTitle: this.createAction<{ title: string }>('updateTitle'),
  };

  selectors = {
    title: this.select((state) => state.title),
  };

  constructor() {
    super();
  }

  create(cd: ChangeDetectorRef) {
    this.init(cd, { title: 'Hello World' });

    this.createReducer(this.actions.updateTitle, (state, { title }) => ({
      ...state,
      title,
    }));
  }
}
