import Polyglot from 'node-polyglot';

import { Inject, InjectToken, Injectable } from '@ts-chimera/react-di';
import { EventManager } from '@ts-chimera/event-manager';

import { AllPhrases, Config, ITranslations } from './defs';
import { LocaleChangedEvent } from './events';
import { I18N_CONFIG } from './tokens';

@Injectable()
export class I18n {
  private polyglots!: Map<string, Polyglot>;

  public activePolyglot!: Polyglot;

  constructor(
    @InjectToken(I18N_CONFIG) private config: Config,
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
    return this.activePolyglot.t(phrase, options);
  }
}
