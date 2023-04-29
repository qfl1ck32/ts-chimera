import { LocaleChangedEvent } from '@ts-phoenix/react-i18n';

export interface II18nYupPackageConfig {
  usePathsInTranslations: boolean;
}

export interface II18nYupService {
  onLocaleChange: (event: LocaleChangedEvent) => void;
}
