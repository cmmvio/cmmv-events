import { Service } from '@cmmv/core';
import { OnEvent } from '../src/events.decorator';
import { EventsService } from '../src/events.service';

@Service('listerner')
export class Listerner {
  constructor(private readonly eventsService: EventsService) {}

  @OnEvent('hello-world')
  public async OnReciveMessage(payload: any) {
    console.log('hello-world', payload);
    //this.eventsService.emit("hello-world", { hello: "world" });
  }
}
