import { CommonModule, Location } from '@angular/common';
import {
  AfterContentChecked,
  ChangeDetectorRef,
  ContentChildren,
  OnInit,
  Optional,
  QueryList,
  SkipSelf,
} from '@angular/core';

import { Component } from '@component-first/util-standalone-shim';
import { tap } from 'rxjs';
import {
  createInitialRouterState,
  registerRoute,
  Route,
  routerState$,
} from '../+state';
import { RouteComponent } from '../route/route.component';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'router',
  imports: [CommonModule],
  template: `<ng-content></ng-content>
    <div>{{ routesAdded | json }}</div>
    <div>{{ routerState$ | async | json }}</div>`,
})
export class RouterComponent implements OnInit, AfterContentChecked {
  @ContentChildren(RouteComponent) routes: QueryList<RouteComponent> =
    new QueryList();

  routesAdded: Record<string, boolean> = {};
  stateCreated = false;
  routerState$ = routerState$;

  constructor(
    @SkipSelf() @Optional() private parentRouter: RouterComponent,
    private location: Location,
    private cdRef: ChangeDetectorRef
  ) {
    if (!parentRouter || parentRouter.stateCreated !== true) {
      createInitialRouterState();
      this.stateCreated = true;
    }
  }

  ngOnInit() {
    this.routerState$
      .pipe(
        tap((state) => {
          const activeRoute = state?.activeRoute.path;
          this.routes.forEach((route) => {
            if (route.path === activeRoute) {
              if (!route.canRender) {
                route.toggleRoute();
              }
            } else {
              if (route.canRender) {
                route.toggleRoute();
              }
            }
          });

          this.cdRef.detectChanges();
        })
      )
      .subscribe();
  }

  ngAfterContentChecked() {
    console.log('checking routes');
    this.routes.forEach((route) => {
      if (route.path && !this.routesAdded[route.path]) {
        this.routesAdded[route.path] = true;
        const newRoute: Route = {
          path: route.path,
        };
        registerRoute(newRoute);
      }
    });
  }
}
