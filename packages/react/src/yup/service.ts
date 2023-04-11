import { yup } from '.';

import { Service } from '@ts-chimera/core';
import { Inject, InjectToken, Injectable } from '@ts-chimera/di';
import { EventManager } from '@ts-chimera/event-manager';

import { LanguageChangedEvent } from '@src/i18n';

import { Config } from './defs';
import { YUP_CONFIG } from './tokens';
import translationsWithPaths from './translations/withPaths';
import translationsWithoutPaths from './translations/withoutPaths';

@Injectable()
export class Yup implements Service {
  constructor(
    @Inject(EventManager) private eventManager: EventManager,
    @InjectToken(YUP_CONFIG) private config: Config,
  ) {}

  public async initialise() {
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
