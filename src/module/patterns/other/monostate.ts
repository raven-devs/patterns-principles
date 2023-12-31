/**
 * The Monostate Pattern is a design pattern similar to Singleton but instead of having a single instance of a class, it ensures that all instances of the class share the same state. This is typically achieved by using static fields to hold state information.
 * 
 * In the Monostate Pattern all data members are static. Consequentially, all instances of the class use the same data. The member function to access the data are non-static. Users of the instances are unaware of the singleton-like behavior of the class.

 * 
 * In this example, the MonoState class uses a private static field commonState to store the state. This field is shared by all instances of the class. The state getter and setter allow for manipulating this shared state. When you change the state through any instance, it affects all instances, as they all reference the same commonState.
 */

class MonoState {
  private static commonState: any;

  constructor() {
    if (!MonoState.commonState) {
      MonoState.commonState = {};
    }
  }

  set state(value: any) {
    MonoState.commonState = value;
  }

  get state() {
    return MonoState.commonState;
  }
}

// Usage
const instance1 = new MonoState();
const instance2 = new MonoState();

instance1.state = { key: 'value' };
console.log(instance2.state); // Outputs: { key: 'value' }

export {};
