interface ProfileIterator {}

// The collection interface must declare a factory method for
// producing iterators. You can declare several methods if there
// are different kinds of iteration available in your program.
interface SocialNetwork {
  createFriendsIterator(profileId: string): ProfileIterator;
  createCoworkersIterator(profileId: string): ProfileIterator;
}

// Each concrete collection is coupled to a set of concrete
// iterator classes it returns. But the client isn't, since the
// signature of these methods returns iterator interfaces.
class Facebook implements SocialNetwork {
  //... business logic

  socialGraphRequest(profileId: string, type: string) {
    const profiles: Profile[] = [];
    return profiles;
  }

  // Iterator creation code.
  createFriendsIterator(profileId: string): ProfileIterator {
    return new FacebookIterator(this, profileId, 'friends');
  }

  createCoworkersIterator(profileId: string): ProfileIterator {
    return new FacebookIterator(this, profileId, 'coworkers');
  }
}

interface Profile {
  getId(): string;
  getEmail(): string;
}

class System {
  static sendEmail(email: string, message: string) {
    //...
  }
}

// The common interface for all iterators.
interface ProfileIterator {
  getNext(): Profile | null;
  hasMore(): boolean;
}

class FacebookIterator implements ProfileIterator {
  // The iterator needs a reference to the collection that it
  // traverses.
  private facebook: Facebook;
  private profileId: string;
  private type: string;

  // An iterator object traverses the collection independently
  // from other iterators. Therefore it has to store the
  // iteration state.
  private currentPosition: number;
  private cache: Profile[] = [];

  constructor(facebook: Facebook, profileId: string, type: string) {
    this.facebook = facebook;
    this.profileId = profileId;
    this.type = type;
  }

  private lazyInit() {
    if (this.cache === null) {
      this.cache = this.facebook.socialGraphRequest(this.profileId, this.type);
    }
  }

  // Each concrete iterator class has its own implementation
  // of the common iterator interface.
  getNext() {
    if (this.hasMore()) {
      const result = this.cache[this.currentPosition];
      this.currentPosition++;
      return result;
    } else {
      return null;
    }
  }

  hasMore(): boolean {
    this.lazyInit();
    return this.currentPosition < this.cache.length;
  }
}

// Here is another useful trick: you can pass an iterator to a
// client class instead of giving it access to a whole
// collection. This way, you don't expose the collection to the
// client.
//
// And there's another benefit: you can change the way the
// client works with the collection at runtime by passing it a
// different iterator. This is possible because the client code
// isn't coupled to concrete iterator classes.
class SocialSpammer {
  send(iterator: ProfileIterator, message: string) {
    while (iterator.hasMore()) {
      const profile = iterator.getNext();
      if (profile) {
        System.sendEmail(profile.getEmail(), message);
      }
    }
  }
}

// The application class configures collections and iterators
// and then passes them to the client code.
class Application {
  network: SocialNetwork;
  spammer: SocialSpammer;

  config() {
    //...
    this.network = new Facebook();
    this.spammer = new SocialSpammer();
  }

  sendSpamToFriends(profile: Profile) {
    const iterator = this.network.createFriendsIterator(profile.getId());
    this.spammer.send(iterator, 'very important message');
  }

  sendSpamToCoworkers(profile: Profile) {
    const iterator = this.network.createCoworkersIterator(profile.getId());
    this.spammer.send(iterator, 'very important message');
  }
}

export {};
