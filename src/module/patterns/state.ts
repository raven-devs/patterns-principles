// npx ts-node src/module/patterns/state.ts

/**
 * The State Design Pattern is used to model changes in the status or state of an object by delegating rules for such changes to individual objects representing each possible state. You can think of the state pattern as representing a Finite State Machine.
 */

type StateValue = 'state1' | 'state2' | 'state3' | 'state4' | 'state5';

// Interface representing a state
abstract class State {
  constructor(private _value: StateValue) {}

  get value(): StateValue {
    return this._value;
  }

  abstract getTransitions(): StateValue[];
}

// Concrete states
class State1 extends State {
  getTransitions(): StateValue[] {
    return ['state2', 'state3'];
  }
}

class State2 extends State {
  getTransitions(): StateValue[] {
    return ['state4'];
  }
}

class State3 extends State {
  getTransitions(): StateValue[] {
    return ['state1', 'state4'];
  }
}

class State4 extends State {
  getTransitions(): StateValue[] {
    return ['state1', 'state5'];
  }
}

class State5 extends State {
  getTransitions(): StateValue[] {
    return [];
  }
}

// Context class (Finite State Machine)
class StateMachine {
  private _state: State;

  constructor(state: State) {
    this._state = state;
  }

  get state(): StateValue {
    return this._state.value;
  }

  next(nextState: State): StateMachine {
    const transitions = this._state.getTransitions();
    const nextStateValue = nextState.value;

    if (transitions.length === 0) {
      const stateValue = this._state.value;
      throw new Error(`Unable to transit from ${stateValue} to any state.`);
    }

    this._state = nextState;

    return this;
  }

  transit(nextState: State): StateMachine {
    const transitions = this._state.getTransitions();
    const nextStateValue = nextState.value;

    if (!transitions.includes(nextStateValue)) {
      const stateValue = this._state.value;
      throw new Error(`Unable to transit from ${stateValue} to ${nextStateValue}, allowed: ${transitions}`);
    }

    this._state = nextState;

    return this;
  }
}

function main() {
  const state1 = new State1('state1');
  const state2 = new State2('state2');
  const state3 = new State3('state3');
  const state4 = new State4('state4');
  const state5 = new State5('state5');

  const stateMachine = new StateMachine(state1);

  stateMachine.transit(state2).transit(state4).transit(state5);
  const state = stateMachine.state;
  console.log({ state });
}

main();

export {};
