export interface Args {
  missingKey: string;

  defaultLocale: string;
  locales: string[];

  interpolationStart: string;
  interpolationEnd: string;

  i18nFilesRegex: string;
  srcDir: string;

  outputPath: string;
}
