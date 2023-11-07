// Interface for the strategy
interface SortingStrategy {
  sort(data: number[]): number[];
}

// Concrete strategy: Bubble sort algorithm
class BubbleSortStrategy implements SortingStrategy {
  sort(data: number[]): number[] {
    // Sorting logic here
    console.log('Sorting using the bubble sort strategy');
    return data.sort((a, b) => a - b);
  }
}

// Concrete strategy: Quick sort algorithm
class QuickSortStrategy implements SortingStrategy {
  sort(data: number[]): number[] {
    // Sorting logic here
    console.log('Sorting using the quick sort strategy');
    return this.quickSort(data);
  }

  private quickSort(data: number[]): number[] {
    if (data.length <= 1) {
      return data;
    }

    const pivot = data[0];
    const left: number[] = [];
    const right: number[] = [];

    for (let i = 1; i < data.length; i++) {
      if (data[i] < pivot) {
        left.push(data[i]);
      } else {
        right.push(data[i]);
      }
    }

    return this.quickSort(left).concat(pivot, this.quickSort(right));
  }
}

// Context class that uses the strategy
class SortingContext {
  private strategy: SortingStrategy;

  constructor(strategy: SortingStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: SortingStrategy): void {
    this.strategy = strategy;
  }

  public sortData(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}

// Example usage of the Strategy Design Pattern
const dataToSort = [5, 2, 8, 1, 9, 4, 3, 7, 6];

const bubbleSortStrategy = new BubbleSortStrategy();
const quickSortStrategy = new QuickSortStrategy();

const sortingContext = new SortingContext(bubbleSortStrategy);

console.log('Using the bubble sort strategy:');
console.log(sortingContext.sortData(dataToSort));

sortingContext.setStrategy(quickSortStrategy);
console.log('Using the quick sort strategy:');
console.log(sortingContext.sortData(dataToSort));

export {};
