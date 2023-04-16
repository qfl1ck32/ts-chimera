import { Token } from '@ts-chimera/react-di';

import { Config } from './defs';

export const SESSION_STORAGE_CONFIG = new Token<Config>(
  'SESSION_STORAGE_CONFIG',
);
