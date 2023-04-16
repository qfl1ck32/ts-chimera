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

export interface RequiredConfig extends Pick<Config, 'locales'> {}
