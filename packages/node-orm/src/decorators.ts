import { InjectToken } from '@ts-phoenix/di';

import { DATA_SOURCE_INSTANCE_TOKEN } from './tokens';

export const InjectDataSource = (): any => {
  return InjectToken(DATA_SOURCE_INSTANCE_TOKEN);
};
