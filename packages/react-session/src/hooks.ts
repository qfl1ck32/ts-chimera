import { use } from '@ts-phoenix/react-di';

import { Session } from './service';

export const useSession = () => {
  return use(Session);
};
