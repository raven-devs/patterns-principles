/**
 * The Command Design Pattern is a behavioral design pattern that turns a request into a standalone object containing all information about the request. This object can be passed, stored, and executed later.
 */

// Command interface
interface Command {
  execute(): void;
}

// Concrete command
class LightOnCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOn();
  }

  // As with any other object, a command can be serialized, which means converting it to a string that can be easily written to a file or a database. Later, the string can be restored as the initial command object. Thus, you can delay and schedule command execution. But there’s even more! In the same way, you can queue, log or send commands over the network.
  serialize(): string {
    return JSON.stringify({
      type: 'LightOnCommand',
      lightState: 'on',
    });
  }
}

// Another concrete command
class LightOffCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOff();
  }

  serialize(): string {
    return JSON.stringify({
      type: 'LightOffCommand',
      lightState: 'off',
    });
  }
}

// Receiver
class Light {
  turnOn(): void {
    console.log('Light is ON');
  }

  turnOff(): void {
    console.log('Light is OFF');
  }
}

// Invoker
class RemoteControl {
  private command: Command | null = null;

  setCommand(command: Command): void {
    this.command = command;
  }

  pressButton(): void {
    if (this.command) {
      this.command.execute();
    } else {
      console.log('No command assigned');
    }
  }
}

// Client code
const serializedCommands: string[] = [];

const light = new Light();
const lightOnCommand = new LightOnCommand(light);
const lightOffCommand = new LightOffCommand(light);

const remote = new RemoteControl();

remote.setCommand(lightOnCommand);
remote.pressButton(); // Light is ON
serializedCommands.push(lightOnCommand.serialize());

remote.setCommand(lightOffCommand);
remote.pressButton(); // Light is OFF
serializedCommands.push(lightOffCommand.serialize());

console.log({ serializedCommands });

export {};
