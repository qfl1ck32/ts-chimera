import { Core } from '@ts-phoenix/core';
import { EventManager, Handler } from '@ts-phoenix/event-manager';
import chalk from 'chalk';

import { AfterLogEvent, BeforeLogEvent } from '@src/events';
import { Logger } from '@src/logger';
import { LoggerPackage } from '@src/package';

describe('logger', () => {
  test('logger', async () => {
    const core = new Core({
      packages: [new LoggerPackage()],
    });

    await core.initialise();

    const eventManager = core.container.get(EventManager);

    const logger = core.container.get(Logger);

    const message = 'hi';

    let calledBefore = false;
    let calledAfter = false;

    const handlerBefore: Handler<BeforeLogEvent> = async (e) => {
      calledBefore = true;
    };

    const handlerAfter: Handler<AfterLogEvent> = async (e) => {
      calledAfter = true;
    };

    eventManager.addListener({
      event: BeforeLogEvent,
      handler: handlerBefore,
    });

    eventManager.addListener({
      event: AfterLogEvent,
      handler: handlerAfter,
    });

    await logger.info(message);

    expect(calledBefore).toBe(true);
    expect(calledAfter).toBe(true);
  });

  it('should work with custom prefix', async () => {
    const core = new Core({
      packages: [
        new LoggerPackage({
          colors: {
            INFO: chalk.cyanBright,
          },
        }),
      ],
    });

    await core.initialise();

    const mainLogger = core.container.get(Logger);

    mainLogger.info = jest.fn();

    let logger = core.container.get(Logger);

    logger = logger.getWithPrefix('hello');

    expect(mainLogger.info).toBeCalledTimes(0);
  });
});
