import { Application } from '@cmmv/core';
import { DefaultAdapter, DefaultHTTPModule } from '@cmmv/http';
import { EventsModule, EventsService } from '../src';

import { ListernersModule } from './listeners.module';
import { Listerner } from './listeners.service';

Application.create({
  httpAdapter: DefaultAdapter,
  modules: [DefaultHTTPModule, EventsModule, ListernersModule],
  services: [EventsService],
});
