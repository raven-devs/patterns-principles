// The mediator interface declares a method used by components
// to notify the mediator about various events. The mediator may
// react to these events and pass the execution to other
// components.
interface Mediator {
  notify(sender: Component, event: string): void;
}

// Components communicate with a mediator using the mediator
// interface. Thanks to that, you can use the same components in
// other contexts by linking them with different mediator
// objects.
class Component {
  dialog: Mediator;

  constructor(dialog: Mediator) {
    this.dialog = dialog;
  }

  click() {
    this.dialog.notify(this, 'click');
  }

  keypress() {
    this.dialog.notify(this, 'keypress');
  }
}

// The concrete mediator class. The intertwined web of
// connections between individual components has been untangled
// and moved into the mediator.
class AuthenticationDialog implements Mediator {
  //... business logic

  notify(sender: Component, event: string): void {
    // if (sender == loginOrRegisterChkBx and event == "check")
    //         if (loginOrRegisterChkBx.checked)
    //             title = "Log in"
    //             // 1. Show login form components.
    //             // 2. Hide registration form components.
    //         else
    //             title = "Register"
    //             // 1. Show registration form components.
    //             // 2. Hide login form components
    //     if (sender == okBtn && event == "click")
    //         if (loginOrRegister.checked)
    //             // Try to find a user using login credentials.
    //             if (!found)
    //                 // Show an error message above the login
    //                 // field.
    //         else
    //             // 1. Create a user account using data from the
    //             // registration fields.
    //             // 2. Log that user in.
    //             // ...
    //...
  }
}

// Concrete components don't talk to each other. They have only
// one communication channel, which is sending notifications to
// the mediator.
class Button extends Component {
  //...
}

class Textbox extends Component {
  //...
}

class Checkbox extends Component {
  //...
  check() {
    this.dialog.notify(this, 'check');
  }
}

export {};
