# DTO vs DAO

DAO (Data Access Object) and DTO (Data Transfer Object) are both design patterns used in software development, especially in the context of object-oriented programming and data management. While they sound similar and are sometimes used together, they serve different purposes and are used in different layers of an application.

1. Data Access Object (DAO):

   - DAO is a design pattern that provides an abstract interface to some type of database or other persistence mechanism.
   - It acts as an interface between the business logic and the data source, allowing the business logic to access the data from the database without having to know the specifics of the database.
   - It abstracts and encapsulates all access to the data source, thereby centralizing the data access logic.
   - DAOs typically contain methods for CRUD (Create, Read, Update, Delete) operations on the database or persistence storage.

2. Data Transfer Object (DTO):
   - DTO is a design pattern used to transfer data between software application subsystems or layers, especially between the data access layer and the presentation layer.
   - It is essentially a plain Java or C# object that should only contain attributes and getters/setters for accessing the attributes.
   - DTOs are used to pass data between different layers of an application, and they help to reduce the number of method calls between the client and the server.

In summary, while both DAO and DTO are design patterns used in software development, DAO is primarily concerned with providing an abstract interface to a database or persistence mechanism, while DTO is concerned with transferring data between different subsystems or layers of an application. They serve different purposes and are used in different parts of the application architecture.

You can implement the Data Access Object (DAO) design pattern to abstract and encapsulate the data access logic for your application. The DAO pattern helps to isolate the application/business layer from the persistence layer (like a database). Here's a simple example of a DAO implementation:

```typescript
// Entity
class User {
  public id: number;
  public username: string;
  public password: string;

  constructor(id: number, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}

// DAO (Data Access Object)
class UserDao {
  private users: User[];

  constructor() {
    // Example list of users (simulating a database)
    this.users = [new User(1, 'user1', 'pass1'), new User(2, 'user2', 'pass2'), new User(3, 'user3', 'pass3')];
  }

  // Simulated database operations
  public getAllUsers(): User[] {
    return this.users;
  }

  public getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public addUser(user: User): void {
    this.users.push(user);
  }

  public updateUser(updatedUser: User): void {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  public deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

// Example usage
const userDao = new UserDao();

console.log('All Users:', userDao.getAllUsers());
console.log('User with ID 2:', userDao.getUserById(2));

const newUser = new User(4, 'user4', 'pass4');
userDao.addUser(newUser);

console.log('All Users after adding a new user:', userDao.getAllUsers());

const updatedUser = new User(2, 'updateduser2', 'updatedpass2');
userDao.updateUser(updatedUser);

console.log('All Users after updating user with ID 2:', userDao.getAllUsers());

userDao.deleteUser(1);

console.log('All Users after deleting user with ID 1:', userDao.getAllUsers());
```
