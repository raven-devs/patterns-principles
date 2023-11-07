// npx ts-node src/module/patterns/creational/factory-method.ts

/**
 * The Factory Method pattern is an object creation pattern. It enables us to define an interface or abstract class for
 * creating an object, leaving the specific details to the implementations. The Factory Method pattern allows for loose
 * coupling and enhanced flexibility with regards to creating objects in code. It also allows you to encapsulate the
 * potential complexity of object creation.
 *
 * the Factory Method Pattern is nothing more than a specialization of the Template Method Pattern. The two patterns
 * share an identical structure. They only differ in purpose. Factory Method is creational (it builds something)
 * whereas Template Method is behavioral (it computes something).
 *
 * Note is that the Creator (parent VehicleOperator) class invokes its own factoryMethod (getVehicle()). If we remove
 * forward() from the parent class, leaving only a single method behind, it is no longer the Factory Method pattern. In
 * other words, Factory Method cannot be implemented with less than two methods in the parent class; and one must invoke
 * the other.
 */

interface Vehicle {
  drive(): void;
  stop(): void;
}

class Car implements Vehicle {
  drive() {
    console.log('Car is driving...');
  }

  stop(): void {
    console.log('Car stopped');
  }
}

class Bike implements Vehicle {
  drive() {
    console.log('Bike is driving...');
  }

  stop(): void {
    console.log('Bike stopped');
  }
}

abstract class VehicleOperator {
  forward() {
    const vehicle = this.getVehicle(); // invoke a factory method
    vehicle.drive();
  }

  protected abstract getVehicle(): Vehicle; // factory method
}

// implement a factory method in a subclass
class BikeOperator extends VehicleOperator {
  protected override getVehicle(): Vehicle {
    return new Bike();
  }
}

function main() {
  const vehicleOperator: VehicleOperator = new BikeOperator();
  vehicleOperator.forward();
}

main();

export {};
