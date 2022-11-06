export default interface Route {
  label: string;
  href: string;
  queryParameters?: Record<string, string>;
  subRoutes?: Array<Route>;
}
