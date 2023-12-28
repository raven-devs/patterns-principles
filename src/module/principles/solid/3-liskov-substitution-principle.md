# Liskov Substitution Principle (LSP)

The Liskov Substitution Principle (LSP) states that subtypes must be substitutable for their base types. When this principle is violated, it tends to result in a lot of extra conditional logic scattered throughout the application, checking to see the specific type of an object. This duplicate, scattered code becomes a breeding ground for bugs as the application grows.

Most introductions to object-oriented development discuss inheritance, and explain that one object can inherit from another if it has an "IS-A" relationship with the inherited object. However, this is necessary, but not sufficient. It is more appropriate to say that one object can be designed to inherit from another if it always has an "IS-SUBSTITUTABLE-FOR" relationship with the inherited object.

A very common violation of this principle is the partial implementation of interfaces or base class functionality, leaving unimplemented methods or properties to throw an exception (e.g. NotImplementedException). In code that you know is only going to be used by one client that you control, this is fine, but if such classes are going to be in a shared codebase, or worse, framework code that is shipped to third parties, such implementations should be avoided. If a given interface has more features than you require, follow the Interface Segregation Principle and create a new interface that includes only the functionality your client code requires, and which you can implement fully.

A common code smell that frequently indicates an LSP violation is the presence of type checking code within a code block that should be polymorphic. For instance, if you have a foreach loop over a collection of objects of type Foo, and within this loop there is a check to see if Foo is in fact Bar (subtype of Foo), then this is almost certainly an LSP violation. If instead you ensure Bar is in all ways substitutable for Foo, there should be no need to include such a check.

We can replace any of our objects by another one as long as they implement the same interface.

The dependency inversion principle can help you adhere to the Liskov substitution principle by allowing you to substitute different implementations of a module without affecting the high-level module.

In TypeScript, you can follow the Liskov Substitution Principle by ensuring that a subclass extends its superclass in a way that doesn't violate the behavior expected by the client code.

A subtype doesn’t automatically become substitutable for its supertype. To be substitutable, the subtype must behave like its supertype. Subtypes must be substitutable for their supertype without ever having to modify the client code. Subtypes must guarantee the behavior that their supertype class has specified for its methods and properties.

However, behavioral subtyping means that not only does a subtype provide all of the methods in the supertype, but it must adhere to the behavioral specification of the supertype. This ensures that any assumptions made by the clients about the supertype behavior are met by the subtype.

An object’s behavior is the contract that its clients can rely on. The behavior is specified by the public methods, any constraints placed on their inputs, any state changes that the object goes through, and the side effects from the execution of methods.

```typescript
// Example without following LSP
class Bird {
  walk(): void {
    console.log('Bird is walking');
  }

  fly(): void {
    console.log('Bird is flying');
  }
}

class Penguin extends Bird {
  walk(): void {
    console.log('Bird is walking');
  }

  // violating LSP
  fly(): void {
    throw new Error('Penguins cannot fly');
  }
}

// Client code
function makeBirdFly(bird: Bird): void {
  bird.fly();
}

const bird = new Bird();
const penguin = new Penguin();

makeBirdFly(bird); // Output: Bird is flying
makeBirdFly(penguin); // Output error: Penguin cannot fly (violates LSP)
```

In the example above, the Penguin class violates the Liskov Substitution Principle because it overrides the fly method from the Bird superclass to indicate that penguins cannot fly. This can lead to issues when client code expects all Bird objects to be able to fly.

## LSP Signature Rule – Method Argument Types

Parameter types in a method of a subclass should match or be more abstract than parameter types in the method of the superclass.

Example 1:

```typescript
// Superclass
class AnimalShelter {
  // The method accepts a parameter of type 'Animal'
  accommodate(animal: Animal) {
    console.log(`Accommodating an animal of type: ${animal.type}`);
  }
}

// Subclass
class SpecializedShelter extends AnimalShelter {
  // This method respects LSP. It accepts a parameter of type 'Animal' or any of its subclasses
  accommodate(animal: Animal | EndangeredSpecies) {
    console.log(`Accommodating an animal, special care for: ${animal.type}`);
  }
}

// Animal classes
class Animal {
  constructor(public type: string) {}
}

class EndangeredSpecies extends Animal {
  constructor(
    type: string,
    public conservationStatus: string,
  ) {
    super(type);
  }
}

// Function to test the shelters
function testShelter(shelter: AnimalShelter) {
  shelter.accommodate(new Animal('Generic Animal'));
  shelter.accommodate(new EndangeredSpecies('Panda', 'Vulnerable'));
}

const genericShelter = new AnimalShelter();
const specializedShelter = new SpecializedShelter();

testShelter(genericShelter); // Works with both Animal and EndangeredSpecies
testShelter(specializedShelter); // Also works with both, respecting LSP
```

