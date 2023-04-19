import { Core, Package } from '@ts-phoenix/core';
import { EventManager } from '@ts-phoenix/event-manager';
import { LoggerPackage } from '@ts-phoenix/logger';
import { Express, ExpressPackage } from '@ts-phoenix/node-express';

import {
  BeforeServerStartEvent,
  AfterServerStartEvent,
  BeforeServerStopEvent,
} from '@src/events';
import { ApolloPackage } from '@src/package';

describe('node-apollo', () => {
  it('should work', async () => {
    const beforeServerStartListener = jest.fn();
    const afterServerStartListener = jest.fn();
    const beforeServerStopListener = jest.fn();

    class TestPackage extends Package {
      async initialise() {
        this.core.eventManager.addListener({
          event: BeforeServerStartEvent,
          handler: beforeServerStartListener,
        });

        this.core.eventManager.addListener({
          event: AfterServerStartEvent,
          handler: afterServerStartListener,
        });

        this.core.eventManager.addListener({
          event: BeforeServerStopEvent,
          handler: beforeServerStopListener,
        });
      }
    }

    const core = new Core({
      packages: [
        new ApolloPackage(),
        new LoggerPackage(),
        new ExpressPackage(),
        new TestPackage(),
      ],
    });

    await core.initialise();

    const express = core.container.get(Express);

    expect(beforeServerStartListener).toHaveBeenCalled();
    expect(afterServerStartListener).toHaveBeenCalled();

    await express.stop();

    expect(beforeServerStopListener).toHaveBeenCalled();
  });
});
