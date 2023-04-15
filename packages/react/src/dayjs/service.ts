import * as dayjs from 'dayjs';

import { Inject, Injectable } from '@ts-chimera/react-di';
import { EventManager } from '@ts-chimera/event-manager';

import { LanguageChangedEvent } from '@ts-chimera/react-i18n';

@Injectable()
export class Dayjs {
  constructor(@Inject(EventManager) private eventManager: EventManager) {
    this.eventManager.addListener({
      event: LanguageChangedEvent,
      handler: this.onLanguageChange,
    });
  }

  private onLanguageChange = (event: LanguageChangedEvent) => {
    const language = event.data?.language;

    dayjs.locale(language);
  };
}

export { dayjs };
