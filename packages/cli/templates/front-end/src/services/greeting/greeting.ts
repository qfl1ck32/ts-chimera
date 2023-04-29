import { Inject, Service } from '@ts-phoenix/core';
import { LoggerServiceToken } from '@ts-phoenix/logger';
import type { ILoggerService } from '@ts-phoenix/logger';

import { IGreetingService } from './defs';

@Service()
export class GreetingService implements IGreetingService {
  constructor(
    @Inject(LoggerServiceToken) protected readonly logger: ILoggerService,
  ) {}

  public welcome() {
    this.logger.info('Welcome!');
  }
}
