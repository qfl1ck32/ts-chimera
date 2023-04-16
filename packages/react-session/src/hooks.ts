import { use } from '@ts-chimera/react-di';

import { Session } from './service';

export const useSession = () => {
  return use(Session);
};
