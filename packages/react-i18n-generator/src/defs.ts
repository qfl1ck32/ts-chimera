export interface State {
  missingKey: string;

  defaultLanguage: string;

  interpolation: {
    start: string;
    end: string;
  };

  i18nFilesRegex: string;
}

export interface UpdateTranslationsArgs
  extends Omit<State, 'interpolationRegex'> {
  outputPath: string;
  languages: string[];
}
