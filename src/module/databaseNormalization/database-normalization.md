# Database normalization

Normalization is the process of organizing data in a database. It includes creating tables and establishing relationships between those tables according to rules designed both to protect the data and to make the database more flexible by eliminating redundancy and inconsistent dependency.

Redundant data wastes disk space and creates maintenance problems. If data that exists in more than one place must be changed, the data must be changed in exactly the same way in all locations. A customer address change is easier to implement if that data is stored only in the Customers table and nowhere else in the database.

What is an "inconsistent dependency"? While it's intuitive for a user to look in the Customers table for the address of a particular customer, it may not make sense to look there for the salary of the employee who calls on that customer. The employee's salary is related to, or dependent on, the employee and thus should be moved to the Employees table. Inconsistent dependencies can make data difficult to access because the path to find the data may be missing or broken.

There are a few rules for database normalization. Each rule is called a "normal form." If the first rule is observed, the database is said to be in "first normal form." If the first three rules are observed, the database is considered to be in "third normal form." Although other levels of normalization are possible, third normal form is considered the highest level necessary for most applications.

As with many formal rules and specifications, real world scenarios don't always allow for perfect compliance. In general, normalization requires additional tables and some customers find this cumbersome. If you decide to violate one of the first three rules of normalization, make sure that your application anticipates any problems that could occur, such as redundant data and inconsistent dependencies.

## First Normal Form (1NF)

First Normal Form (1NF) is a property of a relational database table that ensures each column contains atomic, indivisible values, and each row has a unique identifier.

Steps:

- Eliminate repeating groups in individual tables.
- Create a separate table for each set of related data.
- Identify each set of related data with a primary key.

Don't use multiple fields in a single table to store similar data. For example, to track an inventory item that may come from two possible sources, an inventory record may contain fields for Vendor Code 1 and Vendor Code 2.

What happens when you add a third vendor? Adding a field isn't the answer; it requires program and table modifications and doesn't smoothly accommodate a dynamic number of vendors. Instead, place all vendor information in a separate table called Vendors, then link inventory to vendors with an item number key, or vendors to inventory with a vendor code key.

### Example 1.1

Suppose we have a database table for storing information about books in a library. This table, in its initial state, may not be in 1NF. Here's an example:

| Book_ID | Title                 | Authors              |
| ------- | --------------------- | -------------------- |
| 1       | The Great Gatsby      | F. Scott Fitzgerald  |
| 2       | 1984                  | George Orwell        |
| 3       | To Kill a Mockingbird | Harper Lee, John Doe |

In this example, the Authors column violates the 1NF because it contains multiple values (Harper Lee, John Doe) in the same cell for the book "To Kill a Mockingbird."

To convert this table into 1NF, we need to ensure that each column contains only atomic values. Here's how the table would look after transforming it into 1NF:

| Book_ID | Title                 | Author              |
| ------- | --------------------- | ------------------- |
| 1       | The Great Gatsby      | F. Scott Fitzgerald |
| 2       | 1984                  | George Orwell       |
| 3       | To Kill a Mockingbird | Harper Lee          |
| 3       | To Kill a Mockingbird | John Doe            |

In this transformed table, each row represents a unique book-author pair, ensuring that each cell contains only a single value, thereby satisfying the requirement of 1NF.

### Example 1.2

Suppose we have a student table:

| StudentID | Advisor | Adv-Room | Class1 | Class2 | Class3 |
| --------- | ------- | -------- | ------ | ------ | ------ |
| 1022      | Jones   | 412      | 101-07 | 143-01 | 159-02 |
| 4123      | Smith   | 216      | 101-07 | 143-01 | 179-04 |

In the first normal form a table should has no repeating groups (Class1, Class2 and Class3), let's refactor to 1FN:

| StudentID | Advisor | Adv-Room | ClassID |
| --------- | ------- | -------- | ------- |
| 1022      | Jones   | 412      | 101-07  |
| 1022      | Jones   | 412      | 143-01  |
| 1022      | Jones   | 412      | 159-02  |
| 4123      | Smith   | 216      | 101-07  |
| 4123      | Smith   | 216      | 143-01  |
| 4123      | Smith   | 216      | 179-04  |

