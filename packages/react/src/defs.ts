import { PackageConfigType as I18nPackageConfigType } from '@ts-phoenix/react-i18n';
import { PackageConfigType as SessionStoragePackageConfigType } from '@ts-phoenix/react-session-storage';

import { PackageConfigType as YupPackageConfigType } from './yup2';

export interface PackageConfigType {
  yup: YupPackageConfigType;
  sessionStorage: SessionStoragePackageConfigType;
  i18n: I18nPackageConfigType;
}
