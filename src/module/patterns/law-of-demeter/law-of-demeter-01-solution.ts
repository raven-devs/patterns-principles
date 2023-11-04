class Company {
  private deparments: Department[] = [new Department('dep1'), new Department('dep2'), new Department('dep3')];

  constructor(private name: string) {}

  getDepartmentManagerByDepartmentCode() {
    const departmentManagerByDepartmentCode = new Map<string, string>();

    this.deparments.forEach((department) => {
      const departmentCode = department.getCode();
      const departmentManager = department.getManager();
      const managerFullName = department.getManagerFullName(departmentManager);
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

  getManagerFullName(manager: Employee): string {
    return manager.getFullName();
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
