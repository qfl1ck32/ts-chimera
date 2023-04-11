import { DEFAULT_LOCALE, I18n, TRANSLATIONS } from '@src/i18n';
import { I18nPackage } from '@src/i18n/package';
import { Core } from '@ts-chimera/core';

declare module '@src/i18n/defs' {
  interface Translations {
    hi: string;
  }
}

describe('i18n', () => {
  it('should return the correct translation', async () => {
    const core = new Core({
      packages: [new I18nPackage()],
    });

    const translations = {
      en: {
        hi: 'Hello',
      },
      ro: {
        hi: 'Buna',
      },
    };

    core.setToken(DEFAULT_LOCALE, 'en');
    core.setToken(TRANSLATIONS, translations);

    await core.initialise();

    const i18n = core.container.get(I18n);

    expect(i18n.t('hi')).toBe(translations.en.hi);

    i18n.onLanguageChange('ro');

    expect(i18n.t('hi')).toBe(translations.ro.hi);
  });
});
