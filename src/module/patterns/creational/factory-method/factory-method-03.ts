// This interface only has a method build(). This method is used to build a specific motor vehicle
interface MotorVehicle {
  build(): void;
  startEngine(): void;
  drive(): void;
}

// Implement the concrete classes that implement the MotorVehicle interface: Motorcycle and Car
class Motorcycle implements MotorVehicle {
  build(): void {
    console.log('Build Motorcycle');
  }

  startEngine(): void {
    console.log('Motorcycle engine started');
  }

  drive(): void {
    console.log('Motorcycle is driving');
  }
}

class Car implements MotorVehicle {
  build(): void {
    console.log('Build Car');
  }

  startEngine(): void {
    console.log('Car engine started');
  }

  drive(): void {
    console.log('Car is driving');
  }
}

// This class is responsible for creating every new vehicle instance. It’s an abstract class because it makes a specific vehicle for its particular factory.
abstract class MotorVehicleFactory {
  create(): MotorVehicle {
    const vehicle: MotorVehicle = this.createMotorVehicle();
    vehicle.build();
    return vehicle;
  }

  protected abstract createMotorVehicle(): MotorVehicle;
}

// The method create() calls to the abstract method createMotorVehicle() to create a specific type of motor vehicle. That’s why each particular motor vehicle factory must implement its correct MotorVehicle type. Previously, we implemented two MotorVehicle types, Motorcycle and Car. Now, we extend from our base class MotorVehicleFactory to implement both.
class MotorcycleFactory extends MotorVehicleFactory {
  protected override createMotorVehicle(): MotorVehicle {
    const motorVehicle = new Motorcycle();
    // Do something with the object after you get the object...
    return motorVehicle;
  }
}

class CarFactory extends MotorVehicleFactory {
  protected override createMotorVehicle(): MotorVehicle {
    return new Car();
  }
}

// clinet does not know what particular vehile is used - car or motorcycle, or anything elese
class VehicleOperator {
  driveVehicle(motorVehicleFactory: MotorVehicleFactory) {
    const vehicle = motorVehicleFactory.create();
    vehicle.startEngine();
    vehicle.drive();
  }
}

function main() {
  const vehicleOperator = new VehicleOperator();
  vehicleOperator.driveVehicle(new MotorcycleFactory());
  vehicleOperator.driveVehicle(new CarFactory());
}

main();

export {};
