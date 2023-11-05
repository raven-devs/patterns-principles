/**
 * We encapsulate the Engine logic within the Car class, thereby adhering to the Law of Demeter. Note that in the new
 * design, the presence of Engine is no longer exposed, allowing future versions or subclasses of Car to rely on a
 * Battery instead of an internal combustion engine, for example.
 */

class Engine {
  start() {
    console.log('Engine start');
  }
}

class Car {
  private _engine: Engine;

  constructor(engine: Engine) {
    this._engine = engine;
  }

  start() {
    this._engine.start();
  }
}

class Driver {
  startCar(car: Car) {
    car.start();
  }
}

export {};
