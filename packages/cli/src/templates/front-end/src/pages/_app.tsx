import '@src/styles/globals.css';
import { AppProvider } from '@ts-chimera/react';
import type { AppProps } from 'next/app';

import { core } from '@src/startup/core';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider core={core}>
      <Component {...pageProps} />
    </AppProvider>
  );
}
