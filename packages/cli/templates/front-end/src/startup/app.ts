import { Package } from '@ts-phoenix/core';

import { GreetingService, GreetingServiceToken } from '@src/services/greeting';

export class AppPackage extends Package {
  bind() {
    this.core.container
      .bind(GreetingServiceToken)
      .to(GreetingService)
      .inSingletonScope();
  }

  async initialise() {
    const greeting = this.core.container.get(GreetingServiceToken);

    greeting.welcome();
  }
}
