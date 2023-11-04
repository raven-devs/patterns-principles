class Company {
  private deparments: Department[] = [new Department('dep1'), new Department('dep2'), new Department('dep3')];

  constructor(private name: string) {}

  getDepartmentManagerByDepartmentCode() {
    const departmentManagerByDepartmentCode = new Map<string, string>();

    this.deparments.forEach((department) => {
      const departmentCode = department.getCode();

      // violates the LoD!!!
      // While writing new code, we should only use objects that are directly available. It means only the ones that
      // are defined within the current class or provided as arguments to the method.
      // In the Company class, we store a list of Department, so we should only invoke methods from this class.
      // How to get the name for a department manager, when we can only invoke methods on Department itself?
      // From the code point of view, we should not even know that returning a manager's name is possible. We need
      // to delegate it. See src/module/patterns/law-of-demeter-good.ts for the solution.
      const managerFullName = department.getManager().getFullName();

      departmentManagerByDepartmentCode.set(departmentCode, managerFullName);
    });

    return departmentManagerByDepartmentCode;
  }
}

class Department {
  constructor(private code: string) {}

  getCode(): string {
    return this.code;
  }

  getManager(): Employee {
    return new Employee(`${this.code}-firstname`, `${this.code}-lastname`);
  }
}

class Employee {
  constructor(
    private firstName: string,
    private lastName: string,
  ) {}

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

const company = new Company('com1');
const result = company.getDepartmentManagerByDepartmentCode();
console.log({ result });

export {};
