import { Package, PartialConfig } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { LocaleChangedEvent } from '@ts-phoenix/react-i18n';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';
import { Yup } from './service';
@Injectable()
export class YupPackage extends Package<PackageConfigType> {
  async initialise() {
    const yup = this.core.container.get(Yup);

    this.core.eventManager.addListener({
      event: LocaleChangedEvent,
      handler: yup.onLocaleChange.bind(yup),
    });
  }

  getConfigToken() {
    return PACKAGE_CONFIG_TOKEN;
  }

  getDefaultConfig(): PartialConfig<PackageConfigType, null> {
    return {
      usePathsInTranslations: true,
    };
  }
}
