import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IconButton, LanguageToggle } from '@/shared/ui';
import { clearAuth } from '@/shared/lib/auth';

interface HeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export function Header({ onMenuClick, showMenuButton = false }: HeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-4">
        {showMenuButton && (
          <IconButton onClick={onMenuClick} aria-label={t('header.toggleMenu')} size="md">
            <svg
              className="h-5 w-5 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </IconButton>
        )}
      </div>
      <div className="flex items-center gap-4">
        <LanguageToggle />
        <IconButton badge aria-label={t('header.notifications')} size="md">
          <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </IconButton>
        <button
          onClick={handleLogout}
          className="w-20 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
        >
          {t('header.logout')}
        </button>
      </div>
    </header>
  );
}
