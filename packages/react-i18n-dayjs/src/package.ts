import { Package } from '@ts-phoenix/core';
import { EventManagerServiceToken } from '@ts-phoenix/event-manager';
import { I18nPackage, LocaleChangedEvent } from '@ts-phoenix/react-i18n';

import { I18nDayjsServiceToken } from './constants';
import { I18nDayjsService } from './service';

export class I18nDayjsPackage extends Package {
  getDependencies() {
    return [I18nPackage];
  }

  bind() {
    this.core.container
      .bind(I18nDayjsServiceToken)
      .to(I18nDayjsService)
      .inSingletonScope();
  }

  public initialise() {
    const i18nDayjsService = this.core.container.get(I18nDayjsServiceToken);
    const eventManagerService = this.core.container.get(
      EventManagerServiceToken,
    );

    eventManagerService.addListener({
      event: LocaleChangedEvent,
      handler: i18nDayjsService.onLocaleChange,
    });
  }
}
