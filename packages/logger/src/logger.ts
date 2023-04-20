import { Inject, InjectToken, Injectable } from '@ts-phoenix/di';
import { EventManager } from '@ts-phoenix/event-manager';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { LogArgs, LogLevel, PackageConfigType } from './defs';
import { AfterLogEvent, BeforeLogEvent } from './events';

@Injectable()
export class Logger {
  private prefix?: string;

  constructor(
    @Inject(EventManager)
    private eventManager: EventManager,
    @InjectToken(PACKAGE_CONFIG_TOKEN) private config: PackageConfigType,
  ) {}

  public getWithPrefix(prefix: string) {
    const logger = new Logger(this.eventManager, this.config);

    logger.prefix = prefix;

    return logger;
  }

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

    console.log(
      this.config.colors[level](
        `${this.prefix ? `(${this.prefix}) ` : ''}[${level}] ${message}`,
      ),
    );

    await this.eventManager.emitSync(new AfterLogEvent({ message, level }));
  }
}
