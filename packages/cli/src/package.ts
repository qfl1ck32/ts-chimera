import { Package } from '@ts-phoenix/core';

import { CLI } from './service';

export class CLIPackage extends Package {
  getServices() {
    return [CLI];
  }
}
