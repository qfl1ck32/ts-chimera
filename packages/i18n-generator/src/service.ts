import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

import { mergeDeep } from '@ts-phoenix/utils';
import { sync } from 'glob';

import { Args } from './defs';

export class I18nGenerator {
  constructor(private readonly args: Args) {}

  private get interpolationRegex() {
    return new RegExp(
      `${this.args.interpolationStart}(.*?)${this.args.interpolationEnd}`,
      'g',
    );
  }

  private extractInterpolationArgs(value: string) {
    const args = [] as string[];

    const matches = value.matchAll(this.interpolationRegex);

    for (const match of matches) {
      const arg = match[1].trim();

      args.push(arg);
    }

    return args;
  }

  private assignFunctionEnglish(
    target: Record<string, any>,
    source: Record<string, any>,
    key: string,
  ) {
    Object.assign(target, { [key]: source[key] });
  }

  private assignFunctionOtherLanguages(
    target: Record<string, any>,
    source: Record<string, any>,
    key: string,
  ) {
    Object.assign(target, {
      [key]:
        target[key] && target[key] !== this.args.missingKey
          ? target[key]
          : source[key],
    });
  }

  private removeKeys(object: Record<string, any>) {
    for (const [key, value] of Object.entries(object)) {
      if (typeof value === 'object') {
        this.removeKeys(value);

        continue;
      }

      object[key] = this.args.missingKey;

      const interpArgs = this.extractInterpolationArgs(value);

      if (interpArgs.length) {
        object[key] += ` ${interpArgs.map((arg) => `{{ ${arg} }}`).join(', ')}`;
      }
    }
  }

  private keepOnlyCurrentKeys(
    target: Record<string, any>,
    source: Record<string, any>,
  ) {
    if (target instanceof Object && source instanceof Object) {
      for (const key in target) {
        if (source[key] instanceof Object) {
          this.keepOnlyCurrentKeys(target[key], source[key]);
        } else {
          if (!source[key]) {
            delete target[key];
          }
        }
      }
    }
  }

  public run() {
    const translations = {} as Record<string, any>;

    for (const language of this.args.locales) {
      const filePath = resolve(this.args.outputPath, `${language}.json`);

      let content = [];

      if (existsSync(filePath)) {
        content = JSON.parse(readFileSync(filePath, 'utf-8'));
      }

      translations[language] = content;
    }

    const filePaths = sync(this.args.i18nFilesRegex);

    const fullTranslations = {} as Record<string, any>;

    for (const filePath of filePaths) {
      const fileContent = JSON.parse(readFileSync(filePath, 'utf-8'));

      const path = filePath.split('/');

      const srcIndex = path.findIndex((dir) => dir === this.args.srcDir) + 1;

      let dirNames = path.splice(srcIndex);

      dirNames = dirNames.slice(0, dirNames.length - 1);

      const result = {} as Record<string, any>;

      let resultPointer = result;

      for (const dirName of dirNames.slice(0, dirNames.length - 1)) {
        resultPointer[dirName] = {} as Record<string, any>;

        resultPointer = resultPointer[dirName];
      }

      const lastDirName = dirNames[dirNames.length - 1];

      resultPointer[lastDirName] = fileContent;

      mergeDeep({
        target: fullTranslations,
        assignFunction: this.assignFunctionEnglish,
        sources: [result],
      });
    }

    const fullTranslationsNoKeys = mergeDeep({
      target: {},
      assignFunction: this.assignFunctionEnglish,
      sources: [fullTranslations],
    });

    this.removeKeys(fullTranslationsNoKeys);

    const results = {} as Record<string, any>;

    for (const language of this.args.locales) {
      const isDefaultLanguage = language === this.args.defaultLocale;

      const currentFullTranslations = isDefaultLanguage
        ? fullTranslations
        : fullTranslationsNoKeys;

      const assignFunction = isDefaultLanguage
        ? this.assignFunctionEnglish
        : this.assignFunctionOtherLanguages.bind(this);

      const result = {} as Record<string, any>;

      this.keepOnlyCurrentKeys(translations[language], currentFullTranslations);

      mergeDeep({
        target: result,
        assignFunction,
        sources: [translations[language], currentFullTranslations],
      });

      results[language] = {};

      for (const key in result) {
        results[language][key] = result[key];
      }
    }

    if (!existsSync(this.args.outputPath)) {
      mkdirSync(this.args.outputPath, { recursive: true });
    }

    for (const language of this.args.locales) {
      writeFileSync(
        join(this.args.outputPath, `${language}.json`),
        JSON.stringify(results[language], null, 2),
      );
    }

    const types = `export type Translations = ${JSON.stringify(
      results[this.args.defaultLocale],
      null,
      2,
    )}`;

    writeFileSync(join(this.args.outputPath, `defs.ts`), types);

    const index = this.args.locales
      .map((language) => `import * as ${language} from "./${language}.json";`)
      .join('\n')
      .concat(`\n\nexport { ${this.args.locales.join(', ')} };`);

    writeFileSync(join(this.args.outputPath, `index.ts`), index);
  }
}
