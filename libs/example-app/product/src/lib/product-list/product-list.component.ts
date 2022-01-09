import { Href2Directive } from '@component-first/router';
import { Component } from '@component-first/util-standalone-shim';

@Component({
  standalone: true,
  imports: [Href2Directive],
  selector: 'component-first-product-list',
  template: `<ul>
    <li href2="product/details">Product 1</li>
    <li>Product 2</li>
    <li>Product 3</li>
    <li>Product 4</li>
    <li>Product 5</li>
  </ul>`,
})
export class ProductListComponent {}
