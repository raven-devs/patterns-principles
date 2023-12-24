# DAO vs Repository

DAO is an abstraction of data persistence. However, a repository is an abstraction of a collection of objects.

DAO is a lower-level concept, closer to the storage systems. However, Repository is a higher-level concept, closer to the Domain objects.

DAO works as a data mapping/access layer, hiding ugly queries. However, a repository is a layer between domains and data access layers, hiding the complexity of collating data and preparing a domain object.

## DAO Pattern

DAO Pattern, is an abstraction of data persistence and is considered closer to the underlying storage, which is often table-centric.

User domain class:

```java
public class User {
    private Long id;
    private String userName;
    private String firstName;
    private String email;

    // getters and setters
}
```

UserDao:

```java
public interface UserDao {
    void create(User user);
    User read(Long id);
    void update(User user);
    void delete(String userName);
}
```

UserDaoImpl class that implements the UserDao interface:

```java
public class UserDaoImpl implements UserDao {
    private final EntityManager entityManager;

    @Override
    public void create(User user) {
        entityManager.persist(user);
    }

    @Override
    public User read(long id) {
        return entityManager.find(User.class, id);
    }

    // ...
}
```

## Repository Pattern

Repository is a mechanism for encapsulating storage, retrieval, and search behavior, which emulates a collection of objects. It mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects. In other words, a repository also deals with data and hides queries similar to DAO. However, it sits at a higher level, closer to the business logic of an app. Consequently, a repository can use a DAO to fetch data from the database and populate a domain object. Or, it can prepare the data from a domain object and send it to a storage system using a DAO for persistence.

UserRepository:

```java
public interface UserRepository {
    User get(Long id);
    void add(User user);
    void update(User user);
    void remove(User user);
}
```

UserRepositoryImpl:

```java
public class UserRepositoryImpl implements UserRepository {
    private UserDaoImpl userDaoImpl;

    @Override
    public User get(Long id) {
        User user = userDaoImpl.read(id);
        return user;
    }

    @Override
    public void add(User user) {
        userDaoImpl.create(user);
    }

    // ...
}
```

So far, we can say that the implementations of DAO and repository look very similar because the User class is an anemic domain. And, a repository is just another layer over the data-access layer (DAO).

However, DAO seems a perfect candidate to access the data, and a repository is an ideal way to implement a business use-case.
