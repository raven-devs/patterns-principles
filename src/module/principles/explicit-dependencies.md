# Explicit Dependencies

Methods and classes should explicitly require (typically through method parameters or constructor parameters) any collaborating objects they need in order to function correctly.

If your classes require other classes to perform their operations, these other classes are dependencies. These dependencies are implicit if they exist only in the code within your class, and not in its public interface. Explicit dependencies appear most often in an object's constructor, for class-level dependencies, or in a particular method's parameter list, for more local dependencies.

Classes with implicit dependencies cost more to maintain than those with explicit dependencies. They are more difficult to test because they are more tightly coupled to their collaborators. They are more difficult to analyze for side effects, because the entire class's codebase must be searched for object instantiations or calls to static methods. They are more brittle and more tightly coupled to their collaborators, resulting in more rigid and brittle designs.
