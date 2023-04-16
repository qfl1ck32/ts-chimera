import { readdirSync } from 'fs';
import { join } from 'path';

import { Core } from '@ts-chimera/core';

import { I18nGeneratorPackage } from '@src/package';
import { I18nGenerator } from '@src/service';

describe('react-i18n-generator', () => {
  it('should work', async () => {
    const locales = ['en', 'ro'];
    const missingKey = 'MISSING_KEY';

    const filesPath = join(__dirname, 'files');
    const outputPath = join(filesPath, 'translations');

    const core = new Core({
      packages: [
        new I18nGeneratorPackage({
          outputPath: 'src/__tests__/files/translations',
          srcDir: 'files',
          locales,
          missingKey,
        }),
      ],
    });

    await core.initialise();

    const generator = core.container.get(I18nGenerator);

    generator.run();

    const files = readdirSync(outputPath);

    expect(files.sort()).toEqual(
      [
        ...locales.map((language) => `${language}.json`),
        'defs.ts',
        'index.ts',
      ].sort(),
    );

    const i18n = require(join(filesPath, 'example', `i18n.json`));
    const onlyKeyInI18n = Object.keys(i18n)[0];

    const en = require(`${outputPath}/en.json`);

    expect(en).toStrictEqual({
      example: i18n,
    });

    const ro = require(`${outputPath}/ro.json`);

    expect(ro).toStrictEqual({
      example: {
        [onlyKeyInI18n]: missingKey,
      },
    });
  });
});
