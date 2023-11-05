class Employee {
  private department = new Department();

  constructor(private manager: Manager) {}

  getDepartment() {
    return this.department;
  }

  submitExpense(expenses: Expenses) {
    this.manager.approveExpense(expenses);
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
const manager = new Manager();
const employee = new Employee(manager);
employee.submitExpense(expenses);

export {};
