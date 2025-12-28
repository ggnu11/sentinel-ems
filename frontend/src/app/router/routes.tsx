import type { RouteObject } from 'react-router-dom';
import type { RouteObject2 } from '@/shared/lib/types';
import { Navigate } from 'react-router-dom';
import { AuthRedirect } from './AuthRedirect';
import { NewLayout } from '../layout';
import { LoginPage } from '@/pages/login';
import { DashboardPage } from '@/pages/dashboard';
import { MonitoringPage } from '@/pages/monitoring';
import { StatisticsPage } from '@/pages/statistics';
import { ConfigPage } from '@/pages/config';

export const routes: RouteObject2[] = [
  {
    path: '/login',
    element: (
      <AuthRedirect requireAuth={false}>
        <LoginPage />
      </AuthRedirect>
    ),
  },
  {
    path: '/error',
    element: (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">Error</h1>
          <p className="text-gray-600">An error occurred</p>
        </div>
      </div>
    ),
  },
  {
    path: '/',
    element: <NewLayout />,
    children: [
      {
        path: '/',
        element: (
          <AuthRedirect>
            <Navigate to="/main" replace />
          </AuthRedirect>
        ),
      },
      {
        path: '/main',
        text: 'Dashboard',
        element: (
          <AuthRedirect>
            <DashboardPage />
          </AuthRedirect>
        ),
      },
      {
        path: '/monitoring',
        text: 'Monitoring',
        element: (
          <AuthRedirect>
            <MonitoringPage />
          </AuthRedirect>
        ),
      },
      {
        path: '/statistics',
        text: 'Statistics',
        element: (
          <AuthRedirect>
            <StatisticsPage />
          </AuthRedirect>
        ),
      },
      {
        path: '/config',
        text: 'Config',
        element: (
          <AuthRedirect>
            <ConfigPage />
          </AuthRedirect>
        ),
      },
    ],
  },
];

export function convertRoutes(routes: RouteObject2[]): RouteObject[] {
  return routes.map((route) => {
    const { text, ...rest } = route;
    return {
      ...rest,
      children: route.children ? convertRoutes(route.children) : undefined,
    } as RouteObject;
  });
}
