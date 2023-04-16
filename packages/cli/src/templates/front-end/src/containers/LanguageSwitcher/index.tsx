import LanguageSwitcher from '@src/components/LanguageSwitcher';
import { Locales } from '@src/defs';
import { use } from '@ts-chimera/react-di';
import { I18n } from '@ts-chimera/react-i18n';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LanguageSwitcherContainer: React.FC = () => {
  const i18n = use(I18n);

  const router = useRouter();

  const onLocaleChange = async (locale: string) => {
    await i18n.onLocaleChange(locale);

    router.push(router.pathname, router.pathname, {
      locale,
    });
  };

  return (
    <LanguageSwitcher
      {...{
        onLocaleChange,
        locales: Object.values(Locales),
        currentLocale: router.locale as string,
      }}
    />
  );
};

export default LanguageSwitcherContainer;
