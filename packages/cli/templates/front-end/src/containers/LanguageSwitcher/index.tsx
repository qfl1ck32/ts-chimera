import { use } from '@ts-phoenix/react-di';
import { I18nServiceToken } from '@ts-phoenix/react-i18n';
import { useRouter } from 'next/router';

import LanguageSwitcher, { ILocale } from '@src/components/LanguageSwitcher';

import { locales } from './constants';

const LanguageSwitcherContainer: React.FC = () => {
  const i18nService = use(I18nServiceToken);

  const router = useRouter();

  const onLocaleChange = async (locale: string) => {
    await i18nService.onLocaleChange(locale);

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
