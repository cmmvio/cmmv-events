import { Singleton, Service, Logger, Application, Config } from '@cmmv/core';

import { EventEmitter2 } from 'eventemitter2';

import { EventsRegistry } from './events.registry';

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

      events.forEach(async ([message, metadata]) => {
        metadata?.consumes.forEach(({ cb }) => {
          instance.emitter.on(message, (payload) => cb(payload));
        });
      });
    } catch (e) {
      if (e instanceof Error) instance.logger.error(e.message);
      else instance.logger.error(String(e));

      console.error(e);
    }
  }

  public emit(message: string, payload: any) {
    const instance = EventsService.getInstance();
    instance.emitter.emit(message, payload);
  }
}
