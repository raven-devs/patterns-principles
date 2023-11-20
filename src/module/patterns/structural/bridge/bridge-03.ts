interface Logger {
  log(message: string): void;
}

class WarningLogger implements Logger {
  log(message: string) {
    console.warn(message);
  }
}

class InfoLogger implements Logger {
  log(message: string) {
    console.log(message);
  }
}

abstract class AbstractAccount {
  private logger: Logger = new InfoLogger();

  setLogger(logger: Logger) {
    this.logger = logger;
  }

  // the logging part is delegated to the Logger implementation
  protected operate(message: string, result: boolean) {
    this.logger.log(`${message} result ${result}`);
  }
}

class SimpleAccount extends AbstractAccount {
  private balance: number;

  constructor(balance: number) {
    super();

    this.balance = balance;
  }

  public isBalanceLow(): boolean {
    return this.balance < 50;
  }

  withdraw(amount: number): void {
    const shouldPerform = this.balance >= amount;
    if (shouldPerform) {
      this.balance -= amount;
    }

    this.operate('withdraw ' + amount, shouldPerform);
  }
}

function main() {
  const account = new SimpleAccount(100);
  account.withdraw(75);

  if (account.isBalanceLow()) {
    // you can also change the Logger implementation at runtime
    account.setLogger(new WarningLogger());
  }

  account.withdraw(10);
  account.withdraw(100);
}
