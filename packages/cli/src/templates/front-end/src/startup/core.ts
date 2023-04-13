import { Core } from '@ts-chimera/core';

import { AppPackage } from './app';

export const core = new Core({
  packages: [new AppPackage()],
});
