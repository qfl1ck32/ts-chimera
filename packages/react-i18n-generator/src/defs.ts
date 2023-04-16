export interface Config {
  missingKey: string;

  defaultLocale: string;
  locales: string[];

  interpolation: {
    start: string;
    end: string;
  };

  i18nFilesRegex: string;
  srcDir: string;

  outputPath: string;
}

export type RequiredConfig = Pick<Config, 'locales'>
