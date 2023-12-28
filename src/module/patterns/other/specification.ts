/**
 * The Specification Pattern is a design pattern used in software development to enable the creation of business logic that is easily composable, maintainable, and testable. It allows the encapsulation of complex business rules in a way that they can be combined using logical operators. This pattern is particularly useful in domains where complex business rules govern the selection of entities or objects.
 */

// Interface for the specification
interface Specification<T> {
  isSatisfied(item: T): boolean;
}

// Example concrete specification
class AgeSpecification implements Specification<Person> {
  constructor(
    private minAge: number,
    private maxAge: number,
  ) {}

  isSatisfied(person: Person): boolean {
    return person.age >= this.minAge && person.age <= this.maxAge;
  }
}

// Example entity
class Person {
  constructor(
    public name: string,
    public age: number,
  ) {}
}

// Example usage of the Specification pattern
const persons: Person[] = [new Person('Alice', 25), new Person('Bob', 30), new Person('Charlie', 20)];

const ageSpec = new AgeSpecification(20, 30);
const filteredPersons = persons.filter((person) => ageSpec.isSatisfied(person));
console.log(filteredPersons);

export {};
