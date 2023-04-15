export interface Config {
  missingKey: string;

  defaultLanguage: string;

  interpolation: {
    start: string;
    end: string;
  };

  i18nFilesRegex: string;
  srcDir: string;

  outputPath: string;
  languages: string[];
}

export interface RequiredConfig extends Pick<Config, 'languages'> {}
