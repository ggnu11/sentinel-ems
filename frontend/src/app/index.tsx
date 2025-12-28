import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { Providers } from './providers';
import { MenuRoutes } from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <MenuRoutes />
    </Providers>
  </StrictMode>
);
