import { use } from '@ts-phoenix/react-di';
import { I18n } from './service';
import React, { useState, useEffect, Fragment } from 'react';
import { Loading } from '@ts-phoenix/react-components';

export interface Props {
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  initialLocale: string;
}

export const I18nProvider: React.FC<Props> = (props) => {
  const i18n = use(I18n);

  const LoadingComponent = props.loadingComponent || <Loading />;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateLocale = async () => {
      await i18n.onLocaleChange(props.initialLocale);
      setLoading(false);
    };

    updateLocale();
  }, []);

  if (loading) {
    return <Fragment>{LoadingComponent}</Fragment>;
  }

  return <Fragment>{props.children}</Fragment>;
};
