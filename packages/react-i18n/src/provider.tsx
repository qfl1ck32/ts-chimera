import { use } from '@ts-phoenix/react-di';
import React, { useState, useEffect, Fragment } from 'react';

import { I18nService } from './service';

export interface Props {
  children: React.ReactNode;
  loadingComponent: React.ReactNode;
  initialLocale: string;
}

export const I18nProvider: React.FC<Props> = (props) => {
  const i18n = use(I18nService);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateLocale = async () => {
      await i18n.onLocaleChange(props.initialLocale);
      setLoading(false);
    };

    updateLocale();
  }, []);

  if (loading) {
    return <Fragment>{props.loadingComponent}</Fragment>;
  }

  return <Fragment>{props.children}</Fragment>;
};
