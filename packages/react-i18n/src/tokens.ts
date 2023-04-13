import { Token } from '@ts-chimera/react-di';

export const DEFAULT_LOCALE = new Token<string>('DEFAULT_LOCALE');
export const TRANSLATIONS = new Token<Record<string, any>>('TRANSLATIONS');
