# Guard Clause

Complexity in code makes it harder to understand what the code is doing. The smallest unit of our code tends to be the function or method. You should be able to look at a given function and quickly determine what it's doing. This tends to be much easier if the function is small, well-named, and focused. One factor that's constantly working against simplicity is conditional complexity, most often taking the form of if and switch statements. When not properly managed, these two constructs can quickly cause functions to shift from simple and easily understood to long, obtuse, and scary. One way to reduce some of the complexity is through the use of guard clauses.

A guard clause is simply a check that immediately exits the function, either with a return statement or an exception. If you're used to writing functions that check to ensure everything is valid for the function to run, then you write the main function code, and then you write else statements to deal with error cases, this involves inverting your current workflow. The benefit is that your code will tend to be shorter and simpler, and less deeply indented.

An example of a function that does not use guard clauses:

```ts
function subscribe(user: User, subscription: Subscription, term: Term) {
  if (user != null) {
    if (subscription != null) {
      if (term == Term.Annually) {
        // subscribe annually
      } else if (term == Term.Monthly) {
        // subscribe monthly
      } else {
        throw new InvalidEnumArgumentException(nameof(term));
      }
    } else {
      throw new ArgumentNullException(nameof(subscription));
    }
  } else {
    throw new ArgumentNullException(nameof(user));
  }
}
```

This code can be refactored to eliminate the need for the else clauses. This is accomplished by simply inverting the logic of the if statements and putting the exception throwing statements inside of these if statements. The result looks like this:

```typescript
function Subscribe2(user: User, subscription: Subscription, term: Term) {
  if (user == null) {
    throw new ArgumentNullException(nameof(user));
  }
  if (subscription == null) {
    throw new ArgumentNullException(nameof(subscription));
  }
  if (term == Term.Annually) {
    // subscribe annually
  } else if (term == Term.Monthly) {
    // subscribe monthly
  } else {
    throw new InvalidEnumArgumentException(nameof(term));
  }
}
```

The checks for null and common behavior of throwing a particular type of exception is clearly a violation of the DRY principle. This code can be pulled out into a helper method:

```typescript
class Guard {
  static AgainstNull(argument: object, argumentName: string) {
    if (argument == null) {
      throw new ArgumentNullException(argumentName);
    }
  }
  static AgainstInvalidTerms(term: Term, argumentName: string) {
    if (term != Term.Annually && term != Term.Monthly) {
      throw new InvalidEnumArgumentException(argumentName);
    }
  }
}

function Subscribe3(user: User, subscription: Subscription, term: Term) {
  Guard.AgainstNull(user, 'user');
  Guard.AgainstNull(subscription, 'subscription');
  Guard.AgainstInvalidTerms(term, 'term');

  if (term == Term.Annually) {
    // subscribe annually
    return;
  }
  // subscribe monthly
}
```
