import { Core } from '@ts-phoenix/core';
import {
  EventManagerPackage,
  EventManagerServiceToken,
  HandlerType,
} from '@ts-phoenix/event-manager';

import { CustomLoggerServiceToken, LoggerServiceToken } from '@src/constants';
import { AfterLogEvent, BeforeLogEvent } from '@src/events';
import { LoggerPackage } from '@src/package';

describe('logger', () => {
  let core: Core;

  beforeEach(async () => {
    core = new Core({
      packages: [new EventManagerPackage(), new LoggerPackage()],
    });

    await core.initialise();
  });

  test('logger', async () => {
    const eventManager = core.container.get(EventManagerServiceToken);

    const logger = core.container.get(LoggerServiceToken);

    const message = 'hi';

    let calledBefore = false;
    let calledAfter = false;

    const handlerBefore: HandlerType<BeforeLogEvent> = async (e) => {
      calledBefore = true;
    };

    const handlerAfter: HandlerType<AfterLogEvent> = async (e) => {
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

  it('custom logger', async () => {
    const logger1 = core.container.get(CustomLoggerServiceToken);
    logger1.setPrefix('hello');

    const logger2 = core.container.get(CustomLoggerServiceToken);

    expect(logger2.prefix).not.toBe('hello');
  });
});
