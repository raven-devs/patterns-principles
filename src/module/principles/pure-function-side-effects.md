# Pure functions and side effects

Pure function is a function without side effects. It means that function will always no matter what return the same result with the same arguments.

Inpure function example:

```javascript
let tax = 20;

const calculatePriceWithTax = (productPrice) => {
  return (productPrice * tax) / 100 + productPrice;
};
```

This is the typical example of bad impure code. So here we define tax outside of our calculatePriceWithTax function. But then we use this variable inside. Using variables from outside of the functions is one of the ways to make our function impure. It is bad. Why? Because our function will produce different result in different time because when this property outside will be changed we might be not aware of that.

But it's not the only case of impure code. Using Math.random or new Date() is also a side effect as every usage of them generates new data. Which means they can't return the same result on the second call.

```javascript
const isImpure = () => {
  return Math.random();
};
```

```javascript
const isImpure = () => {
  return new Date();
};
```

But returning the same result is not the only rule of pure functions. Pure functions are not allowed to mutate external state.

```javascript
const addToCart = (cart, item, quantity) => {
  cart.items.push({
    item,
    quantity,
  });
  return cart;
};
```

## What are side effects?

Side effects is something that makes our function impure by default. Any asynchronous processes or working with things outside of Javascript are side effects.Typical examples of side effects are:

- Working with API
- Working with Localstorage
- Reading or updating DOM tree
- Using web sockets
- Printing data on screen
- Writing data in logs
