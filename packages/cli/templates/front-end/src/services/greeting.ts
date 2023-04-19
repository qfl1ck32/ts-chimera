import { Inject, Injectable } from '@ts-phoenix/di';
import { Logger } from '@ts-phoenix/logger';

@Injectable()
class Greeting {
  constructor(@Inject(Logger) protected readonly logger: Logger) {}

  public welcome() {
    this.logger.info('Welcome!');
  }
}

export default Greeting;
