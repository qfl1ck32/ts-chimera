import { Core } from '@ts-phoenix/core';
import {
  EventManagerPackage,
  EventManagerServiceToken,
} from '@ts-phoenix/event-manager';
import { LoggerPackage } from '@ts-phoenix/logger';

import {
  AfterORMInitialiseEvent,
  BeforeORMDestroyEvent,
  BeforeORMInitialiseEvent,
  ORMPackage,
  ORMServiceToken,
} from '@src/index';

describe('node-orm', () => {
  it('should work', async () => {
    const core = new Core({
      packages: [
        new ORMPackage({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'test',
        }),
        new LoggerPackage(),
        new EventManagerPackage(),
      ],
    });

    await core.initialise();

    const ormService = core.container.get(ORMServiceToken);
    const eventManagerService = core.container.get(EventManagerServiceToken);

    const beforeORMInitialiseEventHandler = jest.fn();
    const afterORMInitialiseEventHandler = jest.fn();
    const beforeORMDestroyEventHandler = jest.fn();

    eventManagerService.addListener({
      event: BeforeORMInitialiseEvent,
      handler: beforeORMInitialiseEventHandler,
    });

    eventManagerService.addListener({
      event: AfterORMInitialiseEvent,
      handler: afterORMInitialiseEventHandler,
    });

    eventManagerService.addListener({
      event: BeforeORMDestroyEvent,
      handler: beforeORMDestroyEventHandler,
    });

    await ormService.initialise();

    expect(beforeORMInitialiseEventHandler).toBeCalledTimes(1);
    expect(afterORMInitialiseEventHandler).toBeCalledTimes(1);

    await ormService.destroy();

    expect(beforeORMDestroyEventHandler).toBeCalledTimes(1);
  });
});
