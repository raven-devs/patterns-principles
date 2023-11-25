// The base command class defines the common interface for all
// concrete commands.
abstract class Command {
  protected app: Application;
  protected editor: Editor;
  protected backup: string;

  constructor(app: Application, editor: Editor) {
    this.app = app;
    this.editor = editor;
  }

  // Make a backup of the editor's state.
  saveBackup() {
    this.backup = this.editor.text;
  }

  // Restore the editor's state.
  undoBackup() {
    this.editor.text = this.backup;
  }

  // The execution method is declared abstract to force all
  // concrete commands to provide their own implementations.
  // The method must return true or false depending on whether
  // the command changes the editor's state.
  abstract execute(): boolean;
}

class CopyCommand extends Command {
  constructor(app: Application, editor: Editor) {
    super(app, editor);
  }

  // The copy command isn't saved to the history since it
  // doesn't change the editor's state.
  execute(): boolean {
    this.app.clipboard = this.editor.getSelection();
    return false;
  }
}

class CutCommand extends Command {
  constructor(app: Application, editor: Editor) {
    super(app, editor);
  }

  // The cut command does change the editor's state, therefore
  // it must be saved to the history. And it'll be saved as
  // long as the method returns true.
  execute(): boolean {
    this.saveBackup();
    this.app.clipboard = this.editor.getSelection();
    this.editor.deleteSelection();
    return true;
  }
}

class PastCommand extends Command {
  constructor(app: Application, editor: Editor) {
    super(app, editor);
  }

  execute(): boolean {
    this.saveBackup();
    this.editor.replaceSelection(this.app.clipboard);
    return true;
  }
}

class UndoCommand extends Command {
  constructor(app: Application, editor: Editor) {
    super(app, editor);
  }

  execute(): boolean {
    this.app.undo();
    return false;
  }
}

// The global command history is just a stack.
class CommandHistory {
  private history: Command[];

  push(command: Command) {
    // ...
  }

  pop(): Command | null {
    // ...
    return null;
  }
}

// The editor class has actual text editing operations. It plays
// the role of a receiver: all commands end up delegating
// execution to the editor's methods.
class Editor {
  text: string;

  getSelection(): string {
    //...
    return '';
  }

  deleteSelection(): void {
    //...
  }

  replaceSelection(data: string): void {
    //...
  }
}

class Button {
  setCommand(fn: () => void): void {
    //...
  }
}

class Shortcuts {
  onKeyPress(shorcut: string, fn: () => void): void {
    //...
  }
}

// The application class sets up object relations. It acts as a
// sender: when something needs to be done, it creates a command
// object and executes it.
class Application {
  clipboard: string;
  editors: Editor[] = [new Editor(), new Editor()];
  activeEditor: Editor = new Editor();
  history: CommandHistory;

  // The code which assigns commands to UI objects may look
  // like this.
  createUI() {
    //...
    const copy = () => {
      this.executeCommand(new CopyCommand(this, this.activeEditor));
    };

    const copyButton = new Button();
    const shortcuts = new Shortcuts();

    copyButton.setCommand(copy);
    shortcuts.onKeyPress('Ctrl+C', copy);

    const cut = () => {
      this.executeCommand(new CutCommand(this, this.activeEditor));
    };

    const cutButton = new Button();
    cutButton.setCommand(cut);
    shortcuts.onKeyPress('Ctrl+X', cut);

    //...
  }

  // Execute a command and check whether it has to be added to
  // the history.
  executeCommand(command: Command) {
    if (command.execute()) {
      this.history.push(command);
    }
  }

  // Take the most recent command from the history and run its
  // undo method. Note that we don't know the class of that
  // command. But we don't have to, since the command knows
  // how to undo its own action.
  undo() {
    const command = this.history.pop();
    if (command !== null) {
      command.undoBackup();
    }
  }
}

export {};
