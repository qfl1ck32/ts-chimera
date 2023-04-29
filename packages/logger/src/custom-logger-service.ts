import { Service } from '@ts-phoenix/core';

import { ICustomLoggerService, LogArgs } from './defs';
import { LoggerService } from './logger-service';

@Service()
export class CustomLoggerService
  extends LoggerService
  implements ICustomLoggerService
{
  prefix?: string;

  setPrefix(prefix: string): void {
    this.prefix = prefix;
  }

  protected async _log(args: LogArgs) {
    args.message = `${this.prefix ? `(${this.prefix}) ` : ''}${args.message}`;
    return super._log(args);
  }
}
