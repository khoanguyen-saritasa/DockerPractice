import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { AuthGuard } from 'src/routes/guards/authGuard';

import { GroupDetailPage } from './pages/GroupDetailPage/GroupDetailPage';

const HomePage = lazy(() =>
  import('./pages').then(module => ({ default: module.HomePage })));

export const homeRoutes: RouteObject[] = [
  {
    path: '',
    element: <AuthGuard />,
    children: [
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
    ],
  },
];
