import { Helmet } from 'react-helmet-async';

export function AppHelmet() {
  const title = import.meta.env.VITE_SITE || 'Sentinel EMS';

  return (
    <Helmet>
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    </Helmet>
  );
}

