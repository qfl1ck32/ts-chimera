import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';

import Greeting from '@src/services/greeting';

@Injectable()
export class AppPackage extends Package {
  async initialise() {
    const greeting = this.core.container.get(Greeting);

    greeting.welcome();
  }
}
