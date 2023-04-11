import { Inject, Injectable } from '@ts-chimera/di';
import { EventManager } from '@ts-chimera/event-manager';
import chalk from 'chalk';
import { AfterLogEvent, BeforeLogEvent } from './events';

@Injectable()
export class Logger {
  constructor(@Inject(EventManager) private eventManager: EventManager) {}

  public async info(message: string) {
    return this._log(`[INFO] ${message}`, chalk.green);
  }

  public async error(message: string) {
    return this._log(`[ERROR] ${message}`, chalk.red);
  }

  public async warn(message: string) {
    return this._log(`[WARN] ${message}`, chalk.yellow);
  }

  public async debug(message: string) {
    return this._log(`[DEBUG] ${message}`, chalk.blue);
  }

  public async log(message: string) {
    return this._log(message, chalk.white);
  }

  private async _log(message: string, color: chalk.Chalk) {
    await this.eventManager.emitAsync(new BeforeLogEvent({ message }));

    console.log(color(message));

    await this.eventManager.emitAsync(new AfterLogEvent({ message }));
  }
}
