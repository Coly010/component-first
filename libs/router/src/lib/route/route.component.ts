import { CommonModule } from '@angular/common';
import {
  ComponentFactoryResolver,
  ElementRef,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  Component,
  ViewContainerRefShim,
} from '@component-first/util-standalone-shim';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'route',
  imports: [CommonModule],
  template: `<ng-container *ngIf="canRender"
    ><ng-content *ngIf="!component"></ng-content
  ></ng-container>`,
})
export class RouteComponent {
  @Input() path!: string;
  @Input() component: (() => Promise<Type<unknown>>) | undefined;

  canRender = false;
  viewContainerRef: ViewContainerRefShim;

  constructor(
    private vcr: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) {
    this.viewContainerRef = new ViewContainerRefShim(this.vcr, this.cfr);
  }

  async loadComponent() {
    console.log('here trying to loadComponent', this.component);
    if (this.component && this.canRender) {
      console.log('gonna fetch this');
      this.viewContainerRef.createComponent(await this.component());
    }
  }

  toggleRoute(override?: boolean) {
    if (override !== undefined) {
      this.canRender = override;
    } else {
      this.canRender = !this.canRender;
    }
    if (this.component) {
      this.loadComponent();
    }
  }
}
