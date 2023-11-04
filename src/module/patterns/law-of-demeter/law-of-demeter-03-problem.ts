class Employee {
  private department = new Department();

  getDepartment() {
    return this.department;
  }
}

class Department {
  private manager = new Manager();

  public getManager() {
    return this.manager;
  }
}

class Manager {
  public approveExpense(expenses: Expenses) {
    console.log('Total amounts approved' + expenses.getTotal());
  }
}

class Expenses {
  constructor(
    private total: number,
    private tax: number,
  ) {}

  getTotal() {
    return this.total + this.tax;
  }
}

const expenses = new Expenses(100, 10);
const employee = new Employee();

// we have chained calls that violate the Law of Demeter. The classes are tightly coupled and cannot operate independently.
employee.getDepartment().getManager().approveExpense(expenses);

export {};
