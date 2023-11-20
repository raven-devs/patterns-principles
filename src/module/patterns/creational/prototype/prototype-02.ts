abstract class Shape {
  x: number;
  y: number;
  color: string;

  constructor(source?: Shape) {
    if (source) {
      this.x = source.x;
      this.y = source.y;
      this.color = source.color;
    }
  }

  abstract clone(): Shape;
}

// Concrete prototype. The cloning method creates a new object
// in one go by calling the constructor of the current class and
// passing the current object as the constructor's argument.
// Performing all the actual copying in the constructor helps to
// keep the result consistent: the constructor will not return a
// result until the new object is fully built; thus, no object
// can have a reference to a partially-built clone.
class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(source?: Rectangle) {
    // A parent constructor call is needed to copy private
    // fields defined in the parent class.
    super(source);

    if (source) {
      this.width = source.width;
      this.height = source.height;
    }
  }

  clone(): Shape {
    return new Rectangle(this);
  }
}

class Circle extends Shape {
  radius: number;

  constructor(source?: Circle) {
    super(source);

    if (source) {
      this.radius = source.radius;
    }
  }

  clone(): Shape {
    return new Circle(this);
  }
}

class Application {
  private shapes: Shape[];

  constructor() {
    const circle = new Circle();
    circle.x = 10;
    circle.y = 10;
    circle.radius = 20;
    this.shapes.push(circle);

    const anotherCircle = circle.clone();
    this.shapes.push(anotherCircle);
    // The `anotherCircle` variable contains an exact copy
    // of the `circle` object.

    const rectangle = new Rectangle();
    rectangle.width = 10;
    rectangle.height = 20;
    this.shapes.push(rectangle);
  }

  businessLogic() {
    // Prototype rocks because it lets you produce a copy of
    // an object without knowing anything about its type.
    const shapesCopy: Shape[] = [];

    // For instance, we don't know the exact elements in the
    // shapes array. All we know is that they are all
    // shapes. But thanks to polymorphism, when we call the
    // `clone` method on a shape the program checks its real
    // class and runs the appropriate clone method defined
    // in that class. That's why we get proper clones
    // instead of a set of simple Shape objects.
    this.shapes.forEach((shape) => {
      shapesCopy.push(shape.clone());
    });
  }
}

export {};
