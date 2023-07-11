import { Service } from '@ts-phoenix/core';
import { LocaleChangedEvent } from '@ts-phoenix/react-i18n';
import { locale } from 'dayjs';

import { II18nDayjsService } from './defs';

@Service()
export class I18nDayjsService implements II18nDayjsService {
  public onLocaleChange = (event: LocaleChangedEvent) => {
    locale(event.data.locale);
  };
}
