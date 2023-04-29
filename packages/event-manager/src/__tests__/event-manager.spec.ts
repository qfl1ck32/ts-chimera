import { Core } from '@ts-phoenix/core';

import { EventManagerServiceToken } from '@src/constants';
import { Event, EventManagerPackage, HandlerType } from '@src/index';

describe('event-manager', () => {
  it('should work with filters', async () => {
    const core = new Core({
      packages: [new EventManagerPackage()],
    });

    await core.initialise();

    class MyEvent extends Event<{
      name: string;

      onCall: () => void;
    }> {}

    let called = false;

    const onCall = () => {
      called = true;
    };

    const handler: HandlerType<MyEvent> = async (e) => {
      e.data.onCall();
    };

    const filter: HandlerType<MyEvent> = (e) => {
      return e.data.name === 'test';
    };

    const eventManager = core.container.get(EventManagerServiceToken);

    eventManager.addListener({
      event: MyEvent,
      handler,
      filter,
    });

    await eventManager.emitSync(new MyEvent({ name: 'test-eeeh', onCall }));
    expect(called).toBe(false);

    await eventManager.emitSync(new MyEvent({ name: 'test', onCall }));
    expect(called).toBe(true);
  });
});
