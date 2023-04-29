import { use } from '@ts-phoenix/react-di';

import { SessionService } from './service';

export const useSession = () => {
  return use(SessionService);
};
