export class EventsRegistry {
  public static events = new Map<
    string,
    {
      consumes: any[];
    }
  >();

  public static registerConsumeHandler(
    target: any,
    message: string,
    handlerName: string,
  ) {
    let events = this.events.get(message);
    console.log(target);

    if (!events) {
      this.events.set(message, {
        consumes: [],
      });

      events = this.events.get(target.constructor);
    }

    if (events) {
      const handler = events.consumes.find(
        (msg) => msg.handlerName === handlerName,
      );

      if (!handler)
        events.consumes.push({ handlerName, cb: target.constructor });
      else handler.cb = target.constructor;
    }
  }

  public static getEvents() {
    return Array.from(this.events.entries());
  }

  public static getConsumes(target: any): any[] {
    const events = this.events.get(target);
    return events ? events.consumes : [];
  }

  public static clear() {
    EventsRegistry.events = new Map<
      string,
      {
        consumes: any[];
      }
    >();
  }
}