## Second Normal Form (2NF)

Second Normal Form (2NF) is a level of database normalization that builds upon the first normal form (1NF). In 2NF, the table must be in 1NF, and additionally, it must not have any partial or functional dependency on a primary key.

Partial dependency means that a non-key column is dependent on only part of a composite primary key.

A functional dependency in a database exists when one attribute uniquely determines another attribute. This relationship is denoted as A -> B, which means "B is functionally dependent on A". If you know the value of A, you can determine the value of B. Example, consider a database table where each record contains an employee's ID and their name. If every employee has a unique ID, then the employee ID functionally determines the employee's name. In this case, knowing an employee's ID lets you accurately find their name.

Steps:

- Create separate tables for sets of values that apply to multiple records.
- Relate these tables with a foreign key.

Records shouldn't depend on anything other than a table's primary key (a compound key, if necessary). For example, consider a customer's address in an accounting system. The address is needed by the Customers table, but also by the Orders, Shipping, Invoices and Accounts Receivable tables. Instead of storing the customer's address as a separate entry in each of these tables, store it in one place, either in the Customers table or in a separate Addresses table.

### Example 2.1

Suppose we have a table of 'StudentCourseGrades' that records the grades students receive in various courses. This table has a composite primary key consisting of 'StudentID' and 'CourseID'. The initial table might look like this (and is already in 1NF):

| StudentID | CourseID | Grade | Instructor |
| --------- | -------- | ----- | ---------- |
| 101       | Math101  | A     | Dr. Smith  |
| 101       | Bio201   | B     | Dr. Jones  |
| 102       | Math101  | C     | Dr. Smith  |
| 103       | Eng301   | B     | Dr. Lee    |

In this table:

- StudentID and CourseID together form the primary key.
- Grade is dependent on both StudentID and CourseID.
- Instructor, however, is only dependent on CourseID.

This setup results in a partial dependency since Instructor does not depend on the whole primary key but only on a part of it (the CourseID).

To move this table to 2NF, we need to remove partial dependencies. We can do this by creating a separate table for courses and their instructors. The normalized tables would look like this:

StudentCourseGrades table:

| StudentID | CourseID | Grade |
| --------- | -------- | ----- |
| 101       | Math101  | A     |
| 101       | Bio201   | B     |
| 102       | Math101  | C     |
| 103       | Eng301   | B     |

Courses table:

| CourseID | Instructor |
| -------- | ---------- |
| Math101  | Dr. Smith  |
| Bio201   | Dr. Jones  |
| Eng301   | Dr. Lee    |

In this structure, the StudentCourseGrades table is now in 2NF, as every non-key attribute is fully functionally dependent on the entire primary key (StudentID and CourseID), and there are no partial dependencies. The Courses table lists each course with its instructor, removing the redundancy and partial dependency from the original table.

### Example 2.2

Let's consider the following students table from the previous example that is in the 1NF:

| StudentID | Advisor | Adv-Room | ClassID |
| --------- | ------- | -------- | ------- |
| 1022      | Jones   | 412      | 101-07  |
| 1022      | Jones   | 412      | 143-01  |
| 1022      | Jones   | 412      | 159-02  |
| 4123      | Smith   | 216      | 101-07  |
| 4123      | Smith   | 216      | 143-01  |
| 4123      | Smith   | 216      | 179-04  |

To refactor this table to 2NF we need to eliminate redundant data and functional dependencies. The following tables demonstrate second normal form:

Students:

| StudentID | Advisor | Adv-Room |
| --------- | ------- | -------- |
| 1022      | Jones   | 412      |
| 4123      | Smith   | 216      |

Registration:

| StudentID | ClassID |
| --------- | ------- |
| 1022      | 101-07  |
| 1022      | 143-01  |
| 1022      | 159-02  |
| 4123      | 101-07  |
| 4123      | 143-01  |
| 4123      | 179-04  |

