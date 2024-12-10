import { EventsRegistry } from './events.registry';

export function OnEvent(message: string): MethodDecorator {
  return (target, propertyKey: string | symbol) => {
    console.log(typeof target);
    EventsRegistry.registerConsumeHandler(
      target,
      message,
      propertyKey as string,
    );
  };
}
