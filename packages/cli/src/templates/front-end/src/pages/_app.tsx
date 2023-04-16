import { ChakraProvider } from '@chakra-ui/react';
import { AppProvider } from '@ts-phoenix/react';
import { I18nProvider } from '@ts-phoenix/react-i18n';
import type { AppProps } from 'next/app';

import ScreenLoader from '@src/components/ScreenLoader';
import { core } from '@src/startup/core';

export default function App({ Component, router, pageProps }: AppProps) {
  const loader = <ScreenLoader />;

  return (
    <ChakraProvider>
      <AppProvider loadingComponent={loader} core={core}>
        <I18nProvider
          loadingComponent={loader}
          initialLocale={router.locale as string}
        >
          <Component {...pageProps} />
        </I18nProvider>
      </AppProvider>
    </ChakraProvider>
  );
}
