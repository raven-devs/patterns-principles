// npx ts-node src/module/patterns/null-object.ts

/**
 * The intent of the Null Object pattern is to reduce the need to add checks and special behavior for handling null instances of certain variables that tend to propagate through applications. Rather, identify the behavior that should occur when a null is encountered, encapsulate this behavior into an instance of the type in question, and define this instance as a special, constant value of that type.
 */

class Customer {
  constructor(
    public name: string,
    public phoneNUmber: string,
    public orderCount: number,
  ) {}

  // To implement the Null Object pattern, an instance of Customer is created to represent the case of a "not found" customer
  static NullObjectCustomer(): Customer {
    return new Customer('', '', 0);
  }
}

const customers: Customer[] = [
  new Customer('Customer1', '+3834343434', 12),
  new Customer('customer2', '+49343535', 22),
];

class CustomerManager1 {
  getByPhoneNumber(phoneNumber: string): Customer | undefined {
    return customers.find((customer) => customer.phoneNUmber === phoneNumber);
  }
}
class CustomerManager2 {
  getByPhoneNumber(phoneNumber: string): Customer {
    const customer = customers.find((customer) => customer.phoneNUmber === phoneNumber);
    return customer ?? Customer.NullObjectCustomer();
  }
}

function clientFn1() {
  // to process the customer object we need to check for undefined first
  const customer = new CustomerManager1().getByPhoneNumber('+56454545');
  const customerOrderCount1 = customer ? customer.orderCount : 0;
  console.log({ customerOrderCount1 });
}

function clientFn2() {
  // the customer object will be returned always
  const customer = new CustomerManager2().getByPhoneNumber('+56454545');
  const customerOrderCount2 = customer.orderCount;
  console.log({ customerOrderCount2 });
}

function main() {
  clientFn1();
  clientFn2();
}

main();

export {};
