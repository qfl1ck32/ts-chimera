import { Inject, InjectToken, Injectable } from '@ts-phoenix/core';
import { EventManager } from '@ts-phoenix/event-manager';
import Polyglot from 'node-polyglot';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { AllPhrases, ITranslations, PackageConfigType } from './defs';
import { LocaleChangedEvent } from './events';

@Injectable()
export class I18n {
  private polyglots!: Map<string, Polyglot>;

  public activePolyglot!: Polyglot;

  constructor(
    @InjectToken(PACKAGE_CONFIG_TOKEN) private config: PackageConfigType,
    @Inject(EventManager) private eventManager: EventManager,
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

    await this.eventManager.emitAsync(
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
