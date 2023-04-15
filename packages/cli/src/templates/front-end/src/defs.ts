export type InterpolationStrings = {
  start: '{{ ';
  end: ' }}';
};

export const interpolationStrings: InterpolationStrings = {
  start: '{{ ',
  end: ' }}',
};

declare module '@ts-chimera/react-session' {
  export interface SessionData {}
}
