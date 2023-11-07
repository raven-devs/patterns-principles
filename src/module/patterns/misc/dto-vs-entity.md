# DTO vs Entity

DTOs are used for transferring data between different layers of an application, such as between the client and the server. On the other hand, Entities represent domain objects that are typically persisted in a database.

```typescript
// DTO (Data Transfer Object)
class UserDTO {
  constructor(
    public readonly id: number,
    public readonly username: string,
  ) {}
}

// Entity
class UserEntity {
  public readonly id: number;
  public username: string;
  public password: string;

  constructor(id: number, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}

// Example usage
const userDTO = new UserDTO(1, 'johndoe');
const userEntity = new UserEntity(1, 'johndoe', 'secretpassword');

// Printing the DTO and Entity
console.log('User DTO:', userDTO);
console.log('User Entity:', userEntity);
```
