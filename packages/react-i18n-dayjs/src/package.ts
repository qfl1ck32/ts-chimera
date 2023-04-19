import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { LocaleChangedEvent } from '@ts-phoenix/react-i18n';

import { Dayjs } from './service';

@Injectable()
export class DayjsPackage extends Package {
  initialise() {
    const dayjs = this.core.container.get(Dayjs);

    this.core.eventManager.addListener({
      event: LocaleChangedEvent,
      handler: dayjs.onLocaleChange.bind(dayjs),
    });
  }
}
