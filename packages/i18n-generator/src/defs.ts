export interface II18nGeneratorPackageConfig {
  missingKey: string;

  defaultLocale: string;
  locales: string[];

  interpolationStart: string;
  interpolationEnd: string;

  i18nFilesRegex: string;
  srcDir: string;

  outputPath: string;
}

export interface II18nGeneratorService {
  run(): void;
}
