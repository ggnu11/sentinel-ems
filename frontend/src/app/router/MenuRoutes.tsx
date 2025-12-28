import { useRoutes, Navigate } from 'react-router-dom';
import { routes, convertRoutes } from './routes';

export function MenuRoutes() {
  const routing = useRoutes([
    ...convertRoutes(routes),
    {
      path: '*',
      element: <Navigate to="/error" replace />,
    },
  ]);

  return routing;
}

export { routes };
