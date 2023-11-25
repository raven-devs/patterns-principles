// The base publisher class includes subscription management
// code and notification methods.
class EventManager {
  private listeners = new Map<string, EventListener[]>();

  subscribe(eventType: string, listener: EventListener) {
    let eventListeners = this.listeners.get(eventType);
    if (!eventListeners) {
      eventListeners = [];
    }

    if (eventListeners.includes(listener)) {
      return;
    }

    eventListeners.push(listener);

    this.listeners.set(eventType, eventListeners);
  }

  unsubscribe(eventType: string, listener: EventListener) {
    const eventListeners = this.listeners.get(eventType);
    if (!eventListeners) {
      return;
    }

    const eventListenersUpdated = eventListeners.filter((eventListener) => eventListener !== listener);

    if (eventListenersUpdated.length !== 0) {
      this.listeners.set(eventType, eventListenersUpdated);
    } else {
      this.listeners.delete(eventType);
    }
  }

  notify(eventType: string, data: any) {
    const eventListeners = this.listeners.get(eventType);
    if (!eventListeners) {
      return;
    }

    eventListeners.forEach((eventListener) => {
      eventListener.update(data);
    });
  }
}

// The concrete publisher contains real business logic that's
// interesting for some subscribers. We could derive this class
// from the base publisher, but that isn't always possible in
// real life because the concrete publisher might already be a
// subclass. In this case, you can patch the subscription logic
// in with composition, as we did here.
class Editor {
  events: EventManager;
  private file: File;

  constructor() {
    this.events = new EventManager();
  }

  // Methods of business logic can notify subscribers about
  // changes.
  openFile(path: string) {
    this.file = new File(path);
    this.events.notify('file-open', this.file.name);
  }

  saveFile(data: any) {
    this.file.write(data);
    this.events.notify('file-save', this.file.name);
  }
}

// Here's the subscriber interface.
interface EventListener {
  update(data: any): void;
}

// Concrete subscribers react to updates issued by the publisher
// they are attached to.
class LoggingListener implements EventListener {
  private log: File;
  private message: string;

  constructor(logPath: string, message: string) {
    this.log = new File(logPath);
    this.message = message;
  }

  update(fileName: any): void {
    this.log.write(`${this.message}: ${fileName}`);
  }
}

class EmailAlertListener implements EventListener {
  private email: string;
  private message: string;

  constructor(email: string, message: string) {
    this.email = email;
    this.message = message;
  }

  update(fileName: any): void {
    System.sendMail(this.email, `${this.message}: ${fileName}`);
  }
}

class Application {
  main() {
    const editor = new Editor();
    const logger = new LoggingListener('path_to_log.txt', 'Someone has opened the file');
    editor.events.subscribe('file-open', logger);

    const emailAlerts = new EmailAlertListener('admin@example.com', 'Someone has changed the file');
    editor.events.subscribe('file-save', emailAlerts);
  }
}

class File {
  name: string;

  constructor(path: string) {
    //...
  }

  write(data: any) {
    //...
  }
}

class System {
  static sendMail(mail: string, message: string) {
    //...
  }
}
