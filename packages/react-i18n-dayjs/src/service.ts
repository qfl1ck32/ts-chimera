import { Service } from '@ts-phoenix/core';
import { LocaleChangedEvent } from '@ts-phoenix/react-i18n';
import * as dayjs from 'dayjs';

import { II18nDayjsService } from './defs';

@Service()
export class I18nDayjsService implements II18nDayjsService {
  public onLocaleChange = (event: LocaleChangedEvent) => {
    const locale = event.data.locale;

    dayjs.locale(locale);
  };
}

export { dayjs };
