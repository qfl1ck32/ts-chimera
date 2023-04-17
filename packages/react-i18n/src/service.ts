import { Inject, Service } from '@ts-phoenix/core';
import { EventManager } from '@ts-phoenix/event-manager';
import Polyglot from 'node-polyglot';

import { AllPhrases, ITranslations } from './defs';
import { LocaleChangedEvent } from './events';
import { I18nPackage } from './package';

@Service()
export class I18n {
  private polyglots!: Map<string, Polyglot>;

  public activePolyglot!: Polyglot;

  constructor(
    @Inject(I18nPackage) private pkg: I18nPackage,
    @Inject(EventManager) private eventManager: EventManager,
  ) {
    this.polyglots = new Map();

    for (const locale of Object.keys(pkg.config.translations)) {
      const phrases =
        pkg.config.translations[locale as keyof typeof pkg.config.translations];

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
      this.pkg.config.defaultLocale,
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
    return this.activePolyglot.t(phrase, options);
  }
}
