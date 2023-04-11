import { Inject, InjectToken, Injectable } from '@ts-chimera/di';
import { EventManager } from '@ts-chimera/event-manager';
import Polyglot from 'node-polyglot';

import { AllPhrases } from './defs';
import { LanguageChangedEvent } from './events';
import { DEFAULT_LOCALE, TRANSLATIONS } from './tokens';

@Injectable()
export class I18n {
  private polyglots!: Map<string, Polyglot>;

  public activePolyglot!: Polyglot;

  constructor(
    @InjectToken(DEFAULT_LOCALE) private defaultLocale: string,
    @InjectToken(TRANSLATIONS) private translations: Record<string, any>,
    @Inject(EventManager) private eventManager: EventManager,
  ) {
    this.polyglots = new Map();

    for (const locale of Object.keys(translations)) {
      const phrases = this.translations[locale];

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

    this.activePolyglot = this.polyglots.get(this.defaultLocale) as Polyglot;
  }

  async initialise() {}

  public async onLanguageChange(language: string) {
    this.activePolyglot = this.polyglots.get(language) as Polyglot;

    await this.eventManager.emitAsync(
      new LanguageChangedEvent({
        language,
      }),
    );
  }

  public t<T extends AllPhrases>(
    phrase: T,
    options?: number | Polyglot.InterpolationOptions | undefined,
  ) {
    return this.activePolyglot.t(phrase, options);
  }
}
