import {
  Event,
  EventManager,
  EventManagerPackage,
  HandlerType,
  Listener,
} from '@src/index';
import { Core } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';

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

    const eventManager = core.container.get(EventManager);

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

  it('should work with decorators', async () => {
    const core = new Core({
      packages: [new EventManagerPackage()],
    });

    class MyEvent extends Event {}

    @Injectable()
    class MyService {
      public initialised: boolean;

      constructor() {
        this.initialised = false;
      }

      @Listener({
        event: MyEvent,
      })
      async onMyEvent(e: MyEvent) {
        this.initialised = true;
      }
    }

    await core.initialise();

    const eventManager = core.container.get(EventManager);
    const myService = core.container.get(MyService);

    await eventManager.emitSync(new MyEvent());

    expect(myService.initialised).toBe(true);
  });
});