## Third Normal Form (3NF)

Third Normal Form (3NF) is an advanced level of database normalization that extends upon the second normal form (2NF). A table is in 3NF if it is in 2NF and all of its attributes are not functionally dependent on the primary key and addiionally not transitively dependent on the primary key. In simpler terms, there should be no dependency of any attribute on any other non-primary key attribute (all attributes must be depended only on a primary key attribute).

Transitive Dependency: This is a special kind of functional dependency which occurs indirectly. For instance, if
A -> B and B -> C, then A -> C is a transitive dependency.

Steps:

- Eliminate fields that don't depend on the key.

Values in a record that aren't part of that record's key don't belong in the table. In general, anytime the contents of a group of fields may apply to more than a single record in the table, consider placing those fields in a separate table.

For example, in an Employee Recruitment table, a candidate's university name and address may be included. But you need a complete list of universities for group mailings. If university information is stored in the Candidates table, there is no way to list universities with no current candidates. Create a separate Universities table and link it to the Candidates table with a university code key.

EXCEPTION: Adhering to the third normal form, while theoretically desirable, isn't always practical. If you have a Customers table and you want to eliminate all possible interfield dependencies, you must create separate tables for cities, ZIP codes, sales representatives, customer classes, and any other factor that may be duplicated in multiple records. In theory, normalization is worth pursuing. However, many small tables may degrade performance or exceed open file and memory capacities.

It may be more feasible to apply third normal form only to data that changes frequently. If some dependent fields remain, design your application to require the user to verify all related fields when any one is changed.

### Example 3.1

Consider the following table that is already in 2NF:

Courses table:

| CourseID | Instructor | Department  |
| -------- | ---------- | ----------- |
| Math101  | Dr. Smith  | Mathematics |
| Bio201   | Dr. Jones  | Biology     |
| Eng301   | Dr. Lee    | English     |

Here, the Department is dependent on the Instructor, which in turn is dependent on the CourseID. This represents a transitive dependency, as the Department is not directly dependent on the primary key (CourseID) but rather on another non-key attribute (Instructor).

To bring this table into 3NF, we need to remove this transitive dependency. We can do this by creating a separate table for instructors and their departments. The revised tables would look like this:

Courses table:

| CourseID | Instructor |
| -------- | ---------- |
| Math101  | Dr. Smith  |
| Bio201   | Dr. Jones  |
| Eng301   | Dr. Lee    |

Instructors table:

| Instructor | Department  |
| ---------- | ----------- |
| Dr. Smith  | Mathematics |
| Dr. Jones  | Biology     |
| Dr. Lee    | English     |

Now, the Courses table is in 3NF because every non-primary key attribute (Instructor) is directly dependent on the primary key (CourseID) and not on any other non-primary key attribute. Similarly, the Instructors table is in 3NF as well, with Department being dependent only on the primary key (Instructor).

This structure eliminates transitive dependencies, ensuring that each non-key attribute is only dependent on the primary key and not on any other non-key attribute, which is the core principle of 3NF.

### Example 3.2

Consider the students table from the example above that is in 2NF:

Students table:

| StudentID | Advisor | Adv-Room |
| --------- | ------- | -------- |
| 1022      | Jones   | 412      |
| 4123      | Smith   | 216      |

Here, the Adv-Room (the advisor's office number) is functionally dependent on the Advisor attribute. The solution is to move that attribute from the Students table to the Faculty table, as shown below:

Students table:

| StudentID | Advisor |
| --------- | ------- |
| 1022      | Jones   |
| 4123      | Smith   |

Advisor table:

| Advisor | Room |
| ------- | ---- |
| Jones   | 412  |
| Smith   | 216  |

## Other normalization forms

Fourth normal form, also called Boyce-Codd Normal Form (BCNF), and fifth normal form do exist, but are rarely considered in practical design. Disregarding these rules may result in less than perfect database design, but shouldn't affect functionality.
