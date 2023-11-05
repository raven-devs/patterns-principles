# Interface segregation

The Interface Segregation Principle (ISP) states that clients should not be forced to depend on methods that they do not use. Interfaces should belong to clients, not to libraries or hierarchies. Application developers should favor thin, focused interfaces to "fat" interfaces that offer more functionality than a particular class or method needs.

Consider an interface like this one:

```typescript
interface Membership {
  login(username: string, password: string): boolean;
  logout(username: string): void;
  register(username: string, password: string, email: string): string;
  forgotPassword(username: string): void;
}
```

It's easy to imagine such an interface growing completely out of control and having more functionality than any one class would ever require. To keep, say, a login form from having more methods on it than it needs, you could create a login-specific interface, and have the existing interface extend from it:

```typescript
interface Login {
  login(username: string, password: string): boolean;
  logout(username: string): void;
}

interface Membership extends Login {
  register(username: string, password: string, email: string): string;
  forgotPassword(username: string): void;
}
```

Ideally, your thin interfaces should be cohesive, meaning they have groups of operations that logically belong together. This will prevent you from ending up with one-interface-per-method most of the time in real-world systems (as opposed to the above trivial example).
