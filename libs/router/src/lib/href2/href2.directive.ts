import { HostListener, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Directive } from '@component-first/util-standalone-shim';
import { findRoute, setActiveRoute } from '../+state';

@Directive({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[href2]',
})
export class Href2Directive {
  @Input() href2: string | null = null;
  @HostListener('click', ['$event.target']) onClick() {
    if (!this.href2) {
      return;
    }
    this.location.go(this.href2);
    setActiveRoute(findRoute(this.href2));
  }

  constructor(private location: Location) {}
}
