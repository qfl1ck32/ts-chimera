export interface PackageConfigType {
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

export type RequiredConfig = Pick<PackageConfigType, 'locales'>;
