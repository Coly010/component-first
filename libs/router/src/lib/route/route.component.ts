import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';

import { Component } from '@component-first/util-standalone-shim';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'route',
  imports: [CommonModule],
  template: `<ng-container *ngIf="canRender"
    ><ng-content></ng-content
  ></ng-container>`,
})
export class RouteComponent {
  @Input() path: string | undefined;
  @Input() component: any | undefined;

  canRender = false;

  toggleRoute() {
    this.canRender = !this.canRender;
    console.log('something happenign?');
  }
}
