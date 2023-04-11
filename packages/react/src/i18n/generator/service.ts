import { existsSync, readFileSync, writeFileSync } from 'fs';
import glob from 'glob';
import { join, resolve } from 'path';

import { mergeDeep } from '@ts-chimera/core';
import { Injectable } from '@ts-chimera/di';

import { State, UpdateTranslationsArgs } from './defs';

@Injectable()
export class I18nGenerator {
  private state!: State;

  get interpolationRegex() {
    return new RegExp(
      `${this.state.interpolation.start}(.*?)${this.state.interpolation.end}`,
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
        target[key] && target[key] !== this.state.missingKey
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

      object[key] = this.state.missingKey;

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

  public updateTranslations(args: UpdateTranslationsArgs) {
    this.state = args;

    const translations = {} as Record<string, any>;

    for (const language of args.languages) {
      const filePath = resolve(args.outputPath, `${language}.json`);

      let content = [];

      if (existsSync(filePath)) {
        content = JSON.parse(readFileSync(filePath, 'utf-8'));
      }

      translations[language] = content;
    }

    const filePaths = glob.sync(this.state.i18nFilesRegex);

    let fullTranslations = {} as Record<string, any>;

    for (const filePath of filePaths) {
      const fileContent = JSON.parse(readFileSync(filePath, 'utf-8'));

      const path = filePath.split('/');

      const name = path[path.length - 2];

      const result = {} as Record<string, any>;

      let resultPointer = result;

      resultPointer[name] = fileContent;

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

    for (const language of args.languages) {
      const isDefaultLanguage = language === this.state.defaultLanguage;

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

    for (const language of args.languages) {
      writeFileSync(
        join(args.outputPath, `${language}.json`),
        JSON.stringify(results[language], null, 2),
      );
    }

    const types = `export type Translations = ${JSON.stringify(
      results[this.state.defaultLanguage],
      null,
      2,
    )}`;

    writeFileSync(
      join(args.outputPath, `${this.state.defaultLanguage}.ts`),
      types,
    );
  }
}
