import { Package } from '@ts-phoenix/core';

import { CLIServiceToken } from './constants';
import { CLIService } from './service';
import { MicroserviceWriter } from './writers';

export class CLIPackage extends Package {
  bind() {
    this.core.container.bind(CLIServiceToken).to(CLIService).inSingletonScope();
    // TODO: think if di even makes sense here
    this.core.container
      .bind(MicroserviceWriter)
      .to(MicroserviceWriter)
      .inSingletonScope();
  }
}
