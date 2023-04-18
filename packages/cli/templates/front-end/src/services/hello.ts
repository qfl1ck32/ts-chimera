import { CoreAfterInitialiseEvent } from '@ts-phoenix/core';
import { Injectable, Inject } from '@ts-phoenix/di';
import { EventManager } from '@ts-phoenix/event-manager';

@Injectable()
export class Hello {
  constructor(@Inject(EventManager) private eventManager: EventManager) {
    this.eventManager.addListener({
      event: CoreAfterInitialiseEvent,
      handler: this.onCoreInitialised.bind(this),
    });
  }

  private onCoreInitialised() {
    console.log('The core has been initialised.');
  }
}
