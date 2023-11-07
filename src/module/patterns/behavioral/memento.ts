/**
 * The Memento pattern - also known as the Token pattern - is used to externalize an object's internal state for restoration later, without violating encapsulation. This pattern is part of the patterns covered in Design Patterns by the Gang of Four. It is a behavioral pattern, as it allows you to add undo and replay behaviors to an object.

A memento holds an object's internal state to be retrieved later. Think of this like save points in a video game, stacks for tracking changes, or commits in source control. The key thing to note with the Memento pattern is that it captures an object's internal state without violating encapsulation.

This pattern is best suited for cases where objects need to be restored to a particular state.

There are three key classes to the memento pattern - Originator, MementoManager, and Memento.

The Memento class holds state (state). This is accessible through two methods - GetState() and SetState().
The Originator class has the state (state) to be stored in the memento. It can create mementos with CreateMemento(). It can also set a memento with SetMemento(Memento m).
The MementoManager class is responsible for the safekeeping and does not perform work on a memento.

These classes work in the following way:

The MementoManager requests a memento for the originator with CreateMemento().
The originator creates a new memento through new Memento().
The originator sets the state of the memento using SetState().
If the object needs to be restored to a previous state, the MementoManager will pass the request to the originator using SetMemento(memento).
The originator gets the previous state using GetState().

The goal is to keep the mementos small. Also, the MementoManager only deals with the memento through the originator. The MementoManager never directly changes a memento. The MementoManager only tracks the previous states. The originator handles the creation and restoring of mementos.
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
