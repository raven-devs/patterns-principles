/**
 * Builder is a creational design pattern that lets you construct complex objects step by step. The pattern allows you to produce different types and representations of an object using the same construction code.

The Builder pattern suggests that you extract the object construction code out of its own class and move it to separate objects called builders.

The pattern organizes object construction into a set of steps. To create an object, you execute a series of these steps on a builder object. The important part is that you don’t need to call all of the steps. You can call only those steps that are necessary for producing a particular configuration of an object.

You can go further and extract a series of calls to the builder steps you use to construct a product into a separate class called director. The director class defines the order in which to execute the building steps, while the builder provides the implementation for those steps.

Having a director class in your program isn’t strictly necessary. You can always call the building steps in a specific order directly from the client code. However, the director class might be a good place to put various construction routines so you can reuse them across your program.

In addition, the director class completely hides the details of product construction from the client code. The client only needs to associate a builder with a director, launch the construction with the director, and get the result from the builder.
 */

// Using the Builder pattern makes sense only when your products
// are quite complex and require extensive configuration. The
// following two products are related, although they don't have
// a common interface.
class Car {
  // A car can have a GPS, trip computer and some number of
  // seats. Different models of cars (sports car, SUV,
  // cabriolet) might have different features installed or
  // enabled.
}

interface Engine {
  start(): void;
  stop(): void;
}

class SportEngine implements Engine {
  start(): void {
    //
  }

  stop(): void {
    //
  }
}

class Manual {
  // Each car should have a user manual that corresponds to
  // the car's configuration and describes all its features.
}

// The builder interface specifies s for creating the
// different parts of the product objects.
interface Builder {
  reset(): void;
  setSeats(...args: any[]): void;
  setEngine(...args: any[]): void;
  setTripComputer(...args: any[]): void;
  setGPS(...args: any[]): void;
}

// The concrete builder classes follow the builder interface and
// provide specific implementations of the building steps. Your
// program may have several variations of builders, each
// implemented differently.
class CarBuilder implements Builder {
  private car: Car | null = null;

  // A fresh builder instance should contain a blank product
  // object which it uses in further assembly.
  constructor() {
    this.reset();
  }
  // The reset  clears the object being built.
  reset() {
    this.car = new Car();
  }

  // All production steps work with the same product instance.
  setSeats(...args: any[]) {
    // Set the number of seats in the car.
  }

  setEngine(...args: any[]) {
    // Install a given engine.
  }

  setTripComputer(...args: any[]) {
    // Install a trip computer.
  }

  setGPS(...args: any[]) {
    // Install a global positioning system.
  }

  // Concrete builders are supposed to provide their own
  // s for retrieving results. That's because various
  // types of builders may create entirely different products
  // that don't all follow the same interface. Therefore such
  // s can't be declared in the builder interface (at
  // least not in a statically-typed programming language).
  //
  // Usually, after returning the end result to the client, a
  // builder instance is expected to be ready to start
  // producing another product. That's why it's a usual
  // practice to call the reset  at the end of the
  // `getProduct`  body. However, this behavior isn't
  // mandatory, and you can make your builder wait for an
  // explicit reset call from the client code before disposing
  // of the previous result.
  getProduct(): Car | null {
    const product = this.car;
    this.reset();
    return product;
  }
}

// Unlike other creational patterns, builder lets you construct
// products that don't follow the common interface.
class CarManualBuilder implements Builder {
  private manual: Manual | null = null;

  constructor() {
    this.reset();
  }

  reset() {
    this.manual = new Manual();
  }

  setSeats(...args: any[]) {
    // Document car seat features.
  }

  setEngine(...args: any[]) {
    // Add engine instructions.
  }

  setTripComputer(...args: any[]) {
    // Add trip computer instructions.
  }

  setGPS(...args: any[]) {
    // Add GPS instructions.
  }

  getProduct(): Manual | null {
    // Return the manual and reset the builder.}
    return this.manual;
  }
}

// The director is only responsible for executing the building
// steps in a particular sequence. It's helpful when producing
// products according to a specific order or configuration.
// Strictly speaking, the director class is optional, since the
// client can control builders directly.
class Director {
  // The director works with any builder instance that the
  // client code passes to it. This way, the client code may
  // alter the final type of the newly assembled product.
  // The director can construct several product variations
  // using the same building steps.
  buildSportsCar(builder: Builder) {
    builder.setSeats(2);
    builder.setEngine(new SportEngine());
    builder.setTripComputer(true);
    builder.setGPS(true);
  }

  buildSUV(builder: Builder) {
    //
  }
}

// The client code creates a builder object, passes it to the
// director and then initiates the construction process. The end
// result is retrieved from the builder object.
class Application {
  makeCar() {
    const director = new Director();

    const carBuilder = new CarBuilder();
    director.buildSportsCar(carBuilder);
    const car: Car | null = carBuilder.getProduct();
    console.log('A car had been built', car);

    const manualBuilder: CarManualBuilder = new CarManualBuilder();
    director.buildSportsCar(manualBuilder);

    // The final product is often retrieved from a builder
    // object since the director isn't aware of and not
    // dependent on concrete builders and products.
    const manual: Manual | null = carBuilder.getProduct();
    console.log('Manual has been created', manual);
  }
}

function main() {
  const app = new Application();
  app.makeCar();
}

main();

export {};
