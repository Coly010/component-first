<h1 align="center">@component-first/redux</h1>

---

A state management solution that implements the Redux pattern.

## Usage

---

See basic examples below on usage:

1. `npm install @component-first/redux`

2. Create an accompanying `component.store.ts` file containing your actions, reducers and effects:

```ts
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

  create(cd: ChangeDetectorRef) {
    this.init(cd, { title: 'Hello World' });

    this.createReducer(this.actions.updateTitle, (state, { title }) => ({
      ...state,
      title,
    }));

    this.createEffect(this.actions.updateTitle, () => {
      console.log("We'll try update the title");
    });
  }
}
```

3. Provide it to your Component and inject it in your `constructor` to use it:

```ts
export class AppComponent implements OnInit {
  title: SelectorResult<string>;

  constructor(private cd: ChangeDetectorRef, private store: AppStore) {
    this.store.create(this.cd);
  }

  async ngOnInit() {
    this.title = this.store.selectors.title;

    setTimeout(() => {
      this.store.dispatchAction(this.store.actions.updateTitle, {
        title: 'Welcome to Component-First',
      });
    }, 3500);
  }
}
```

4. Use the `latest` pipe in our `template` to always ensure we have the latest value from the store rendered, even in `OnPush` components (without sacrificing performance)

```html
<h1>{{title | latest}}</h1>
```

## API

---

Coming Soon!
