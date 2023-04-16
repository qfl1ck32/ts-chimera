import { AppProvider } from '@ts-chimera/react';
import type { AppProps } from 'next/app';

import { core } from '@src/startup/core';
import { ChakraProvider } from '@chakra-ui/react';
import { I18nProvider } from '@ts-chimera/react-i18n';

export default function App({ Component, router, pageProps }: AppProps) {
  return (
    <AppProvider core={core}>
      <ChakraProvider>
        <I18nProvider initialLocale={router.locale as string}>
          <Component {...pageProps} />
        </I18nProvider>
      </ChakraProvider>
    </AppProvider>
  );
}
