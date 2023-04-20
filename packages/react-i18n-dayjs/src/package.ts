import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { I18nPackage } from '@ts-phoenix/react-i18n';

@Injectable()
export class DayjsPackage extends Package {
  getDependencies() {
    return [I18nPackage];
  }
}
