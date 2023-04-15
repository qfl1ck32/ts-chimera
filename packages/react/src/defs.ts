import { Config as I18nConfig } from '@ts-chimera/react-i18n';
import { Config as YupConfig } from './yup';
import { Config as SessionStorageConfig } from '@ts-chimera/react-session-storage';

export interface ReactPackageConfig {
  yup: YupConfig;
  sessionStorage: SessionStorageConfig;
  i18n: I18nConfig;
}
