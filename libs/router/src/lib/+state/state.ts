import { BehaviorSubject } from 'rxjs';
import { Route, RouterState } from '.';

export let CURRENT_ROUTER_STATE: RouterState;

export const routerState$ = new BehaviorSubject<RouterState | undefined>(
  undefined
);

export function createInitialRouterState(
  currentPath: string = '',
  routes: Route[] = []
) {
  CURRENT_ROUTER_STATE = {
    activeRoute: routes.find((r) => r.path === currentPath) ?? {
      path: '',
      routeComponent: undefined,
    },
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
  console.log(url, route?.path);
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

export function setInitialRoute(url: string) {
  url = url.startsWith('/') ? url.slice(1) : url;
  const pathFragments = url.split('/');
  console.log(pathFragments, url);
  const goToEachFragment = (urlToGoTo: string, fragments: string[]) => {
    goTo(urlToGoTo);
    if (fragments.length === 0) {
      return;
    } else {
      goToEachFragment(`${urlToGoTo}/${fragments.shift()}`, fragments);
    }
  };

  goToEachFragment(pathFragments.shift() as string, pathFragments);
}
