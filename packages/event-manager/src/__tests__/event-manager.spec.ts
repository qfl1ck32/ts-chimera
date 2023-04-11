import { Event, EventManager, Handler } from '@src/index';

describe('event-manager', () => {
  it('should work with filters', async () => {
    const eventManager = new EventManager();

    class MyEvent extends Event<{
      name: string;

      onCall: () => void;
    }> {}

    let called = false;

    const onCall = () => {
      called = true;
    };

    const handler: Handler<MyEvent> = async (e) => {
      e.data!.onCall();
    };

    const filter: Handler<MyEvent> = (e) => {
      return e.data!.name === 'test';
    };

    eventManager.addListener({
      event: MyEvent,
      handler,
      filter,
    });

    await eventManager.emitAsync(new MyEvent({ name: 'test-eeeh', onCall }));
    expect(called).toBe(false);

    await eventManager.emitAsync(new MyEvent({ name: 'test', onCall }));
    expect(called).toBe(true);
  });
});
