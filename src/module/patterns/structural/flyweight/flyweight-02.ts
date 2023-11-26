/**
 * Flyweight pattern is to run the sharing technology to effectively support a large number of fine-grained objects, avoid the overhead of a large number of small classes with the same content (such as memory consumption), and allow everyone to share a class.
 */

class UPhone {
  constructor(model: string, screen: number, memory: number, sn: number) {}
}

// In the below code, 10,000 UPhone objects are created, and each UPhone independently applies for a memory. But if we look closely, we can see that most UPhone objects are similar, but the memory and serial number are different. If it is a program with high performance requirements, we must consider optimizing it. For scenes with a large number of similar objects, we can use the flyweight pattern to optimize it.
const uphones = [];
for (let i = 0; i < 10000; i++) {
  const memory = i % 2 == 0 ? 64 : 128;
  uphones.push(new UPhone('8U', 5.0, memory, i));
}

// There are two important concepts in flyweight pattern: internal state and external state.

// - internal state: the shared part inside the flyweight object that does not change with the change of the external environment.
// - external state: the state that cannot be shared is the external state that changes as the environment changes.

// Most of the UPhone phones in the above example have the same model, screen, and memory, so this part of the data can be shared, which is the inherent data in the flyweight model, so we define the flyweight class corresponding to the UPhone as follows:
class UPhoneFlyweight {
  constructor(
    public model: string,
    public screen: number,
    public memory: number,
  ) {}
}
// internal state (model, screen, memory): the shared part inside the flyweight object that does not change with the change of the external environment.

// In addition to flyweight classes, we also need a flyweight factory to maintain these data:
class FlyweightFactory {
  phonesMap = new Map<string, UPhoneFlyweight>();

  public get(model: string, screen: number, memory: number): UPhoneFlyweight {
    const key = model + screen + memory;
    if (!this.phonesMap.has(key)) {
      this.phonesMap.set(key, new UPhoneFlyweight(model, screen, memory));
    }
    return this.phonesMap.get(key)!;
  }
}

// Since the serial number of each UPhone is unique, this property needs to be used as an external state. Based on the UPhoneFlyweight class, let’s update the previously defined UPhone class:
class UPhone2 {
  constructor(
    public flyweight: UPhoneFlyweight,
    public sn: number,
  ) {}
}
// external state (sn): the state that cannot be shared is the external state that changes as the environment changes.

// In addition, in order to create UPhone objects more easily, we continue to define a UPhoneFactory class:
class UPhoneFactory {
  static flyweightFactory = new FlyweightFactory();

  public getUPhone(model: string, screen: number, memory: number, sn: number) {
    const flyweight: UPhoneFlyweight = UPhoneFactory.flyweightFactory.get(model, screen, memory);
    return new UPhone2(flyweight, sn);
  }
}

// With the UPhoneFactory class, we can create 10,000 UPhone objects in the following way:
const uphoneFactory = new UPhoneFactory();
const uphones2 = [];
for (let i = 0; i < 10000; i++) {
  const memory = i % 2 == 0 ? 64 : 128;
  uphones.push(uphoneFactory.getUPhone('8U', 5.0, memory, i));
}
console.log('UPhoneFlyweight count:', UPhoneFactory.flyweightFactory.phonesMap.size); // UPhoneFlyweight count: 2

// From the above results, although we created 10,000 UPhone objects, we only created two UPhoneFlyweight objects.

export {};
