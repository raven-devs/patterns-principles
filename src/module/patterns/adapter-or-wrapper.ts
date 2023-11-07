// npx ts-node src/module/patterns/adapter-wrapper.ts

/**
 * The Adapter Design Pattern, also known as the Wrapper, allows two classes to work together that otherwise would have
 * incompatible interfaces. The Adapter pattern relies on a common abstraction which defines the interface client code
 * will consume. Different implementations of this interface are then created to support different otherwise
 * incompatible ways of achieving the goal of the abstraction.
 *
 * Converts the interface of a class into another interface clients expect. Adapter lets classes work together that
 * couldn't otherwise because of incompatible interfaces.
 */

// For example, an application may wish to send notifications as part of its functionality. However, there are several
// approaches to sending notifications that have different interfaces:
// - sendEmail(toEmail: string, subject: string, body: string)
// - sendSms(toPhoneNumber: string, message: string)
// - sendPush(username: string, message: string)

// Instead of writing complex code that needs to work with all of these different interfaces, an adapter interface can
// be used:

class User {
  constructor(
    public username: string,
    public emailAddress: string,
    public phoneNumber: string,
    public allowEmailNotifications: boolean,
  ) {}
}

class Message {
  constructor(
    public title: string,
    public details: string,
  ) {}
}

// notification interfaces #1
class EmailNotification {
  send(toEmail: string, subject: string, body: string) {
    console.log('email sent...');
  }
}

// notification interfaces #2
class SmsNotification {
  send(toPhoneNumber: string, message: string) {
    console.log('sms sent...');
  }
}

// notification interfaces #3
class PushNotification {
  send(username: string, message: string) {
    console.log('push sent...');
  }
}

// the adapter / wrapper over incompatible notification interfaces
interface NotificationAdapter {
  send(user: User, message: Message): void;
}

// Given this adapter interface, specific implementations can be written to support each messaging interface:

class EmailNotificationAdapter implements NotificationAdapter {
  constructor(private readonly sender: EmailNotification) {}

  send(user: User, message: Message): void {
    if (!user.allowEmailNotifications) {
      return;
    }

    this.sender.send(user.emailAddress, message.title, message.details);
  }
}

class SmsNotificationAdapter implements NotificationAdapter {
  constructor(private readonly sender: SmsNotification) {}

  send(user: User, message: Message): void {
    if (!user.allowEmailNotifications) {
      return;
    }

    this.sender.send(user.phoneNumber, message.details);
  }
}

class PushNotificationAdapter implements NotificationAdapter {
  constructor(private readonly sender: PushNotification) {}

  send(user: User, message: Message): void {
    if (!user.allowEmailNotifications) {
      return;
    }

    this.sender.send(user.username, message.details);
  }
}

function main() {
  const user = new User('Jack London', 'jack.london@company.com', '+493455689', true);
  const message = new Message('title', 'some notification...');

  const smsNotification: NotificationAdapter = new SmsNotificationAdapter(new SmsNotification());
  smsNotification.send(user, message);

  const pushNotification = new PushNotificationAdapter(new PushNotification());
  pushNotification.send(user, message);
}

main();

export {};
