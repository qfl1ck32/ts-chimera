export type InterpolationStrings = {
  start: '{{ ';
  end: ' }}';
};

export enum Locales {
  En = 'en',
  Ro = 'ro',
}

export const interpolationStrings: InterpolationStrings = {
  start: '{{ ',
  end: ' }}',
};

declare module '@ts-phoenix/react-session' {
  // export interface SessionData {}
}
