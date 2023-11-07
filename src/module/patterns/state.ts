// npx ts-node src/module/patterns/state.ts

/**
 * The State Design Pattern is used to model changes in the status or state of an object by delegating rules for such changes to individual objects representing each possible state. You can think of the state pattern as representing a Finite State Machine.
 */

type StateValue = 'state1' | 'state2' | 'state3' | 'state4' | 'state5';

// Interface representing a state
class State {
  constructor(
    private _value: StateValue,
    private _transitions: StateValue[],
  ) {}

  get value(): StateValue {
    return this._value;
  }

  get transitions(): StateValue[] {
    return this._transitions;
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

  transit(nextState: State): StateMachine {
    const transitions = this._state.transitions;
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
  const state1 = new State('state1', ['state2', 'state3']);
  const state2 = new State('state2', ['state4']);
  const state3 = new State('state3', ['state1', 'state4']);
  const state4 = new State('state4', ['state1', 'state5']);
  const state5 = new State('state5', []);

  const stateMachine = new StateMachine(state1);

  stateMachine.transit(state2).transit(state4).transit(state5);
  const state = stateMachine.state;
  console.log({ state });
}

main();

export {};
