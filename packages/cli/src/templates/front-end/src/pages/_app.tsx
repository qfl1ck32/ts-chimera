import { AppProvider } from '@ts-phoenix/react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { I18nProvider } from '@ts-phoenix/react-i18n';

import { core } from '@src/startup/core';
import ScreenLoader from '@src/components/ScreenLoader';

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
