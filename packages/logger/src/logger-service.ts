import { Inject, Service } from '@ts-phoenix/core';
import {
  EventManagerServiceToken,
  IEventManagerService,
} from '@ts-phoenix/event-manager';

import { LoggerPackageConfigToken } from './constants';
import {
  LogArgs,
  LogLevel,
  ILoggerPackageConfig,
  ILoggerService,
} from './defs';
import { AfterLogEvent, BeforeLogEvent } from './events';

@Service()
export class LoggerService implements ILoggerService {
  constructor(
    @Inject(EventManagerServiceToken)
    private eventManager: IEventManagerService,
    @Inject(LoggerPackageConfigToken) private config: ILoggerPackageConfig,
  ) {}

  public async info(message: string) {
    return this._log({
      message,
      level: LogLevel.INFO,
    });
  }

  public async error(message: string) {
    return this._log({
      message,
      level: LogLevel.ERROR,
    });
  }

  public async warn(message: string) {
    return this._log({
      message,
      level: LogLevel.WARN,
    });
  }

  public async debug(message: string) {
    return this._log({
      message,
      level: LogLevel.DEBUG,
    });
  }

  protected async _log(args: LogArgs) {
    const { message, level } = args;

    await this.eventManager.emitSync(new BeforeLogEvent({ message, level }));

    console.log(this.config.colors[level](`[${level}] ${message}`));

    await this.eventManager.emitSync(new AfterLogEvent({ message, level }));
  }
}
