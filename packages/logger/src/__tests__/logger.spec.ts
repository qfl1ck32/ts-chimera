import { Core } from '@ts-phoenix/core';
import { EventManager, Handler } from '@ts-phoenix/event-manager';

import { AfterLogEvent, BeforeLogEvent } from '@src/events';
import { Logger } from '@src/logger';
import { LoggerPackage } from '@src/package';

import { CustomLogger } from '..';

describe('logger', () => {
  test('logger', async () => {
    const core = new Core({
      packages: [new LoggerPackage()],
    });

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

  test('custom-logger', async () => {
    const core = new Core({
      packages: [new LoggerPackage()],
    });

    await core.initialise();

    const logger1 = core.container.get(CustomLogger);
    const logger1Prefix = '1';
    logger1.setPrefix(logger1Prefix);

    const logger2 = core.container.get(CustomLogger);
    const logger2Prefix = '2';
    logger2.setPrefix(logger2Prefix);

    expect(logger1.prefix).toBe(logger1Prefix);
    expect(logger2.prefix).toBe(logger2Prefix);
  });
});
