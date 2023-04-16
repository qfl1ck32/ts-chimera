import LanguageSwitcher, { ILocale } from '@src/components/LanguageSwitcher';
import { Locales } from '@src/defs';
import { use } from '@ts-chimera/react-di';
import { I18n } from '@ts-chimera/react-i18n';
import { useRouter } from 'next/router';

const LanguageSwitcherContainer: React.FC = () => {
  const i18n = use(I18n);

  const router = useRouter();

  const onLocaleChange = async (locale: string) => {
    await i18n.onLocaleChange(locale);

    router.push(router.pathname, router.pathname, {
      locale,
    });
  };

  const locales: ILocale[] = [
    {
      label: '🇬🇧 English',
      value: Locales.En,
    },
    {
      label: '🇷🇴 Romanian',
      value: Locales.Ro,
    },
  ];

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
