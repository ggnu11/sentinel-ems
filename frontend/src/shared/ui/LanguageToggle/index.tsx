import { useTranslation } from 'react-i18next';

type Language = 'kr' | 'en' | 'jp';

const languages: { code: Language; label: string }[] = [
  { code: 'kr', label: 'KR' },
  { code: 'en', label: 'EN' },
  { code: 'jp', label: 'JP' },
];

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language as Language;

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center gap-1 rounded-md border border-gray-200 bg-white p-1">
      {languages.map((lang) => {
        const isActive = currentLanguage === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}

