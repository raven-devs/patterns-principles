// npx ts-node src/module/patterns/creational/abstract-factory-01.ts

/**
 * The Abstract Factory pattern provides an interface for creating families of related or dependent objects without
 * specifying their concrete types. This pattern allows the client to use abstract classes instead of concrete classes
 * to create families of objects.
 *
 * The main differences between Abstract Factory and Factory Method:
 * 1. Abstract Factory is implemented by Composition, but Factory Method is implemented by Inheritance.
 * 2. Abstract Factory is an object (that has multiple factory methods), but Factory Method is a (single) method.
 * 3. With Abstract Factory a class delegates the responsibility of object instantiation to another object via
 * composition, whereas Factory Method uses inheritance and relies on a subclass to handle the desired object
 * instantiation.
 *
 * Abstract Factory is injected into the client. This is why we say that Abstract Factory is implemented by Composition.
 * Often, a dependency injection framework would perform that task, but a framework is not required for DI.
 */

interface OutboundQueue {
  sendMessage(message: string): void;
}

interface ReplyQueue {
  receiveMessage(): string;
}

class AzureMessageQueue implements OutboundQueue {
  sendMessage(message: string): void {
    console.log('send message with Azure...');
  }
}

class AzureResponseMessageQueue implements ReplyQueue {
  receiveMessage(): string {
    return 'recive message with Azure...';
  }
}

class MsmqMessageQueue implements OutboundQueue {
  sendMessage(message: string): void {
    console.log('send message with Msmq...');
  }
}

class MsmqResponseMessageQueue implements ReplyQueue {
  receiveMessage(): string {
    return 'recive message with Msmq...';
  }
}

// abstract factory provides an interface for creating **families** of related or dependent objects.
interface MessageQueueFactory {
  createOutboundQueue(): OutboundQueue;
  createReplyQueue(): ReplyQueue;
}

// concrete factory
class AzureMessageQueueFactory implements MessageQueueFactory {
  createOutboundQueue(): OutboundQueue {
    return new AzureMessageQueue();
  }

  createReplyQueue(): ReplyQueue {
    return new AzureResponseMessageQueue();
  }
}

// concrete factory
class MsmqMessageQueueFactory implements MessageQueueFactory {
  createOutboundQueue(): OutboundQueue {
    return new MsmqMessageQueue();
  }

  createReplyQueue(): ReplyQueue {
    return new MsmqResponseMessageQueue();
  }
}

// The factory creates message queues either for Azure or MSMQ, the client does not know which technology is used.
class QueueClient {
  private messageQueueFactory: MessageQueueFactory;

  // Composition: the abstract factory in injected into the client
  constructor(messageQueueFactory: MessageQueueFactory) {
    this.messageQueueFactory = messageQueueFactory;
  }

  sendMessage(message: string): void {
    const outQueue: OutboundQueue = this.messageQueueFactory.createOutboundQueue();
    outQueue.sendMessage(message);
  }

  receiveMessage(): string {
    const inQueue: ReplyQueue = this.messageQueueFactory.createReplyQueue();
    return inQueue.receiveMessage();
  }
}

function main() {
  const queueClient: QueueClient = new QueueClient(new AzureMessageQueueFactory());
  queueClient.sendMessage('Hi there!');
  const response = queueClient.receiveMessage();
  console.log({ response });
}

main();

export {};
