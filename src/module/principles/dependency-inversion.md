# Dependency inversion

The dependency inversion principle is a design principle that states that high-level modules should depend on abstractions (interfaces / abstract classes) rather than concrete implementations (classes). This helps decouple the high-level and low-level modules, making it easier to change the low-level ones without affecting the high-level ones.

The dependency inversion principle helps us couple software modules loosely. The principle was developed after many years of coupling software modules, and it states:

- High-level modules should not import anything from low-level modules, they should both depend on abstractions.
- Abstractions should not rely on concrete implementations, concrete implementations should depend on abstractions.

By following the dependency inversion principle, you can design your application so that the high-level modules depend on abstractions rather than concrete implementations of the low-level modules.

This can make your code more flexible and easier to maintain because it reduces the coupling between components and allows you to easily change the implementation of the low-level modules without affecting the high-level modules.

```typescript
// High-level module
class UserService {
  constructor(private repository: UserRepository) {}

  save(user: User) {
    this.repository.save(user);
  }
}

// Low-level module
class UserRepository {
  save(user: User) {
    // Save the user to the database
  }
}

// Abstraction
interface UserRepository {
  save(user: User): void;
}

// Implementation of the abstraction
class UserRepositoryImpl implements UserRepository {
  save(user: User) {
    // Save the user to the database
  }
}

// Now the UserService depends on the abstraction, not the implementation
const userService = new UserService(new UserRepositoryImpl());
```
