import * as yup from 'yup';

import { EventManager } from '@ts-chimera/event-manager';
import { Inject, InjectToken, Injectable } from '@ts-chimera/react-di';
import {
  I18N_CONFIG,
  Config as I18nConfig,
  LocaleChangedEvent,
} from '@ts-chimera/react-i18n';

import { Config } from './defs';
import { YUP_CONFIG } from './tokens';
import translationsWithPaths from './translations/withPaths';
import translationsWithoutPaths from './translations/withoutPaths';

@Injectable()
export class Yup {
  constructor(
    @Inject(EventManager) private eventManager: EventManager,
    @InjectToken(YUP_CONFIG) private config: Config,
    @InjectToken(I18N_CONFIG) private i18nConfig: I18nConfig,
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
