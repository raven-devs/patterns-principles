// npx ts-node src/module/patterns/creational/factory-method-01.ts

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
 * sendDriveCommand() from the parent class, leaving only a single method behind, it is no longer the Factory Method pattern. In other words, Factory Method cannot be implemented with less than two methods in the parent class; and one must invoke the other.
 */

interface Vehicle {
  drive(): void;
}

class Car implements Vehicle {
  drive() {
    console.log('Car is driving...');
  }
}

class Bike implements Vehicle {
  drive() {
    console.log('Bike is driving...');
  }
}

abstract class VehicleRemoteOperator {
  sendDriveCommand() {
    const vehicle = this.getVehicle(); // invokes a factory method
    vehicle.drive();
  }

  protected abstract getVehicle(): Vehicle; // factory method
}

// implement a factory method in a subclass
class BikeRemoteOperator extends VehicleRemoteOperator {
  protected override getVehicle(): Vehicle {
    return new Bike();
  }
}

class CarRemoteOperator extends VehicleRemoteOperator {
  protected override getVehicle(): Vehicle {
    return new Car();
  }
}

class Client {
  constructor(private vehicleRemoteOperator: VehicleRemoteOperator) {}

  main() {
    this.vehicleRemoteOperator.sendDriveCommand();
  }
}

function main() {
  const client1 = new Client(new BikeRemoteOperator());
  client1.main();

  const client2 = new Client(new CarRemoteOperator());
  client2.main();
}

main();

export {};
