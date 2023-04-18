import { use } from '@ts-phoenix/react-di';
import { I18n } from '@ts-phoenix/react-i18n';
import { useRouter } from 'next/router';

import LanguageSwitcher, { ILocale } from '@src/components/LanguageSwitcher';

import { locales } from './constants';

const LanguageSwitcherContainer: React.FC = () => {
  const i18n = use(I18n);

  const router = useRouter();

  const onLocaleChange = async (locale: string) => {
    await i18n.onLocaleChange(locale);

    router.push(router.pathname, router.pathname, {
      locale,
    });
  };

  const currentLocale = locales.find(
    (locale) => locale.value === router.locale,
  ) as ILocale;

  return (
    <LanguageSwitcher
      {...{
        onLocaleChange,
        locales,
        currentLocale,
      }}
    />
  );
};

export default LanguageSwitcherContainer;
