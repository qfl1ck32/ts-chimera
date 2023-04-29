import { LocaleChangedEvent } from '@ts-phoenix/react-i18n';

export interface II18nDayjsService {
  onLocaleChange: (event: LocaleChangedEvent) => void;
}
