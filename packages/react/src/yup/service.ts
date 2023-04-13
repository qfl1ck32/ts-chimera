import { yup } from '.';

import { Inject, InjectToken, Injectable } from '@ts-chimera/react-di';
import { EventManager } from '@ts-chimera/event-manager';

import { LanguageChangedEvent } from '@ts-chimera/react-i18n';

import { Config } from './defs';
import { YUP_CONFIG } from './tokens';
import translationsWithPaths from './translations/withPaths';
import translationsWithoutPaths from './translations/withoutPaths';

@Injectable()
export class Yup {
  constructor(
    @Inject(EventManager) private eventManager: EventManager,
    @InjectToken(YUP_CONFIG) private config: Config,
  ) {
    this.eventManager.addListener({
      event: LanguageChangedEvent,
      handler: this.onLanguageChange,
    });

    yup.setLocale(translationsWithoutPaths['en']);
  }

  private onLanguageChange = (event: LanguageChangedEvent) => {
    const language = event.data?.language as string;

    yup.setLocale(
      (this.config.usePathsInTranslations
        ? translationsWithPaths
        : translationsWithoutPaths)[language as never],
    );
  };
}
