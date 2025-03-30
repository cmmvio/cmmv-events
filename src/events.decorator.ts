import { EventsRegistry } from './events.registry.js';

export function OnEvent(message: string) {
    return function (target: any, context: ClassMethodDecoratorContext) {
        if (context.kind !== 'method')
            throw new Error('@OnEvent can only be used on methods');

        EventsRegistry.registerHandler(
            message,
            context.name.toString(),
            target,
        );
    };
}
