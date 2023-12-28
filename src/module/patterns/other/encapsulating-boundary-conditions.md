# Encapsulating boundary conditions

Encapsulating boundary conditions involves handling edge cases and boundary scenarios in a way that promotes code readability, maintainability, and robustness.

```typescript
// Encapsulation of boundary conditions
class Boundary {
    static ensureNonNegative(input: number): number {
        if (input < 0) {
            return 0;
        }
        return input;
    }

    static ensureInRange(input: number, min: number, max: number): number {
        if (input < min) {
            return min;
        } else if (input > max) {
            return max;
        }
        return input;
    }

    static ensureNonEmpty(input: string): string {
        if (!input || input.trim().length === 0) {
            return "Default Value";
        }
        return input;
    }
}

// Example usage of the encapsulated boundary conditions
let value1 = -5;
value1 = Boundary.ensureNonNegative(value1);
console.log(value1); // Output: 0

let value2 = 15;
value2 = Boundary.ensureInRange(value2, 0,

```
