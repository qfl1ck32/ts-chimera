import { EventManager } from '@ts-phoenix/event-manager';
import { Inject, Injectable } from '@ts-phoenix/react-di';
import { LocaleChangedEvent } from '@ts-phoenix/react-i18n';
import * as dayjs from 'dayjs';

@Injectable()
export class Dayjs {
  constructor(@Inject(EventManager) private eventManager: EventManager) {
    this.eventManager.addListener({
      event: LocaleChangedEvent,
      handler: this.onLocaleChange,
    });
  }

  private onLocaleChange = (event: LocaleChangedEvent) => {
    const locale = event.data!.locale;

    dayjs.locale(locale);
  };
}

export { dayjs };
