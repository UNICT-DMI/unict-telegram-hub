import { Route } from './Route';

interface SubRoute {
  label: string;
  year: string;
}

const years: ReadonlyArray<SubRoute> = [
  { label: 'First year', year: '1' },
  { label: 'Second year', year: '2' },
  { label: 'Third year', year: '3' }
] as const;

export const bachelorSubRoutes: ReadonlyArray<Route> = [
  {
    label: years[0].label,
    href: '',
    queryParameters: {
      year: years[0].year
    }
  },
  {
    label: years[1].label,
    href: '',
    queryParameters: {
      year: years[1].year
    }
  },
  {
    label: years[2].label,
    href: '',
    queryParameters: {
      year: years[2].year
    }
  }
] as const;

export const masterSubRoutes: ReadonlyArray<Route> = [
  {
    label: years[0].label,
    href: '',
    queryParameters: {
      year: years[0].year
    }
  },
  {
    label: years[1].label,
    href: '',
    queryParameters: {
      year: years[1].year
    }
  }
] as const;
