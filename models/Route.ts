import { bachelorSubRoutes, masterSubRoutes } from './SubRoute';

export interface Route {
  label: string;
  href: string;
  queryParameters?: Record<string, string>;
  subRoutes?: ReadonlyArray<Route>;
}

export const routes: ReadonlyArray<Route> = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'UNICT Channels',
    href: 'channels'
  },
  {
    label: 'UNICT Bots',
    href: 'bots'
  },
  {
    label: "DMI Bachelor's Degree Groups",
    href: 'bachelor',
    subRoutes: bachelorSubRoutes
  },
  {
    label: "DMI Master's Degree Groups",
    href: 'master',
    subRoutes: masterSubRoutes
  }
] as const;
