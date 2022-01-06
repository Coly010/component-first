import { Component } from '@component-first/util-standalone-shim';
import {
  RouterComponent,
  RouteComponent,
  Href2Directive,
} from '@component-first/router';

@Component({
  standalone: true,
  selector: 'component-first-root',
  imports: [RouterComponent, RouteComponent, Href2Directive],
  template: `
    <router>
      <route path="home">Home </route>
      <route path="about">About </route>
    </router>
    <button href2="home">Go Home</button>
    <button href2="about">Go About</button>
  `,
})
export class AppComponent {}
