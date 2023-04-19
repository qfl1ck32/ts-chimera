import { Injectable } from '@ts-phoenix/di';
import { LocaleChangedEvent } from '@ts-phoenix/react-i18n';
import * as dayjs from 'dayjs';

@Injectable()
export class Dayjs {
  public onLocaleChange = (event: LocaleChangedEvent) => {
    const locale = event.data!.locale;

    dayjs.locale(locale);
  };
}

export { dayjs };
