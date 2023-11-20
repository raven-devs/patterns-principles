/**
 The Prototype design pattern is a creational pattern that is used for creating objects by cloning an existing object, known as the prototype. This pattern allows you to create new objects by copying an existing object, which can be more efficient than creating objects from scratch.
 */

interface Cloneable {
  clone(): Cloneable;
}

class ConcretePrototype implements Cloneable {
  private property1: string;
  private property2: number;

  constructor(property1: string, property2: number) {
    this.property1 = property1;
    this.property2 = property2;
  }

  clone(): Cloneable {
    // Create a new instance and copy the properties
    const newObject = new ConcretePrototype(this.property1, this.property2);
    return newObject;
  }

  // Additional methods specific to the prototype
  getProperty1(): string {
    return this.property1;
  }

  getProperty2(): number {
    return this.property2;
  }
}

// Client code
const originalObject = new ConcretePrototype('value1', 42);
const clonedObject = originalObject.clone();

console.log(originalObject.getProperty1()); // Output: value1
console.log(originalObject.getProperty2()); // Output: 42

console.log(clonedObject.getProperty1()); // Output: value1
console.log(clonedObject.getProperty2()); // Output: 42

export {};
