import { Module } from '@cmmv/core';

import { Listerner } from './listeners.service';

export let ListernersModule = new Module('listener', {
  providers: [Listerner],
});
