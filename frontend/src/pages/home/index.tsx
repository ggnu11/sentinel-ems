import { AppHelmet } from '@/app/helmet';

export function HomePage() {
  return (
    <>
      <AppHelmet />
      <div className="text-3xl font-bold text-blue-500">APP</div>
    </>
  );
}
