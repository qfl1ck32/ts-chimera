import * as dayjs from 'dayjs';

import { EventManager } from '@ts-chimera/event-manager';
import { Inject, Injectable } from '@ts-chimera/react-di';
import { LocaleChangedEvent } from '@ts-chimera/react-i18n';

@Injectable()
export class Dayjs {
  constructor(@Inject(EventManager) private eventManager: EventManager) {
    this.eventManager.addListener({
      event: LocaleChangedEvent,
      handler: this.onLocaleChange,
    });
  }

  private onLocaleChange = (event: LocaleChangedEvent) => {
    const locale = event.data?.locale;

    dayjs.locale(locale);
  };
}

export { dayjs };
