import * as dayjs from 'dayjs';

import { Service } from '@ts-chimera/core';
import { Inject, Injectable } from '@ts-chimera/di';
import { EventManager } from '@ts-chimera/event-manager';

import { LanguageChangedEvent } from '../i18n';

@Injectable()
class Dayjs implements Service {
  constructor(@Inject(EventManager) private eventManager: EventManager) {}

  public async initialise() {
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
