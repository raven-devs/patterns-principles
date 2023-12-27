// npx ts-node src/module/patterns/creational/singleton/singleton-02.ts

class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public log(message: string) {
    const date = new Date();
    console.log(`[${date.toLocaleString()}]: ${message}`);
  }
}

function main() {
  // somewhere in the app
  const logger1 = Logger.getInstance();
  logger1.log('Hi there!');

  // somewhere in other part of the app
  const logger2 = Logger.getInstance();
  logger2.log('Wow!');
}

main();

export {};
