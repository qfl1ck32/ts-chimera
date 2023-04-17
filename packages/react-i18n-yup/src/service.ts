import { Injectable, Inject, InjectToken } from '@ts-phoenix/di';
import { EventManager } from '@ts-phoenix/event-manager';
import {
  LocaleChangedEvent,
  PACKAGE_CONFIG_TOKEN as I18N_PACKAGE_CONFIG_TOKEN,
  PackageConfigType as I18nPackageConfigType,
} from '@ts-phoenix/react-i18n';
import * as yup from 'yup';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';
import {
  translationsWithPaths,
  translationsWithoutPaths,
} from './translations';

@Injectable()
export class Yup {
  constructor(
    @Inject(EventManager) private eventManager: EventManager,
    @InjectToken(PACKAGE_CONFIG_TOKEN) private config: PackageConfigType,
    @InjectToken(I18N_PACKAGE_CONFIG_TOKEN)
    private i18nConfig: I18nPackageConfigType,
  ) {
    this.eventManager.addListener({
      event: LocaleChangedEvent,
      handler: this.onLocaleChange,
    });

    yup.setLocale(
      translationsWithoutPaths[this.i18nConfig.defaultLocale as never],
    );
  }

  private onLocaleChange = (event: LocaleChangedEvent) => {
    const locale = event.data!.locale;

    yup.setLocale(
      (this.config.usePathsInTranslations
        ? translationsWithPaths
        : translationsWithoutPaths)[locale as never],
    );
  };
}

export { yup };
