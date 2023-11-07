/**
 * The Singleton design pattern is used to ensure an application never contains more than a single instance of a given type.
 */

class Singleton {
  private static instance: Singleton;
  private data: number;

  private constructor() {
    // Initialize the singleton instance
    this.data = 0;
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public setData(data: number): void {
    this.data = data;
  }

  public getData(): number {
    return this.data;
  }
}

// Example usage of the Singleton class
const singletonInstance1 = Singleton.getInstance();
singletonInstance1.setData(42);
console.log(singletonInstance1.getData()); // Output: 42

const singletonInstance2 = Singleton.getInstance();
console.log(singletonInstance2.getData()); // Output: 42

export {};
