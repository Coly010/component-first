export interface RouterState {
  activeRoute: Route;
  routes: Route[];
}

export interface Route {
  path: string;
}
