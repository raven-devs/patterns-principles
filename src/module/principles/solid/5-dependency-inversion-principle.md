# Dependency Inversion Principle (DIP)

The Dependency Inversion Principle (DIP) states that high-level classes shouldn’t depend on low-level class-
es. Both should depend on abstractions. Abstractions shouldn’t depend on details. Details should depend on
abstractions. Depend upon abstractions, not concretes.

Low-level classes implement basic operations such as working with a disk, transferring data over a network, connecting to a database, etc.

High-level classes contain complex business logic that directs low-level classes to do something.

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
