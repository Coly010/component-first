import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
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

  toggleRoute(override?: boolean) {
    if (override !== undefined) {
      this.canRender = override;
    } else {
      this.canRender = !this.canRender;
    }
  }
}
