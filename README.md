<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Building scalable and modular applications using contracts.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/events"><img src="https://img.shields.io/npm/v/@cmmv/events.svg" alt="NPM Version" /></a>
    <a href="https://github.com/cmmvio/cmmv-events/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/events.svg" alt="Package License" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Documentation</a> &bull;
  <a href="https://github.com/cmmvio/cmmv-events/issues">Report Issue</a>
</p>

## Description

The `@cmmv/events` module provides a simple and scalable event management system for applications built with the CMMV framework. By leveraging [`eventemitter2`](https://www.npmjs.com/package/eventemitter2), it allows developers to create, emit, and listen to events across the application seamlessly. 

## Features

- **Event-Driven Architecture**: Simplifies event-based communication between services, controllers, and other providers.
- **Decorator-Based API**: Intuitive decorators like `@OnEvent` for binding event handlers.
- **Integration with CMMV Framework**: Works seamlessly with CMMV modules and services.
- **Flexible Payloads**: Supports any payload type with recommended use of TypeScript interfaces for type safety.

## Installation

Install the `@cmmv/events` package via npm:

```bash
$ pnpm add @cmmv/events
```

## Configuration

The ``@cmmv/events`` module does not require additional configuration. Simply include it in your application modules.

## Setting Up the Application

In your ``index.ts``, include the ``EventsModule`` and any custom modules using event listeners:

```typescript
import { Application } from '@cmmv/core';
import { DefaultAdapter, DefaultHTTPModule } from '@cmmv/http';
import { EventsModule, EventsService } from '@cmmv/events';

import { ListernersModule } from './listeners.module';

Application.create({
    httpAdapter: DefaultAdapter,
    modules: [
        DefaultHTTPModule, 
        EventsModule, 
        ListernersModule
    ],
    services: [EventsService],
});
```

## Creating Event Listeners

Use the ``@OnEvent`` decorator to bind a method to an event. Event listeners can be added to any service, controller, or gateway in your application.

```typescript
import { Service } from '@cmmv/core';
import { OnEvent } from '@cmmv/events';
import { EventsService } from '@cmmv/events';

@Service("listener")
export class Listener {
    constructor(private readonly eventsService: EventsService) {}

    @OnEvent('hello-world')
    public async OnReceiveMessage(payload: any) {
        console.log('hello-world event received:', payload);
    }
}
```

## Emitting Events

To emit an event, inject ``EventsService`` into your class and call the ``emit`` method:

```typescript
this.eventsService.emit('event-name', { key: 'value' });
```

## Decorators

### ``@OnEvent(eventName: string)``

Binds a method to listen for a specific event.

## Best Practices

* **Use Interfaces for Payloads:** Define TypeScript interfaces for event payloads to ensure consistency and type safety.
* **Group Related Events:** Use event namespaces or prefixes to group related events (e.g., user.created, user.updated).

The ``@cmmv/events`` module simplifies event-based communication in your CMMV applications. Its intuitive decorator-based API and seamless integration make it a powerful tool for building scalable and modular event-driven applications.