import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { GroupDetailPage } from './pages/GroupDetailPage/GroupDetailPage';

const HomePage = lazy(() =>
  import('./pages').then(module => ({ default: module.HomePage })));

export const homeRoutes: RouteObject[] = [
  {
    path: '',
    element: <HomePage />,
    children: [
      {
        path: ':groupId',
        element: <GroupDetailPage />,
      },
    ],
  },
];
