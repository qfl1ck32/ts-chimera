import { Package } from '@ts-chimera/core';

import { CLI } from './service';

export class CLIPackage extends Package {
  getServices() {
    return [CLI];
  }
}
