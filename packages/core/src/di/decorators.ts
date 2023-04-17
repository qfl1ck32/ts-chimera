import { InjectToken } from '@ts-phoenix/di';

import { CONTAINER } from '../tokens';

export const InjectContainer = () => InjectToken(CONTAINER);
