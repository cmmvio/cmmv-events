import { Application, Logger } from '@cmmv/core';
import { EventsService } from '../src/events.service';
import { OnEvent } from '../src/events.decorator';

export class Listerner {
    public logger: Logger = new Logger('Listerner');

    public static async loadConfig(application: Application): Promise<void> {
        const eventsService = Application.resolveProvider(EventsService);
        eventsService.emit('hello-world', { hello: 'world' });
    }

    @OnEvent('hello-world')
    public async OnReciveMessage(payload: any) {
        console.log('OnReciveMessage', payload);
    }
}
