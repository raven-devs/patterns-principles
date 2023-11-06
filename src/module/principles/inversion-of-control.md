# Inversion of Control (IoC)

In general terms, Inversion of Control (IoC) is about inverting the traditional control flow in an application. Instead of letting its components create and manage their own dependencies (in the form of other components of the app, e.g. particular services), we delegate this responsibility to an external entity, e.g. an IoC container or framework – depending on the specific implementation.

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
