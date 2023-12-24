# Value Objects

Value objects represent typed values, that have no conceptual identity, in your domain. They can help you write better code that is less error-prone, more performant and more expressive.

Prefer dedicated value objects to primitive type.

Value objects have three main characteristics:

1. Value Equality

   Value objects are defined by their attributes. They are equal if their attributes are equal. A value object differs from an entity in that it does not have a concept of identity. This characteristic can be easier to implement in some languages than in others. In Java, we need to redefine the equals and hashCode methods. Indeed, by default, Java tests equality against the objects’ references.

2. Immutability

   Once created, a value object should always be equal. The only way to change its value is by full replacement. What this means, in code, is to create a new instance with the new value. When implementing a value object, we need to make sure that we remove all setters and that getters return immutable objects or copies to guarantee that nobody can change those values from the outside. In Java, we can use the final keyword.

3. Self-Validation
   A value object must verify the validity of its attributes when being created. If any of its attributes are invalid, then the object should not be created and an error or exception should be raised. For instance, if we have a concept of Age it wouldn’t make sense to create an instance of age with a negative value. In Java, we can throw an IllegalArgumentException or any other custom Exception that we have created.

Example of a value object

```typescript
class EmailAddress {
  private static readonly validator: EmailValidator = EmailValidator.getInstance();
  private readonly value: string;

  constructor(value: string) {
    if (!validator.isValid(value)) {
      throw new InvalidEmailException();
    }
    this.value = value;
  }

  change(value: string): EmailAddress {
    return new EmailAddress(value);
  }

  toString(): string {
    return value;
  }

  equals(obj: object): boolean {
    if (obj == null || getClass() != obj.getClass()) {
      return false;
    }

    const that: EmailAddress = obj as EmailAddress;
    return Objects.equals(this.value, that.value);
  }

  hashCode(): number {
    return Objects.hash(value);
  }
}
```
