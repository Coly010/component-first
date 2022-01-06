import { BehaviorSubject } from 'rxjs';
import { Route, RouterState } from '.';

export let CURRENT_ROUTER_STATE: RouterState;

export const routerState$ = new BehaviorSubject<RouterState | undefined>(
  undefined
);

export function createInitialRouterState(routes: Route[] = []) {
  CURRENT_ROUTER_STATE = {
    activeRoute: routes.find((r) => r.path === '') ?? { path: '' },
    routes,
  };

  pushStateChanges();
}

export function setActiveRoute(route: Route) {
  CURRENT_ROUTER_STATE = {
    ...CURRENT_ROUTER_STATE,
    activeRoute: route,
  };

  pushStateChanges();
}

export function registerRoute(route: Route) {
  CURRENT_ROUTER_STATE = {
    ...CURRENT_ROUTER_STATE,
    routes: [...CURRENT_ROUTER_STATE.routes, route],
  };

  pushStateChanges();
}

export function findRoute(url: string) {
  const route = CURRENT_ROUTER_STATE.routes.find((r) => r.path === url);
  if (!route) {
    throw new Error('Could not find route matching ' + url);
  }
  return route;
}

export function normalizeRoutePath(route: Route, parentRoute?: Route) {
  if (!parentRoute) {
    return { ...route };
  }

  return {
    ...route,
    path: `${
      parentRoute.path.endsWith('/')
        ? parentRoute.path.substring(0, -1)
        : parentRoute.path
    }${route.path.startsWith('/') ? route.path : `/${route.path}`}`,
  };
}

export function goTo(url: string) {
  setActiveRoute(findRoute(url));
}

function pushStateChanges() {
  routerState$.next(CURRENT_ROUTER_STATE);
}
