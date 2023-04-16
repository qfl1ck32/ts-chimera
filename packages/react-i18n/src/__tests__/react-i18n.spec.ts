import { I18n } from '@src/index';
import { I18nPackage } from '@src/package';
import { Core } from '@ts-chimera/core';

declare module '@src/defs' {
  interface Translations {
    hi: string;
  }
}

describe('react-i18n', () => {
  it('should return the correct translation', async () => {
    const translations = {
      en: {
        hi: 'Hello',
      },
      ro: {
        hi: 'Buna',
      },
    };

    const core = new Core({
      packages: [
        new I18nPackage({
          defaultLocale: 'en',
          translations,
        }),
      ],
    });

    await core.initialise();

    const i18n = core.container.get(I18n);

    expect(i18n.t('hi')).toBe(translations.en.hi);

    i18n.onLanguageChange('ro');

    expect(i18n.t('hi')).toBe(translations.ro.hi);
  });
});
