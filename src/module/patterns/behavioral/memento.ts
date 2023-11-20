/**
 * The Memento pattern - also known as the Token pattern - is used to externalize an object's internal state for restoration later, without violating encapsulation. This pattern is part of the patterns covered in Design Patterns by the Gang of Four. It is a behavioral pattern, as it allows you to add undo and replay behaviors to an object.

A memento holds an object's internal state to be retrieved later. Think of this like save points in a video game, stacks for tracking changes, or commits in source control. The key thing to note with the Memento pattern is that it captures an object's internal state without violating encapsulation.

This pattern is best suited for cases where objects need to be restored to a particular state.
*/

// Originator: The object whose state needs to be saved
class Originator {
  private _state = '';

  get state() {
    return this._state;
  }

  set state(value: string) {
    this._state = value;
    console.log('State set to ' + this._state);
  }

  // Creates a memento with the current state
  captureMemento(): Memento {
    return new Memento(this._state);
  }

  // Set the memento to a specific state
  restoreMemento(memento: Memento): void {
    this._state = memento.state;
    console.log('State restored to: ' + this._state);
  }
}

// Memento: Stores the internal state of the Originator
class Memento {
  private _state: string;

  constructor(state: string) {
    this._state = state;
  }

  get state() {
    return this._state;
  }
}

// MementoManager: Manages and keeps track of multiple mementos
class MementoManager {
  mementos: Memento[] = [];

  commit(memento: Memento) {
    this.mementos.push(memento);
  }

  get(index: number): Memento {
    return this.mementos[index];
  }
}

function main() {
  // Create an originator
  const originator = new Originator();

  // Create a MementoManager to manage mementos
  const mementoManager = new MementoManager();

  // Set the initial state and save it in a memento
  originator.state = 'State 1';
  mementoManager.commit(originator.captureMemento());

  // Change the state and save it in another memento
  originator.state = 'State 2';
  mementoManager.commit(originator.captureMemento());

  // Restore the state from the first memento
  originator.restoreMemento(mementoManager.get(0));
}

main();

export {};
