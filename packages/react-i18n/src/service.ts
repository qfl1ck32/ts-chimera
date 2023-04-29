import { Inject, Service } from '@ts-phoenix/core';
import {
  EventManagerServiceToken,
  IEventManagerService,
} from '@ts-phoenix/event-manager';
import Polyglot from 'node-polyglot';

import { I18nPackageConfigToken } from './constants';
import {
  AllPhrases,
  ITranslations,
  I18nPackageConfigType,
  II18nService,
} from './defs';
import { LocaleChangedEvent } from './events';

@Service()
export class I18nService implements II18nService {
  private polyglots!: Map<string, Polyglot>;

  public activePolyglot!: Polyglot;

  constructor(
    @Inject(I18nPackageConfigToken)
    private config: I18nPackageConfigType,
    @Inject(EventManagerServiceToken)
    private eventManager: IEventManagerService,
  ) {
    this.polyglots = new Map();

    for (const locale of Object.keys(config.translations)) {
      const phrases =
        config.translations[locale as keyof typeof config.translations];

      const polyglot = new Polyglot({
        locale,
        phrases: [],
        interpolation: {
          prefix: '{{ ',
          suffix: ' }}',
        },
      });

      polyglot.extend(phrases);
      this.polyglots.set(locale, polyglot);
    }

    this.activePolyglot = this.polyglots.get(
      this.config.defaultLocale,
    ) as Polyglot;
  }

  public async onLocaleChange(locale: string) {
    this.activePolyglot = this.polyglots.get(locale) as Polyglot;

    await this.eventManager.emitSync(
      new LocaleChangedEvent({
        locale,
      }),
    );
  }

  public t<Translations extends ITranslations>(
    phrase: AllPhrases<Translations>,
    options?: number | Polyglot.InterpolationOptions | undefined,
  ) {
    // TODO: better handling
    if (!this.activePolyglot) {
      return phrase;
    }

    return this.activePolyglot.t(phrase, options);
  }
}
