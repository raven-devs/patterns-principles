# Inheritance vs Composition

## Inheritance

One object can inherit from another if it has an "IS-A" relationship with the inherited object. However, this is necessary, but not sufficient. It is more appropriate to say that one object can be designed to inherit from another if it always has an "IS-SUBSTITUTABLE-FOR" relationship with the inherited object.

```typescript
// Parent class
class Animal {
  constructor(public name: string) {}

  makeSound(): void {
    console.log('Some sound');
  }
}

// Child class inheriting from the parent class - dog "IS-SUBSTITUTABLE-FOR" animal
class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  makeSound(): void {
    console.log('Woof! Woof!');
  }
}

// Using the classes
const dog = new Dog('Buddy');
console.log(dog.name);
dog.makeSound();
```

## Composition

Composition is the design technique in object-oriented programming to implement "HAS-A" relationship between objects.

```typescript
// Component class
class Engine {
  start(): void {
    console.log('Engine starting...');
  }
}

// Car class composed of Engine - car "HAS-A" engine
class Car {
  constructor(private engine: Engine) {}

  startCar(): void {
    this.engine.start();
    console.log('Car started.');
  }
}

// Using the classes
const myCar = new Car(new Engine());
myCar.startCar();
```
