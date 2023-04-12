import { Package } from '@ts-chimera/core';
import { I18n } from './service';

export class I18nPackage extends Package {
  getServices() {
    return [I18n];
  }

  getDefaultConfig() {
    return {};
  }
}
