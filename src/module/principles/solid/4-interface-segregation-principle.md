# Interface Segregation Principle (ISP)

The Interface Segregation Principle (ISP) states that clients should not be forced to depend on methods that they do not use. Interfaces should belong to clients, not to libraries or hierarchies. Application developers should favor thin, focused interfaces to "fat" interfaces that offer more functionality than a particular class or method needs. In other words, a class should only be required to implement the methods that are relevant to its behavior.

Consider an interface like this one:

```typescript
interface Membership {
  login(username: string, password: string): boolean;
  logout(username: string): void;
  register(username: string, password: string, email: string): string;
  forgotPassword(username: string): void;
}
```

It's easy to imagine such an interface growing completely out of control and having more functionality than any one class would ever require. To keep, say, a login form from having more methods on it than it needs, you could create a login-specific interface, and have the existing interface extend from it:

```typescript
interface Login {
  login(username: string, password: string): boolean;
  logout(username: string): void;
}

interface Membership extends Login {
  register(username: string, password: string, email: string): string;
  forgotPassword(username: string): void;
}
```

Ideally, your thin interfaces should be cohesive, meaning they have groups of operations that logically belong together. This will prevent you from ending up with one-interface-per-method most of the time in real-world systems (as opposed to the above trivial example).

Create a custom interface that extends a base interface, and we’re using that one to bind our implementation. That way, we keep our base interface clean and we can add custom methods on our custom interfaces.

The dependency inversion principle promotes the use of small, specific interfaces that only expose the methods that are needed by the high-level module. This can help you adhere to the interface segregation principle by not forcing the high-level module to depend on unnecessary methods.

In TypeScript, you can follow the Interface Segregation Principle by creating specific interfaces for different functionalities, rather than having a single large interface that includes all methods.

```typescript
// Example without following ISP
interface Worker {
  work(): void;
  takeBreak(): void;
}

class OfficeWorker implements Worker {
  work(): void {
    console.log('Office worker is working');
  }

  takeBreak(): void {
    console.log('Office worker is taking a break');
  }
}

class Robot implements Worker {
  work(): void {
    console.log('Robot is working');
  }

  takeBreak(): void {
    console.log('Robot cannot take a break'); // Violates ISP
  }
}

// Example following ISP
// Separate interfaces for work and break behaviors
interface Workable {
  work(): void;
}

interface Breakable {
  takeBreak(): void;
}

class OfficeWorker implements Workable, Breakable {
  work(): void {
    console.log('Office worker is working');
  }

  takeBreak(): void {
    console.log('Office worker is taking a break');
  }
}

class Robot implements Workable {
  work(): void {
    console.log('Robot is working');
  }
}

// Client code
function performWork(worker: Workable): void {
  worker.work();
}

function takeBreak(worker: Breakable): void {
  worker.takeBreak();
}

const officeWorker = new OfficeWorker();
const robot = new Robot();

performWork(officeWorker); // Output: Office worker is working
takeBreak(officeWorker); // Output: Office worker is taking a break

performWork(robot); // Output: Robot is working
// takeBreak(robot);          // This line would cause a compilation error since robots cannot take a break
```
