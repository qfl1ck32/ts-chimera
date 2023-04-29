import { Inject, Service } from '@ts-phoenix/core';
import { LocaleChangedEvent } from '@ts-phoenix/react-i18n';
import * as yup from 'yup';

import { I18nYupPackageConfigToken } from './constants';
import { II18nYupPackageConfig, II18nYupService } from './defs';
import {
  translationsWithPaths,
  translationsWithoutPaths,
} from './translations';

@Service()
export class I18nYupService implements II18nYupService {
  constructor(
    @Inject(I18nYupPackageConfigToken) private config: II18nYupPackageConfig,
  ) {}

  private get translationPaths() {
    return this.config.usePathsInTranslations
      ? translationsWithPaths
      : translationsWithoutPaths;
  }

  public onLocaleChange = (event: LocaleChangedEvent) => {
    const locale = event.data.locale;

    yup.setLocale(this.translationPaths[locale as never]);
  };
}

export { yup };
