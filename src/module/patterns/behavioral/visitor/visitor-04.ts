/**
 * We are writing an app that both draws and calculates the area of multiple types of shapes. While this example might not feel very life like, we could face similar issues when working with any type of app that should be split into multiple layers or modules. Think separating some type of API from the business logic and storage.
 */

// One way to implement something like this could be to use polymorphism.

interface Shape {
  area(): number;
  draw(): void;
  log(): void;
}

class Circle implements Shape {
  constructor(private readonly radius: number) {}

  area(): number {
    return Math.pow(this.radius, 2) * Math.PI;
  }

  draw(): void {
    console.log('Drawing a circle');
  }

  log(): void {
    console.log('Logging a circle');
  }
}

class Square implements Shape {
  constructor(private readonly sideLength: number) {}

  area(): number {
    return Math.pow(this.sideLength, 2);
  }

  draw(): void {
    console.log('Drawing a square');
  }

  log(): void {
    console.log('Logging a square');
  }
}

// client code
const shapes: Shape[] = [new Circle(3), new Square(2)];

const totalArea = shapes.reduce((previous, current) => previous + current.area(), 0);

console.log(`Total area is ${totalArea}`);
shapes.forEach((shape) => shape.draw());
shapes.forEach((shape) => shape.log());

// What is nice about this solution is that we can add new shapes to the app without modifying the client code. What is not so nice is that our shape classes now have multiple responsibilities. They clearly break the single responsibility principle. Both the complexity and the number of their dependencies may quickly grow.

// To fix this, we might try to separate the drawing logic and try to inspect the type of shape there.

interface Shape2 {
  area(): number;
}

class Circle2 implements Shape2 {
  constructor(private readonly radius: number) {}

  area(): number {
    return Math.pow(this.radius, 2) * Math.PI;
  }
}

class Square2 implements Shape2 {
  constructor(private readonly sideLength: number) {}

  area(): number {
    return Math.pow(this.sideLength, 2);
  }
}

// client code
const shapes2: Shape2[] = [new Circle2(3), new Square2(2)];

const totalArea2 = shapes2.reduce((previous, current) => previous + current.area(), 0);

console.log(`Total area is ${totalArea2}`);
shapes2.forEach((shape2) => {
  if (shape2 instanceof Circle) {
    console.log('Drawing a circle');
    console.log('Logging a circle');
  }

  if (shape2 instanceof Square) {
    console.log('Drawing a square');
    console.log('Logging a square');
  }
});

// While this solves the single responsibility issue, it introduces a new one. To introduce a new Shape we would now need to go through all of the code and find all places where such distinction was being done and add a new if statement. The compiler would not be able to help us with this task. This breaks the open-closed principle.

// Let’s now use a visitor instead.

interface ShapeVisitor {
  visitCircle(circle: Circle3): void;
  visitSquare(square: Square3): void;
}

interface Shape3 {
  area(): number;
  accept(visitor: ShapeVisitor): void;
}

class Circle3 implements Shape3 {
  constructor(private readonly radius: number) {}

  area(): number {
    return Math.pow(this.radius, 2) * Math.PI;
  }

  accept(visitor: ShapeVisitor) {
    visitor.visitCircle(this);
  }
}

class Square3 implements Shape3 {
  constructor(private readonly sideLength: number) {}

  area(): number {
    return Math.pow(this.sideLength, 2);
  }

  accept(visitor: ShapeVisitor) {
    visitor.visitSquare(this);
  }
}

class ShapeDrawer implements ShapeVisitor {
  visitCircle(circle: Circle3) {
    console.log('Drawing a circle');
  }

  visitSquare(square: Square3) {
    console.log('Drawing a square');
  }
}

class ShapeLogger implements ShapeVisitor {
  visitCircle(circle: Circle3) {
    console.log('Logging a circle');
  }

  visitSquare(square: Square3) {
    console.log('Logging a square');
  }
}

// client code
const shapes3: Shape3[] = [new Circle3(3), new Square3(2)];

const totalArea3 = shapes3.reduce((previous, current) => previous + current.area(), 0);

console.log(`Total area is ${totalArea3}`);

const shapeDrawer = new ShapeDrawer();
shapes3.forEach((shape) => shape.accept(shapeDrawer));

const shapeLogger = new ShapeLogger();
shapes3.forEach((shape) => shape.accept(shapeLogger));

export {};
