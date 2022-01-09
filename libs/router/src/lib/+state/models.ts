import { RouteComponent } from '../route/route.component';

export interface RouterState {
  activeRoute: Route;
  routes: Route[];
}

export interface Route {
  path: string;
  routeComponent: RouteComponent | undefined;
  children?: Route[];
}
