import { Injectable } from '@ts-phoenix/di';
import { Listener } from '@ts-phoenix/event-manager';
import { LocaleChangedEvent } from '@ts-phoenix/react-i18n';
import * as dayjs from 'dayjs';

@Injectable()
export class Dayjs {
  @Listener({
    event: LocaleChangedEvent,
  })
  public onLocaleChange = (event: LocaleChangedEvent) => {
    const locale = event.data!.locale;

    dayjs.locale(locale);
  };
}

export { dayjs };
