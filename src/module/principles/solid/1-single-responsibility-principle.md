# Single Responsibility Principle (SRP)

The Single Responsibility Principle (SRP) states that a class should have only one reason to change, meaning that a class should have only one responsibility.

The Single Responsibility Principle is closely related to the concepts of coupling and cohesion. Coupling refers to how inextricably linked different aspects of an application are, while cohesion refers to how closely related the contents of a particular class or package may be. All of the contents of a single class are tightly coupled together, since the class itself is a single unit that must either be entirely used or not at all (discounting static methods and data for the moment). When other classes make use of a particular class, and that class changes, the depending classes must be tested to ensure they continue to function correctly with the new behavior of the class. If a class has poor cohesion, some part of it may change that only certain depending classes utilize, while the rest of it may remain unchanged. Nonetheless, classes that depend on the class must all be retested as a result of the change, increasing the total surface area of the application that is affected by the change. If instead the class were broken up into several, highly cohesive classes, each would be used by fewer other elements of the system, and so a change to any one of them would have a lesser impact on the total system.

Some examples of responsibilities to consider that may need to be separated include:

- Persistence
- Validation
- Notification
- Error Handling
- Logging
- Class Selection / Instantiation
- Formatting
- Parsing
- Mapping

Define interfaces / classes that take care of one thing only.

The dependency inversion principle helps to adhere to the single-responsibility principle by allowing you to separate concerns into different modules. For example, the high-level module can provide a more abstract interface, while the low-level module can focus on implementing the details.

In TypeScript, you can adhere to the Single Responsibility Principle by organizing your code in a way that each class or module has a single, well-defined responsibility.

```typescript
// Example without following SRP
class User {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  saveUserToDatabase(user: User): void {
    // Save the user to the database
    console.log(`Saving user ${user.name} to the database`);
  }

  sendEmailToUser(user: User): void {
    // Send an email to the user
    console.log(`Sending email to ${user.name}`);
  }
}

// Example following SRP
class User {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }
}

class UserDatabase {
  saveUserToDatabase(user: User): void {
    // Save the user to the database
    console.log(`Saving user ${user.getName()} to the database`);
  }
}

class EmailService {
  sendEmailToUser(user: User): void {
    // Send an email to the user
    console.log(`Sending email to ${user.getName()}`);
  }
}

// Client code
const user = new User('John Doe');

const userDatabase = new UserDatabase();
userDatabase.saveUserToDatabase(user);

const emailService = new EmailService();
emailService.sendEmailToUser(user);
```
