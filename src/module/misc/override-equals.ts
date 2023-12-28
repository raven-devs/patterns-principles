// npx ts-node src/module/bestPracticies/override-equals.ts

class Employee {
  constructor(
    public name: string,
    public age: number,
    public height: number,
    public weight: number,
  ) {}

  equals(otherEmployee: Employee) {
    return (
      this.name === otherEmployee.name &&
      this.age === otherEmployee.age &&
      this.height === otherEmployee.height &&
      this.weight === otherEmployee.weight
    );
  }
}

function main() {
  const employee1 = new Employee('Jack London', 22, 182, 82);
  const employee2 = new Employee('Jack London', 22, 182, 82);

  // returns false
  if (employee1 === employee2) {
    console.log('result1: Employees are equal');
  } else {
    console.log('result1: Employees are not equal');
  }

  // returns true
  if (employee1.equals(employee2)) {
    console.log('result2: Employees are equal');
  } else {
    console.log('result2: Employees are not equal');
  }
}

main();

export {};