Example 2:

```typescript
class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}

class FeedDog {
  feed(animal: Dog) {
    // implementation
  }
}

// BAD implementation
class FeedCat extends FeedDog {
  feed(animal: Cat) {
    // implementation
  }
}

// GOOD implementation
class FeedCat extends FeedDog {
  feed(animal: Animal) {
    // implementation
  }
}
```

## LSP Signature Rule – Return Types

The return type in a method of a subclass should match or be a subtype of the return type in the method of the superclass.

```typescript
class Animal {}
class Cat extends Animal {}
class PersanCat extends Cat {}
class BengalCat extends Cat {}

class BuyCat {
  buy(): Cat {
    return new Cat();
  }
}

// BAD implementation
class BuyPersanCat extends BuyCat {
  buy(): Animal {
    return new Animal();
  }
}

// GOOD implementation
class BuyPersanCat extends BuyCat {
  buy(): PersanCat {
    return new PersanCat();
  }
}
```

## LSP Signature Rule – Exceptions

A method in a subclass shouldn’t throw types of exceptions which the base method isn’t expected to throw.

In other words, types of exceptions should match or be subtypes of the ones that the base method is already able to throw. This rule comes from the fact that try-catch blocks in the client code target specific types of exceptions which the base method is likely to throw. Therefore, an unexpected exception might slip through the defensive lines of the client code and crash the entire application.

## LSP Methods Rule – Preconditions

A subclass should not strengthen preconditions (A precondition should be satisfied before a method can be executed).

Example 1:

```typescript
class GeneralCalculator {
  // precondition: 0 < num <= 5
  calc(num: number) {
    if (num <= 0 || num > 5) {
      throw new Error('Input out of range 1-5');
    }
    // some logic here...
  }
}

// BAD implementation
class SpecialCalculator extends GeneralCalculator {
  calc(num: number) {
    if (num <= 0 || num > 3) {
      throw new Error('Input out of range 1-3');
    }
    // some logic here...
  }
}

// GOOD implementation
class SpecialCalculator extends GeneralCalculator {
  calc(num: number) {
    if (num <= 0 || num > 10) {
      throw new Error('Input out of range 1-10');
    }
    // some logic here...
  }
}
```

Here, the precondition for the calc() method states that the num parameter value must be between 1 and 5. We have enforced this precondition with a range check inside the method. A subtype can weaken (but not strengthen) the precondition for a method it overrides. When a subtype weakens the precondition, it relaxes the constraints imposed by the supertype method.

Here, the precondition is weakened in the overridden calc() method to 0 < num <= 10, allowing a wider range of values for num. All values of num that are valid for GeneralCalculator.calc() are valid for SpecialCalculator.calc() as well. Consequently, a client of GeneralCalculator.calc() doesn’t notice a difference when it replaces GeneralCalculator with SpecialCalculator.

Conversely, when a subtype strengthens the precondition (e.g. 0 < num <= 3 in our example), it applies more stringent restrictions than the supertype. For example, values 4 & 5 for num are valid for GeneralCalculator.calc(), but are no longer valid for SpecialCalculator.calc().

This would break the client code that does not expect this new tighter constraint.

Example 2:

```text
The base method has a parameter with type number. If a sub-class overrides this method and requires that the value of an argument passed to the method should be positive (by throwing an exception if the value is negative), this strengthens the preconditions. The client code, which used to work fine when passing negative numbers into the method, now breaks if it starts working with an object of this subclass.
```

## LSP Methods Rule – Postconditions

A subclass should not weaken postconditions (A postcondition is a condition that should be met after a method is executed).

Example 1:

