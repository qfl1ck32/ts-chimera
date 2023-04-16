import { InjectToken } from '@ts-chimera/di';

import { CONTAINER } from './tokens';

export const InjectContainer = () => InjectToken(CONTAINER);
