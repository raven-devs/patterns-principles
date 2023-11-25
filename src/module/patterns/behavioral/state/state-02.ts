// The AudioPlayer class acts as a context. It also maintains a
// reference to an instance of one of the state classes that
// represents the current state of the audio player.
class AudioPlayer {
  state: State;
  UI: any;
  volume: number;
  playlist: any;
  currentSong: any;
  playing: boolean;

  constructor() {
    this.state = new ReadyState(this);

    // Context delegates handling user input to a state
    // object. Naturally, the outcome depends on what state
    // is currently active, since each state can handle the
    // input differently.
    this.UI = new UserInterface();
    this.UI.lockButton.onClick(this.clickLock);
    this.UI.playButton.onClick(this.clickPlay);
    this.UI.nextButton.onClick(this.clickNext);
    this.UI.prevButton.onClick(this.clickPrevious);
  }

  // Other objects must be able to switch the audio player's
  // active state.
  changeState(state: State) {
    this.state = state;
  }

  // UI methods delegate execution to the active state.
  clickLock() {
    this.state.clickLock();
  }

  clickPlay() {
    this.state.clickPlay();
  }

  clickNext() {
    this.state.clickNext();
  }

  clickPrevious() {
    this.state.clickPrevious();
  }

  // A state may call some service methods on the context.
  startPlayback() {
    // ...
  }

  stopPlayback() {
    // ...
  }

  nextSong() {
    // ...
  }

  previousSong() {
    // ...
  }

  fastForward(time: any) {
    // ...
  }

  rewind(time: any) {
    // ...
  }
}

// The base state class declares methods that all concrete
// states should implement and also provides a backreference to
// the context object associated with the state. States can use
// the backreference to transition the context to another state.
abstract class State {
  protected player: AudioPlayer;

  // Context passes itself through the state constructor. This
  // may help a state fetch some useful context data if it's
  // needed.
  constructor(player: AudioPlayer) {
    this.player = player;
  }

  abstract clickLock(): void;
  abstract clickPlay(): void;
  abstract clickNext(): void;
  abstract clickPrevious(): void;
}

// Concrete states implement various behaviors associated with a
// state of the context.
class LockedState extends State {
  // When you unlock a locked player, it may assume one of two
  // states.
  clickLock() {
    if (this.player.playing) {
      this.player.changeState(new PlayingState(this.player));
    } else {
      this.player.changeState(new ReadyState(this.player));
    }
  }

  clickPlay() {
    // Locked, so do nothing.
  }

  clickNext() {
    // Locked, so do nothing.
  }

  clickPrevious() {
    // Locked, so do nothing.
  }
}

// They can also trigger state transitions in the context.
class ReadyState extends State {
  clickLock() {
    this.player.changeState(new LockedState(this.player));
  }

  clickPlay() {
    this.player.startPlayback();
    this.player.changeState(new PlayingState(this.player));
  }

  clickNext() {
    this.player.nextSong();
  }

  clickPrevious() {
    this.player.previousSong();
  }
}

class PlayingState extends State {
  clickLock() {
    this.player.changeState(new LockedState(this.player));
  }

  clickPlay() {
    this.player.stopPlayback();
    this.player.changeState(new ReadyState(this.player));
  }

  clickNext() {
    if (event.doubleclick) {
      this.player.nextSong();
    } else {
      this.player.fastForward(5);
    }
  }

  clickPrevious() {
    if (event.doubleclick) {
      this.player.previous();
    } else {
      this.player.rewind(5);
    }
  }
}

export {};
