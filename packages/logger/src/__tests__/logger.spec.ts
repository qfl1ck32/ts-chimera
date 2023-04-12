import { EventManager, Handler } from '@ts-chimera/event-manager';

import { AfterLogEvent, BeforeLogEvent } from '@src/events';
import { Logger } from '@src/service';

describe('logger', () => {
  test('hello', async () => {
    const eventManager = new EventManager();

    const logger = new Logger(eventManager);

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

    await logger.log(message);

    expect(calledBefore).toBe(true);
    expect(calledAfter).toBe(true);
  });
});
