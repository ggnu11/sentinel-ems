import en from './lang/en';
import kr from './lang/kr';
import jp from './lang/jp';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
  resources: {
    en,
    kr,
    jp,
  },
  lng: import.meta.env.VITE_LANG || 'kr',
  fallbackLng: import.meta.env.VITE_LANG || 'kr',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;

