# Tell, Don't Ask

The Tell, Don't Ask (TDA) principle suggests that it is better to issue an object a command do perform some operation or logic, rather than to query its state and then take some action as a result. It is related to the Flags Over Objects antipattern as well as the Anemic Domain Model antipattern. You can easily spot violations of TDA in code that queries or uses several properties of an object in order to perform some calculation. This is especially problematic when the same kind of calculation is done in many places (violating the Don't Repeat Yourself principle), but can represent a design deficiency even if it only occurs in one location in the current codebase.

Violates TDA:

```typescript
class CpuMonitor {
  private _value: number;

  get value() {
    return this._value;
  }
}

class Client {
  alertService(cpuMonitors: CpuMonitor[]) {
    cpuMonitors.forEach((cpuMonitor) => {
      if (cpuMonitor.value > 90) {
        // alert
      }
    });
  }
}
```

Refactored:

```typescript
class CpuMonitor {
  private _value: number;

  exceedsThreshold(threshold: number): boolean {
    return this._value > threshold;
  }
}

class Client {
  alertService(cpuMonitors: CpuMonitor[]) {
    cpuMonitors.forEach((cpuMonitor) => {
      if (cpuMonitor.exceedsThreshold(90))) {
        // alert
      }
    });
  }
}
```
