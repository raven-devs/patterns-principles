# SOLID

## Single Responsibility

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

## Open-Closed

The Open-Closed Principle (OCP) states that software entities (classes, modules, methods, etc.) should be open for extension, but closed for modification. This means that you should be able to add new functionality to a class without altering its existing code.

In practice, this means creating software entities whose behavior can be changed without the need to edit and recompile the code itself. The simplest way to demonstrate this principle is to consider a method that does one thing. Let's say it writes to a particular file, the name of which is hard-coded into the method. If the requirements change, and the filename now needs to be different in certain situations, we must open up the method to change the filename. If, on the other hand, the filename had been passed in as a parameter, we would be able to modify the behavior of this method without changing its source, keeping it closed to modification.

The Open-Closed Principle can also be achieved in many other ways, including through the use of inheritance or through compositional design patterns like the Strategy pattern.

Since we are relying on abstractions, we don’t have to make changes on our calling code, if we wish to change an implementation.

The dependency inversion principle can help you design your code in a way that is open for extension but closed for modification. By depending on abstractions rather than concrete implementations, you can more easily extend the functionality of your code without modifying existing code.

In TypeScript, you can follow the Open-Closed Principle by using techniques such as inheritance, interfaces, and abstract classes.

```typescript
// Example without following OCP
class Rectangle {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }
}

class AreaCalculator {
  // The AreaCalculator class is closed for modification because if you want to add a new shape, you would need to modify the AreaCalculator class. This violates the Open-Closed Principle.
  calculateArea(rectangle: Rectangle): number {
    return rectangle.getWidth() * rectangle.getHeight();
  }
}

// Example following OCP
// Shape interface representing a shape with an area
interface Shape {
  calculateArea(): number;
}

// Rectangle class implements the Shape interface
class Rectangle implements Shape {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  calculateArea(): number {
    return this.width * this.height;
  }
}

// Circle class implements the Shape interface
class Circle implements Shape {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  getRadius(): number {
    return this.radius;
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

// AreaCalculator class now works with any shape that implements the Shape interface
class AreaCalculator {
  // The AreaCalculator class is open for extension. You can add new shapes by creating classes that implement the Shape interface, and the AreaCalculator class can work with any shape that adheres to this interface. This way, you can add new shapes without modifying the existing code.
  calculateArea(shape: Shape): number {
    return shape.calculateArea();
  }
}

// Client code
const rectangle = new Rectangle(5, 10);
const circle = new Circle(7);

const areaCalculator = new AreaCalculator();

console.log(areaCalculator.calculateArea(rectangle)); // Output: 50
console.log(areaCalculator.calculateArea(circle)); // Output: ~153.938...
```

## Liskov Substitution

The Liskov Substitution Principle (LSP) states that subtypes must be substitutable for their base types. When this principle is violated, it tends to result in a lot of extra conditional logic scattered throughout the application, checking to see the specific type of an object. This duplicate, scattered code becomes a breeding ground for bugs as the application grows.

Most introductions to object-oriented development discuss inheritance, and explain that one object can inherit from another if it has an "IS-A" relationship with the inherited object. However, this is necessary, but not sufficient. It is more appropriate to say that one object can be designed to inherit from another if it always has an "IS-SUBSTITUTABLE-FOR" relationship with the inherited object.

A very common violation of this principle is the partial implementation of interfaces or base class functionality, leaving unimplemented methods or properties to throw an exception (e.g. NotImplementedException). In code that you know is only going to be used by one client that you control, this is fine, but if such classes are going to be in a shared codebase, or worse, framework code that is shipped to third parties, such implementations should be avoided. If a given interface has more features than you require, follow the Interface Segregation Principle and create a new interface that includes only the functionality your client code requires, and which you can implement fully.

A common code smell that frequently indicates an LSP violation is the presence of type checking code within a code block that should be polymorphic. For instance, if you have a foreach loop over a collection of objects of type Foo, and within this loop there is a check to see if Foo is in fact Bar (subtype of Foo), then this is almost certainly an LSP violation. If instead you ensure Bar is in all ways substitutable for Foo, there should be no need to include such a check.

We can replace any of our objects by another one as long as they implement the same interface.

The dependency inversion principle can help you adhere to the Liskov substitution principle by allowing you to substitute different implementations of a module without affecting the high-level module.

In TypeScript, you can follow the Liskov Substitution Principle by ensuring that a subclass extends its superclass in a way that doesn't violate the behavior expected by the client code.

