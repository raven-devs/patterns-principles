// npx ts-node src/module/patterns/creational/singleton/singleton-01.ts

/**
 * Singleton Design Pattern
 *
 * Intent: Lets you ensure that a class has only one instance, while providing a global access point to this instance.
 *
 * Use cases:
 * - Global variables. You are using global variables to keep data that should be accessible by many parts of your system, for example: data cache or system wide configuration settings. Encapsulating all those resources inside one class you can modify those resources from outside the class and be sure that there is always a single value of each of those properties. And even if some other part of your application is changing the property value, it will remain same for the next part of the application, which is using it. (Gloabal variables usage is not recommended).
 - Shared resources. You want to ensure a single access point to a shared resource. For example, you are accesing a file system resource or a network resource (writing to a file on a hard drive disk). That can help with such issues when multimple users are trying to write to a single file.
 - Caching. You are caching some data and want to prevent data duplication in the cache.
 - Logging. You are logging in different parts of an application and want to ensure the logging is consistent.
 - Configuration data. You want to make a central access to config.
 - Service proxy.You want to have a single point to access a remove server to fetch or write data.
 - Repeated initialization. Your code includes repeated expensive initialization of the same object again and again, for example - setting up a database connection.
- You cannot have duplicate instances of a same class. You observe that your system is generating multiple instances of an object and each of those instances are identical and they do not need to maintain a different state.
- Passing data to deeply nested objects. You have a single instance of data which is being created in one class and you want to pass the same instance to deeply nested other classes or child classes.
 */

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class Singleton {
  private static instance: Singleton;
  private _value: number;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public set value(value: number) {
    this._value = value;
  }

  public get value(): number {
    return this._value;
  }
}

/**
 * The client code.
 */
function main() {
  const s1 = Singleton.getInstance();
  s1.value = 12;

  const s2 = Singleton.getInstance();
  const value = s2.value;

  console.log({ value });
}

main();

export {};
