import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EventsRegistry } from '../src/events.registry';

describe('EventsRegistry', () => {
    beforeEach(() => {
        EventsRegistry.clear();
    });

    it('deve registrar um handler para um evento', () => {
        const mockCallback = vi.fn();

        EventsRegistry.registerHandler(
            'user.created',
            'handleUserCreated',
            mockCallback,
        );

        const events = EventsRegistry.getEvents();

        expect(events.length).toBe(1);
        expect(events[0][0]).toBe('user.created');
        expect(events[0][1].consumes.length).toBe(1);
        expect(events[0][1].consumes[0].handlerName).toBe('handleUserCreated');
        expect(events[0][1].consumes[0].cb).toBe(mockCallback);
    });

    it('deve sobrescrever um handler existente', () => {
        const oldCallback = vi.fn();
        const newCallback = vi.fn();

        EventsRegistry.registerHandler(
            'user.created',
            'handleUserCreated',
            oldCallback,
        );
        EventsRegistry.registerHandler(
            'user.created',
            'handleUserCreated',
            newCallback,
        );

        const events = EventsRegistry.getEvents();

        expect(events.length).toBe(1);
        expect(events[0][1].consumes.length).toBe(1);
        expect(events[0][1].consumes[0].cb).toBe(newCallback);
    });

    it('deve obter handlers corretamente', () => {
        const mockCallback = vi.fn();

        EventsRegistry.registerHandler(
            'user.created',
            'handleUserCreated',
            mockCallback,
        );

        const consumes = EventsRegistry.getConsumes('user.created');

        expect(consumes.length).toBe(1);
        expect(consumes[0].handlerName).toBe('handleUserCreated');
        expect(consumes[0].cb).toBe(mockCallback);
    });

    it('deve limpar os eventos corretamente', () => {
        EventsRegistry.registerHandler(
            'user.created',
            'handleUserCreated',
            vi.fn(),
        );

        expect(EventsRegistry.getEvents().length).toBe(1);

        EventsRegistry.clear();

        expect(EventsRegistry.getEvents().length).toBe(0);
    });
});
