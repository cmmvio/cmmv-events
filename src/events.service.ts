import { Singleton, Service, Logger, Application, Config } from '@cmmv/core';

import { EventEmitter2 } from 'eventemitter2';

import { EventsRegistry } from './events.registry';
import { ServiceRegistry } from '@cmmv/core';

@Service('events')
export class EventsService extends Singleton {
  public logger: Logger = new Logger('EventsService');
  public emitter: EventEmitter2;

  public static async loadConfig(application: Application): Promise<void> {
    const instance = EventsService.getInstance();
    const config = Config.get('events', {});

    try {
      instance.emitter = new EventEmitter2(config);
      const events: any = EventsRegistry.getEvents();

      events.forEach(async ([message, metadata]) => {});

      const services: any = ServiceRegistry.getServices();

      console.log(events);
    } catch (e) {
      instance.logger.error(e.message);
      console.error(e);
    }
  }

  public emit() {}
}
