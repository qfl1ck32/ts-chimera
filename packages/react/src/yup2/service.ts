import { Inject, Service } from '@ts-phoenix/core';
import { EventManager } from '@ts-phoenix/event-manager';
import { I18nPackage, LocaleChangedEvent } from '@ts-phoenix/react-i18n';
import * as yup from 'yup';

import { YupPackage } from './package';
import {
  translationsWithPaths,
  translationsWithoutPaths,
} from './translations';

@Service()
export class Yup {
  constructor(
    @Inject(EventManager) private eventManager: EventManager,
    @Inject(YupPackage) private yupPackage: YupPackage,
    @Inject(I18nPackage) private i18nPackage: I18nPackage,
  ) {
    this.eventManager.addListener({
      event: LocaleChangedEvent,
      handler: this.onLocaleChange,
    });

    yup.setLocale(
      translationsWithoutPaths[this.i18nPackage.config.defaultLocale as never],
    );
  }

  private onLocaleChange = (event: LocaleChangedEvent) => {
    const locale = event.data!.locale;

    yup.setLocale(
      (this.yupPackage.config.usePathsInTranslations
        ? translationsWithPaths
        : translationsWithoutPaths)[locale as never],
    );
  };
}

export { yup };
