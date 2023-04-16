# @ts-phoenix/event-manager

@ts-phoenix/event-manager is a powerful, type-safe event management library built with TypeScript. It leverages the EventEmitter from Node.js to provide a simple and elegant API for handling events in your applications.

## Features

- Type safety: Create events with a predefined interface to ensure consistency and reduce bugs.
- Event filtering: Add a filter function when adding an event listener to conditionally handle events.

## Installation

Install the package using npm or yarn:

```
npm i @ts-phoenix/event-manager
```

## Usage

Here's a basic example of how to use _@ts-phoenix/event-manager_:

1. Create an interface for your event and extend the Event class:

```ts
// MyEventInterface.ts
export interface MyEventData {
  message: string;
}

// MyEvent.ts
import { Event } from '@ts-phoenix/event-manager';
import { MyEventData } from './MyEventInterface';

export class MyEvent extends Event<MyEventData> {}
```

2. Use the event manager to add listeners and emit events:

```ts
// main.ts
import { EventManager, Listener } from '@ts-phoenix/event-manager';
import { MyEvent } from './MyEvent';

// Instantiate the event manager
const eventManager = new EventManager();

// Add an event listener with a filter function
eventManager.addListener<MyEvent>({
  event: MyEvent,
  handler: (e) => {
    console.log('Received:', e.data.message);
  },
  filter: async (e) => {
    // Only handle events with the message 'Hello, World!'
    return e.data.message === 'Hello, World!';
  },
});

// Emit an event that passes the filter
eventManager.emit(new MyEvent({ message: 'Hello, World!' }));

// Emit an event that does not pass the filter
eventManager.emit(new MyEvent({ message: 'Ignored' }));
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[GPL 3.0](https://choosealicense.com/licenses/gpl-3.0/)
