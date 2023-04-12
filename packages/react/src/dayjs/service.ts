import * as dayjs from 'dayjs';

import { Inject, Injectable } from '@ts-chimera/di';
import { EventManager } from '@ts-chimera/event-manager';

import { LanguageChangedEvent } from '../i18n';

@Injectable()
class Dayjs {
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

export default Dayjs;

export { dayjs };
