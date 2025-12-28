import '@progress/kendo-theme-default/dist/all.css';
import { useTranslation } from 'react-i18next';

export function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
    </div>
  );
}