```typescript
abstract class Car {
  protected speed: number;

  // postcondition: speed must reduce
  protected abstract brake(): void;

  // Other methods...
}

// BAD implementation
class HybridCar extends Car {
  // Some properties and other methods...

  // postcondition: charge must increase
  protected brake(): void {
    // increase HybridCar charge
    // skip speed reduction
  }
}

// GOOD implementation
class HybridCar extends Car {
  // Some properties and other methods...

  // postcondition: speed must reduce
  // postcondition: charge must increase
  protected brake(): void {
    // increase HybridCar charge
    // apply HybridCar brake
  }
}
```

Here, the brake method of Car specifies a postcondition that the Car‘s speed must reduce at the end of the method execution. The subtype can strengthen (but not weaken) the postcondition for a method it overrides. When a subtype strengthens the postcondition, it provides more than the supertype method.

The overridden brake method in HybridCar strengthens the postcondition by additionally ensuring that the charge is increased as well. Consequently, any client code relying on the postcondition of the brake method in the Car class notices no difference when it substitutes HybridCar for Car.

Conversely, if HybridCar were to weaken the postcondition of the overridden brake method, it would no longer guarantee that the speed would be reduced. This might break client code given a HybridCar as a substitute for Car.

Example 2:

```text
Say you have a class with a method that works with a database. A method of the class is supposed to always close all opened database connections upon returning a value. You created a subclass and changed it so that database connections remain open so you can reuse them. But the client might not know anything about your intentions. Because it expects the methods to close all the connections, it may simply terminate the program right after calling the method, polluting a system with ghost database connections.
```

## LSP Properties Rule – Class Invariants

Invariants of a superclass must be preserved. All subtype methods (inherited and new) must maintain or strengthen the supertype’s class invariants. (A class invariant is an assertion concerning object properties that must be true for all valid states of the object).

Invariants are conditions in which an object makes sense. For example, invariants of a cat are having four legs, a tail, ability to meow, etc. The confusing part about invariants is that while they can be defined explicitly in the form of interface contracts or a set of assertions within methods, they could also be implied by certain unit tests and
expectations of the client code. The rule on invariants is the easiest to violate because you might misunderstand or not realize all of the invariants of a complex class. Therefore, the safest way to extend a class is to introduce new fields and methods, and not mess with any existing members of the superclass. Of course, that’s not always doable in real life.

```typescript
abstract class Car {
  protected limit: number;

  // invariant: speed < limit;
  protected speed: number;

  // postcondition: speed < limit
  protected abstract accelerate(): void;

  // Other methods...
}

// BAD implementation
class HybridCar extends Car {
  // invariant: charge >= 0;
  private charge: number;

  // postcondition: speed < limit
  protected accelerate(): void {
    // Accelerate HybridCar ensuring only charge >= 0 and skipping the speed invariant
  }

  // Other methods...
}

// GOOD implementation
class HybridCar extends Car {
  // invariant: charge >= 0;
  private charge: number;

  // postcondition: speed < limit
  protected accelerate(): void {
    // Accelerate HybridCar ensuring speed < limit and charge >= 0
  }

  // Other methods...
}
```

Here, the Car class specifies a class invariant that speed must always be below the limit.

The invariant in Car is preserved by the overridden accelerate method in HybridCar. The HybridCar additionally defines its own class invariant charge >= 0, and this is perfectly fine.

Conversely, if the class invariant is not preserved by the subtype, it breaks any client code that relies on the supertype.

## LSP Properties Rule – History Constraint

Subclass methods (inherited or new) shouldn’t allow state changes that the base class didn’t allow, or other words a subclass shouldn’t change values of private fields of the superclass.

```typescript
abstract class Car {
  // Allowed to be set once at the time of creation.
  // Value can only increment thereafter.
  // Value cannot be reset.
  protected mileage: number;

  public Car(mileage: number) {
    this.mileage = mileage;
  }

  // Other properties and methods...
}

// BAD implementation
class ToyCar extends Car {
  public reset(): void {
    this.mileage = 0;
  }

  // Other properties and methods
}
```

Here, the Car class specifies a constraint on the mileage property. The mileage property can be set only once at the time of creation and cannot be reset thereafter. The ToyCar has an extra method reset that resets the mileage property. In doing so, the ToyCar ignored the constraint imposed by its parent on the mileage property. This breaks any client code that relies on the constraint. So, ToyCar isn’t substitutable for Car.

Similarly, if the base class has an immutable property, the subclass should not permit this property to be modified.
