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

  get engine(): Engine {
    return this._engine;
  }
}

class Driver {
  startCar(car: Car) {
    car.engine.start(); // Violates the Law of Demeter
  }
}

export {};
