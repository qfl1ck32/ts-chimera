import { Token } from '@ts-chimera/di';

export const DEFAULT_LOCALE = new Token<string>('DEFAULT_LOCALE');
export const TRANSLATIONS = new Token<Record<string, any>>('TRANSLATIONS');
