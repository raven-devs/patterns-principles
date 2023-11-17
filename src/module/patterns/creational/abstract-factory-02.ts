// npx ts-node src/module/patterns/creational/abstract-factory-02.ts

/**
 * Abstract Factory is a creational design pattern that lets you produce families of related objects without specifying their concrete classes.
 *
 * The first thing the Abstract Factory pattern suggests is to explicitly declare interfaces for each distinct product of the product family (e.g., chair, sofa or coffee table). Then you can make all variants of products follow those interfaces.
 *
 * The next move is to declare the Abstract Factory—an interface with a list of creation methods for all products that are part of the product family.
 *
 * These methods must return abstract product types represented by the interfaces. For each variant of a product family, we create a separate factory class based on the AbstractFactory interface. A factory is a class that returns products of a particular kind.
 *
 * The client code has to work with both factories and products via their respective abstract interfaces. This lets you change the type of a factory that you pass to the client code, as well as the product variant that the client code receives, without breaking the actual client code.
 *
 * If the client is only exposed to the abstract interfaces, what creates the actual factory objects? Usually, the application creates a concrete factory object at the initialization stage. Just before that, the app must select the factory type depending on the configuration or the environment settings.
 */

// The abstract factory interface declares a set of methods that
// return different abstract products. These products are called
// a family and are related by a high-level theme or concept.
// Products of one family are usually able to collaborate among
// themselves. A family of products may have several variants,
// but the products of one variant are incompatible with the
// products of another variant.
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// Each distinct product of a product family should have a base
// interface. All variants of the product must implement this
// interface.
interface Button {
  paint(): void;
}

// Here's the base interface of another product. All products
// can interact with each other, but proper interaction is
// possible only between products of the same concrete variant.
interface Checkbox {
  paint(): void;
}

// Concrete factories produce a family of products that belong
// to a single variant. The factory guarantees that the
// resulting products are compatible. Signatures of the concrete
// factory's methods return an abstract product, while inside
// the method a concrete product is instantiated.
class WinFactory implements GUIFactory {
  createButton(): Button {
    return new WinButton();
  }

  createCheckbox(): Checkbox {
    return new WinCheckbox();
  }
}

// Each concrete factory has a corresponding product variant.
class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }

  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

// Concrete products are created by corresponding concrete
// factories.
class WinButton implements Button {
  paint() {
    // Render a button in Windows style.
  }
}

class MacButton implements Button {
  paint() {
    // Render a button in macOS style.
  }
}

// Here's the base interface of another product. All products
// can interact with each other, but proper interaction is
// possible only between products of the same concrete variant.
interface Checkbox {
  paint(): void;
}

class WinCheckbox implements Checkbox {
  paint() {
    // Render a checkbox in Windows style.
  }
}

class MacCheckbox implements Checkbox {
  paint() {
    // Render a checkbox in macOS style.
  }
}

// The client code works with factories and products only
// through abstract types: GUIFactory, Button and Checkbox. This
// lets you pass any factory or product subclass to the client
// code without breaking it.
class Application {
  private factory: GUIFactory;
  private button: Button | null = null;
  private checkbox: Checkbox | null = null;

  constructor(factory: GUIFactory) {
    this.factory = factory;
  }

  createUI() {
    this.button = this.factory.createButton();
    this.checkbox = this.factory.createCheckbox();
  }

  paint() {
    this.button?.paint();
    this.checkbox?.paint();
  }
}

function readApplicationConfigFile() {
  return {
    OS: 'Web',
  };
}

// The application picks the factory type depending on the
// current configuration or environment settings and creates it
// at runtime (usually at the initialization stage).
function main() {
  const config = readApplicationConfigFile();

  let factory: GUIFactory | null = null;
  if (config.OS == 'Windows') {
    factory = new WinFactory();
  } else if (config.OS == 'Mac') {
    factory = new MacFactory();
  } else {
    throw new Error('Error! Unknown operating system.');
  }

  const app = new Application(factory);
  app.createUI();
  app.paint();
}

main();

export {};
