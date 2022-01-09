import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { routerState$ } from './+state';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RouterService {
  constructor(private location: Location) {}

  routerState$ = routerState$.pipe(
    tap((state) => {
      const activeRoute = state?.activeRoute.path;
      state?.routes.forEach((route) => {
        route.routeComponent?.toggleRoute(false);
      });

      const renderParentRoute = (childRoutePath: string) => {
        const routeHasParent =
          childRoutePath && childRoutePath.split('/').length > 0;
        if (routeHasParent) {
          const routeFragments = childRoutePath?.split('/');
          routeFragments?.pop();
          const parentPath = routeFragments?.join('/');
          const parentRoute = state?.routes.find((r) => r.path === parentPath);
          if (parentRoute) {
            parentRoute.routeComponent?.toggleRoute(true);
            renderParentRoute(parentRoute.path as string);
          }
        }
      };

      const route = state?.routes.find((r) => r.path === activeRoute);
      if (route) {
        renderParentRoute(route.path as string);
        route.routeComponent?.toggleRoute(true);
      } else {
        if (activeRoute && activeRoute.length > 0) {
          throw new Error(
            'Component First Router - Cannot find route matching path ' +
              activeRoute
          );
        }
      }
    })
  );
}
