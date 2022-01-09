import { Component } from '@component-first/util-standalone-shim';
import {
  RouterComponent,
  RouteComponent,
  Href2Directive,
} from '@component-first/router';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RouteEntryComponent as ProductRouteEntryComponent } from '@component-first/example-app/product';

@Component({
  standalone: true,
  selector: 'component-first-root',
  imports: [
    RouterComponent,
    RouteComponent,
    Href2Directive,
    ProductRouteEntryComponent,
  ],
  template: `
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
export class AppComponent {}
