/**
 * The Iterator Design Pattern provides a way to access elements of an aggregate object sequentially without exposing the underlying representation.
 */

// In this example it allows you to iterate over the elements of an aggregate (ArrayCollection) without exposing its internal details.

// Iterator interface
interface Iterator<T> {
  hasNext(): boolean;
  next(): T | undefined;
}

// Concrete Iterator
class ArrayIterator<T> implements Iterator<T> {
  private index = 0;

  constructor(private array: T[]) {}

  hasNext(): boolean {
    return this.index < this.array.length;
  }

  next(): T | undefined {
    return this.hasNext() ? this.array[this.index++] : undefined;
  }
}

// Aggregate interface
interface Aggregate<T> {
  createIterator(): Iterator<T>;
}

// Concrete Aggregate
class ArrayCollection<T> implements Aggregate<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  createIterator(): Iterator<T> {
    return new ArrayIterator(this.items);
  }
}

// Client code
const aggregate = new ArrayCollection<number>();
aggregate.addItem(1);
aggregate.addItem(2);
aggregate.addItem(3);

const iterator = aggregate.createIterator();

while (iterator.hasNext()) {
  console.log(iterator.next());
}

export {};
