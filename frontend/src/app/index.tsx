import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { Providers } from './providers';
import { HomePage } from '@/pages/home';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <HomePage />
    </Providers>
  </StrictMode>
);
