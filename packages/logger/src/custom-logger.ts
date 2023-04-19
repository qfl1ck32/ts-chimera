import { Injectable } from '@ts-phoenix/di';

import { LogArgs } from './defs';
import { Logger } from './logger';

@Injectable()
export class CustomLogger extends Logger {
  prefix?: string;

  public setPrefix(prefix: string) {
    this.prefix = prefix;
  }

  protected _log(args: LogArgs): Promise<void> {
    args.message = `${this.prefix ? `(${this.prefix})` : ''} ${args.message}`;

    return super._log(args);
  }
}
