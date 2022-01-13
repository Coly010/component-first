import { Component, Pipe } from '@component-first/util-standalone-shim';
import {
  RouterComponent,
  RouteComponent,
  Href2Directive,
} from '@component-first/router';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RouteEntryComponent as ProductRouteEntryComponent } from '@component-first/example-app/product';

import { SelectorResult, Store } from '@component-first/redux';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  PipeTransform,
} from '@angular/core';
import { AppStore } from './app.component.store';
import { CommonModule } from '@angular/common';

@Pipe({
  standalone: true,
  name: 'latest',
  pure: false,
})
class LatestPipe implements PipeTransform {
  transform(value: () => any) {
    return value();
  }
}

@Component({
  standalone: true,
  selector: 'component-first-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterComponent,
    RouteComponent,
    Href2Directive,
    ProductRouteEntryComponent,
    LatestPipe,
  ],
  providers: [AppStore],
  template: `
    <h1>{{ title | latest }}</h1>
    <router>
      <route path="home">Home</route>
      <route path="about">About</route>
      <route path="product">
        <product-route-entry></product-route-entry>
      </route>
    </router>
    <button href2="home">Go Home</button>
    <button href2="about">Go About</button>
    <button href2="product/list">Go Products</button>
  `,
})
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
