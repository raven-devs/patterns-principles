// npx ts-node src/module/patterns-exercise/factory-method.ts

interface Engine {
  start(): void;
  stop(): void;
}

class MotorEngine implements Engine {
  start(): void {
    console.log('MotorEngine start');
  }

  stop(): void {
    console.log('MotorEngine stop');
  }
}

interface MotorVehicle {
  start(): void;
  stop(): void;
  moveForward(): void;
  moveBackward(): void;
  turnLeft(): void;
  turnRight(): void;
}

class Car implements MotorVehicle {
  private engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  start(): void {
    this.engine.start();
    console.log('car start');
  }

  stop(): void {
    this.engine.stop();
    console.log('car stop');
  }

  moveForward(): void {
    console.log('car move forward');
  }

  moveBackward(): void {
    console.log('car move backward');
  }

  turnLeft(): void {
    console.log('car turn left');
  }

  turnRight(): void {
    console.log('car turn right');
  }
}

class Bus implements MotorVehicle {
  private engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  start(): void {
    this.engine.start();
    console.log('bus start');
  }

  stop(): void {
    this.engine.stop();
    console.log('bus stop');
  }

  moveForward(): void {
    console.log('bus move forward');
  }

  moveBackward(): void {
    console.log('bus move backward');
  }

  turnLeft(): void {
    console.log('bus turn left');
  }

  turnRight(): void {
    console.log('bus turn right');
  }
}

abstract class MotorVehicleAutoPilot {
  moveToRouteEndpoint() {
    const vehicle = this.getVehicle();
    vehicle.start();
    vehicle.moveForward();
    vehicle.turnLeft();
    vehicle.moveForward();
    vehicle.turnLeft();
    vehicle.moveForward();
    vehicle.turnRight();
    vehicle.moveForward();
    vehicle.stop();
  }

  protected abstract getVehicle(): MotorVehicle;
}

class CarAutoPilot extends MotorVehicleAutoPilot {
  protected getVehicle(): MotorVehicle {
    const carEngine = new MotorEngine();
    return new Car(carEngine);
  }
}

class BusAutoPilot extends MotorVehicleAutoPilot {
  protected getVehicle(): MotorVehicle {
    const busEngine = new MotorEngine();
    return new Bus(busEngine);
  }
}

function main() {
  const useAutoPilot = (autoPilot: MotorVehicleAutoPilot) => {
    autoPilot.moveToRouteEndpoint();
  };

  useAutoPilot(new CarAutoPilot());
  useAutoPilot(new BusAutoPilot());
}

main();

export {};
