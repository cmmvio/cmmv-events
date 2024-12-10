import { Application, Service } from '@cmmv/core';
import { OnEvent } from '../src/events.decorator';
import { EventsService } from '../src/events.service';

@Service()
export class Listerner {
  constructor(private readonly eventsService: EventsService) {
    console.log('AKi mano');
  }

  @OnEvent('hello-world')
  public async OnReciveMessage(payload: any) {
    console.log('hello-world', payload);
    //this.queueService.send('hello-world', 'niceday', 'NiceDay');
  }
}
