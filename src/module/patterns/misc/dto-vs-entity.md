# DTO vs Entity

DTOs are used for transferring data between different layers of an application, such as between the client and the server. On the other hand, Entities represent domain objects that are typically persisted in a database.

Entities may be part of a business domain. Thus, they can implement behavior and be applied to different use cases within the domain.

DTOs are used only to transfer data from one process or context to another. As such, they are without behavior - except for very basic and usually standardised storage and retrieval functions.

While the term "Data Transfer Object" (DTO) is defined quite unambiguously, the term "Entity" is interpreted differently in various contexts.

The most relevant interpretations of the term "Entity", in my opinion, are the following three:

In the context of entity-relationship- and ORM-frameworks - specifically Enterprise Java and Jpa:
"An object that represents persistent data maintained in a database."

In the context of "Domain-Driven Design" (by Eric Evans):
"An object defined primarily by its identity, rather than its attributes."

In the context of "Clean Architecture" (by Robert C. Martin):
"An object that encapsulates enterprise-wide critical business rules."

The Jee- and Jpa-community sees entities primarily as objects mapped to a database table. This point of view is very close to the definition of a DTO - and that's where much of the confusion probably stems from.

In the context of domain-driven-design, as well as Robert Martins point of view, however, Entities are part of a business domain and thus can and should implement behavior.

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
