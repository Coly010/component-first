import { CommonModule, Location } from '@angular/common';
import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  ContentChildren,
  OnInit,
  Optional,
  QueryList,
  SkipSelf,
} from '@angular/core';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Component } from '@component-first/util-standalone-shim';
import { tap } from 'rxjs/operators';

import {
  createInitialRouterState,
  findRoute,
  registerRoute,
  Route,
  routerState$,
  setActiveRoute,
  setInitialRoute,
} from '../+state';
import { RouteComponent } from '../route/route.component';
import { RouterService } from '../router.service';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'router',
  imports: [CommonModule],
  template: `<ng-content></ng-content>
    <div>{{ routesAdded | json }}</div>`,
})
export class RouterComponent
  implements OnInit, AfterViewInit, AfterContentChecked
{
  @ContentChildren(RouteComponent) routes: QueryList<RouteComponent> =
    new QueryList();

  routesAdded: Record<string, boolean> = {};
  stateCreated = false;
  routerState$ = routerState$;

  constructor(
    @SkipSelf() @Optional() private parentRouter: RouterComponent,
    private routerService: RouterService,
    private location: Location,
    private cdRef: ChangeDetectorRef
  ) {
    if (!parentRouter || parentRouter.stateCreated !== true) {
      createInitialRouterState();
      this.stateCreated = true;
    }
  }

  ngOnInit() {
    if (!this.parentRouter || this.parentRouter.stateCreated !== true) {
      this.routerService.routerState$
        .pipe(tap(() => this.cdRef.detectChanges()))
        .subscribe();
    }
  }

  ngAfterViewInit() {
    if (
      (!this.parentRouter || this.parentRouter.stateCreated !== true) &&
      this.location.path()
    ) {
      setInitialRoute(this.location.path());
    }
  }

  ngAfterContentChecked() {
    this.routes.forEach((route) => {
      if (route.path && !this.routesAdded[route.path]) {
        const path = route.path;
        this.routesAdded[path] = true;
        const newRoute: Route = {
          path,
          routeComponent: route,
        };
        registerRoute(newRoute);
      }
    });
  }
}
