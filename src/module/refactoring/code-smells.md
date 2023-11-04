# Code smells

## Bloaters

Bloaters are code, methods and classes that have increased to such gargantuan proportions that they’re hard to work with. Usually these smells don’t crop up right away, rather they accumulate over time as the program evolves.

### Long method

A method contains too many lines of code and / or arguments. Generally, any method longer than ten lines should make you start asking questions.

As a rule of thumb, if you feel the need to comment on something inside a method, you should take this code and put it in a new method. Even a single line can and should be split off into a separate method, if it requires explanations. And if the method has a descriptive name, nobody will need to look at the code to see what it does.

Among all types of object-oriented code, classes with short methods live longest. The longer a method or function is, the harder it becomes to understand and maintain it. In addition, long methods offer the perfect hiding place for unwanted duplicate code.

### Long parameter list

More than three or four parameters for a method.

### Large class

A class contains many fields/methods/lines of code.

Refactoring of these classes spares developers from needing to remember a large number of attributes for a class. In many cases, splitting large classes into parts avoids duplication of code and functionality.

### Primitive obsession

Primitives are often used to "simulate" types. So instead of a separate data type, you have a set of numbers or strings that form the list of allowable values for some entity. Easy-to-understand names are then given to these specific numbers and strings via constants, which is why they’re spread wide and far.

If you have a large variety of primitive fields, it may be possible to logically group some of them into their own class. Even better, move the behavior associated with this data into the class too.

After refactoring, code becomes more flexible thanks to use of objects instead of primitives. Better understandability and organization of code. Operations on particular data are in the same place, instead of being scattered. No more guessing about the reason for all these strange constants and why they’re in an array.

### Data clumps

Sometimes different parts of the code contain identical groups of variables (such as parameters for connecting to a database). These clumps should be turned into their own classes.

## Object-orientation abusers

All these smells are incomplete or incorrect application of object-oriented programming principles.

### Switch / If statements

You have a complex `switch` operator or sequence of `if` statements.

### Temporary field

Temporary fields get their values (and thus are needed by objects) only under certain circumstances. Outside of these circumstances, they’re empty. Oftentimes, temporary fields are created for use in an algorithm that requires a large amount of inputs. So instead of creating a large number of parameters in the method, the programmer decides to create fields for this data in the class. These fields are used only in the algorithm and go unused the rest of the time.

### Refused bequest

If a subclass uses only some of the methods and properties inherited from its parents, the hierarchy is off-kilter. The unneeded methods may simply go unused or be redefined and give off exceptions.

Someone was motivated to create inheritance between classes only by the desire to reuse the code in a superclass. But the superclass and subclass are completely different.

#### Alternative classes with different interfaces

Two classes perform identical functions but have different method names. The programmer who created one of the classes probably didn’t know that a functionally equivalent class already existed.
