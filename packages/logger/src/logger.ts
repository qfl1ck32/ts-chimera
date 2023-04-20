import { Inject, Injectable } from '@ts-phoenix/di';
import { EventManager } from '@ts-phoenix/event-manager';
import chalk from 'chalk';

import { LogArgs, LogLevel } from './defs';
import { AfterLogEvent, BeforeLogEvent } from './events';

@Injectable()
export class Logger {
  constructor(@Inject(EventManager) private eventManager: EventManager) {}

  public async info(message: string) {
    return this._log({
      message,
      color: chalk.green,
      level: LogLevel.INFO,
    });
  }

  public async error(message: string) {
    return this._log({
      message,
      color: chalk.red,
      level: LogLevel.ERROR,
    });
  }

  public async warn(message: string) {
    return this._log({
      message,
      color: chalk.yellow,
      level: LogLevel.WARN,
    });
  }

  public async debug(message: string) {
    return this._log({
      message,
      color: chalk.blue,
      level: LogLevel.DEBUG,
    });
  }

  protected async _log(args: LogArgs) {
    const { message, level, color } = args;

    await this.eventManager.emitSync(new BeforeLogEvent({ message, level }));

    console.log(color(`[${level}] ${message}`));

    await this.eventManager.emitSync(new AfterLogEvent({ message, level }));
  }
}
