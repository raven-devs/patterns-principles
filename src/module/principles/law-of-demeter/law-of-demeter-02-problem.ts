class Customer {
  name: string;
  shoppingCart: ShoppingCart;

  constructor(name: string, shoppingCart: ShoppingCart) {
    this.name = name;
    this.shoppingCart = shoppingCart;
  }

  checkout() {
    const totalPrice = this.shoppingCart.calculateTotalPrice();
    console.log(`Checkout completed for ${this.name}. Total price: ${totalPrice}`);
  }
}

class ShoppingCart {
  items: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    this.items.forEach((item) => {
      // violates the LoD!!!
      // ShoppingCart should not know an internal structure of an item
      totalPrice = totalPrice + item.price;
    });
    return totalPrice;
  }
}

class Item {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

const item1 = new Item('iPhone', 1000.0);
const item2 = new Item('AirPods', 200.0);
const shoppingCart = new ShoppingCart([item1, item2]);
const customer = new Customer('John Doe', shoppingCart);
customer.checkout();

export {};