```typescript
// Example without following LSP
class Bird {
  fly(): void {
    console.log('Bird is flying');
  }
}

class Penguin extends Bird {
  // Penguins cannot fly, violating LSP
  fly(): void {
    console.log('Penguin cannot fly');
  }
}

// Client code
function makeBirdFly(bird: Bird): void {
  bird.fly();
}

const bird = new Bird();
const penguin = new Penguin();

makeBirdFly(bird); // Output: Bird is flying
makeBirdFly(penguin); // Output: Penguin cannot fly (violates LSP)
```

In the example above, the Penguin class violates the Liskov Substitution Principle because it overrides the fly method from the Bird superclass to indicate that penguins cannot fly. This can lead to issues when client code expects all Bird objects to be able to fly.

Here's an example that follows the Liskov Substitution Principle:

```typescript
// Example following LSP
class Bird {
  fly(): void {
    console.log('Bird is flying');
  }
}

class Penguin extends Bird {
  // Penguins override the swim method instead of fly
  swim(): void {
    console.log('Penguin is swimming');
  }
}

// Client code
function makeBirdFly(bird: Bird): void {
  bird.fly();
}

const bird = new Bird();
const penguin = new Penguin();

makeBirdFly(bird); // Output: Bird is flying
// makeBirdFly(penguin); // This line would cause a compilation error since penguins do not have a fly method
```

## Interface Segregation

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

## Dependency Inversion

The Dependency Inversion Principle (DIP) states that high level modules should not depend on low level modules, both should depend on abstractions. Abstractions should not depend on details. Details should depend upon abstractions. Depend upon abstractions, not concretes.

The dependency inversion principle is a design principle that states that high-level modules should depend on abstractions (interfaces / abstract classes) rather than concrete implementations (classes). This helps decouple the high-level and low-level modules, making it easier to change the low-level ones without affecting the high-level ones.

The dependency inversion principle helps us couple software modules loosely. The principle was developed after many years of coupling software modules, and it states:

- High-level modules should not import anything from low-level modules, they should both depend on abstractions.
- Abstractions should not rely on concrete implementations, concrete implementations should depend on abstractions.

By following the dependency inversion principle, you can design your application so that the high-level modules depend on abstractions rather than concrete implementations of the low-level modules.

This can make your code more flexible and easier to maintain because it reduces the coupling between components and allows you to easily change the implementation of the low-level modules without affecting the high-level modules.

We’re relying on interfaces everywhere.

The dependency inversion principle helps you design more maintainable and scalable software by promoting loose coupling between components and adhering to the SOLID principles.

In other words, this principle advocates the use of interfaces or abstract classes to define a higher-level module's interaction with lower-level modules. By doing this, you can decouple the implementation details of the higher-level modules from the lower-level modules, making the code more modular, flexible, and easier to maintain.

In TypeScript, you can follow the Dependency Inversion Principle by using interfaces or abstract classes to define abstractions and allowing high-level modules to depend on these abstractions rather than concrete implementations.

```typescript
// Example without following DIP
class LightBulb {
  turnOn(): void {
    console.log('LightBulb is on');
  }

  turnOff(): void {
    console.log('LightBulb is off');
  }
}

class Switch {
  private bulb: LightBulb;

  constructor(bulb: LightBulb) {
    this.bulb = bulb;
  }

  operate(): void {
    // Client code is tightly coupled to the LightBulb class
    if (this.bulb) {
      this.bulb.turnOn();
    } else {
      console.log('No bulb available');
    }
  }
}

// Example following DIP
// Define an abstraction for the device that can be turned on and off
interface SwitchableDevice {
  turnOn(): void;
  turnOff(): void;
}

// LightBulb class now implements the SwitchableDevice interface
class LightBulb implements SwitchableDevice {
  turnOn(): void {
    console.log('LightBulb is on');
  }

  turnOff(): void {
    console.log('LightBulb is off');
  }
}

// Switch class now depends on the SwitchableDevice interface
class Switch {
  private device: SwitchableDevice;

  constructor(device: SwitchableDevice) {
    this.device = device;
  }

  operate(): void {
    // Client code is now decoupled from the specific device implementation
    if (this.device) {
      this.device.turnOn();
    } else {
      console.log('No device available');
    }
  }
}

// Client code
const lightBulb = new LightBulb();
const switchButton = new Switch(lightBulb);

switchButton.operate(); // Output: LightBulb is on
```
