import { Core } from '@ts-phoenix/core';
import { EventManager } from '@ts-phoenix/event-manager';

import {
  AfterORMInitialiseEvent,
  BeforeORMDestroyEvent,
  BeforeORMInitialiseEvent,
  ORM,
  ORMPackage,
} from '@src/index';
import { LoggerPackage } from '@ts-phoenix/logger';

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
      ],
    });

    await core.initialise();

    const orm = core.container.get(ORM);
    const eventManager = core.container.get(EventManager);

    const beforeORMInitialiseEventHandler = jest.fn();
    const afterORMInitialiseEventHandler = jest.fn();
    const beforeORMDestroyEventHandler = jest.fn();

    eventManager.addListener({
      event: BeforeORMInitialiseEvent,
      handler: beforeORMInitialiseEventHandler,
    });

    eventManager.addListener({
      event: AfterORMInitialiseEvent,
      handler: afterORMInitialiseEventHandler,
    });

    eventManager.addListener({
      event: BeforeORMDestroyEvent,
      handler: beforeORMDestroyEventHandler,
    });

    await orm.initialise();

    expect(beforeORMInitialiseEventHandler).toBeCalledTimes(1);
    expect(afterORMInitialiseEventHandler).toBeCalledTimes(1);

    await orm.destroy();

    expect(beforeORMDestroyEventHandler).toBeCalledTimes(1);
  });
});
