// npx ts-node src/module/patterns/creational/builder.ts

/**
 * The Builder design pattern is a creational pattern, similar to the Factory pattern (Factory Method, Abstract
 * Factory). Unlike the Factory pattern, which typically only offers one method for creating an object, the Builder
 * pattern offers multiple methods that can be used to gradually define the characteristics of the type to be created.
 * This provides a more flexible interface than a single method with a large number of parameters or a complex parameter
 * object.
 */

class Address {
  constructor(
    public street?: string,
    public city?: string,
    public country?: string,
  ) {}
}

class AddressBuilder {
  private _address: Address = new Address();

  withStreet(street: string): AddressBuilder {
    this._address.street = street;
    return this;
  }

  withCity(city: string): AddressBuilder {
    this._address.city = city;
    return this;
  }

  withCountry(country: string): AddressBuilder {
    this._address.country = country;
    return this;
  }

  build(): Address {
    return this._address;
  }
}

function main() {
  const address: Address = new AddressBuilder().withStreet('Grand Av.').withCity('New York').withCountry('USA').build();
  console.log({ address });
}

main();

export {};
