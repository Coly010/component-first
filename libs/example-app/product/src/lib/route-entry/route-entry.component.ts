import { Component } from '@component-first/util-standalone-shim';
import { RouteComponent, RouterComponent } from '@component-first/router';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  standalone: true,
  imports: [
    RouterComponent,
    RouteComponent,
    ProductDetailComponent,
    ProductListComponent,
  ],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'product-route-entry',
  template: `<router>
    <route path="product/list">
      <component-first-product-list></component-first-product-list>
    </route>
    <route path="product/details">
      <component-first-product-detail></component-first-product-detail>
    </route>
  </router>`,
})
export class RouteEntryComponent {}
