# Database normalization

Normalization is the process of organizing data in a database. It includes creating tables and establishing relationships between those tables according to rules designed both to protect data and to make the database more flexible by eliminating redundancy and inconsistent dependency.

As with many formal rules and specifications, real world scenarios don't always allow for perfect compliance. In general, normalization requires additional tables and some customers find this cumbersome. If you decide to violate one of the first three rules of normalization, make sure that your application anticipates any problems that could occur, such as redundant data and inconsistent dependencies.

## First Normal Form (1NF)

A table is in First Normal Form if it satisfies the following conditions:

- Atomicity: Each cell in the table must contain a single value, meaning that the value is indivisible.

- No Repeating Groups or Arrays: The table should not have any columns that contain multiple values or groups of values that are related to each other.

- Unique Rows: Each row in the table should be unique. This is often ensured by having a primary key, which is a column or a set of columns that uniquely identifies each row.

## Second Normal Form (2NF)

A table is in Second Normal Form if it satisfies the following conditions:

- The table is in 1NF.

- No Partial Dependencies: all non-key attributes are fully functionally dependent on the primary key.

This means that every non-key attribute must depend on the whole primary key for its existence, not just a part of it. This eliminates what are called partial dependencies, where an attribute depends only on part of a composite key. Records shouldn't depend on anything other than a table's primary key (a compound key, if necessary).

A functional dependency in a database exists when one attribute uniquely determines another attribute. This relationship is denoted as A -> B, which means "B is functionally dependent on A". If you know the value of A, you can determine the value of B. Example, consider a database table where each record contains an employee's ID and their name. If every employee has a unique ID, then the employee ID functionally determines the employee's name. In this case, knowing an employee's ID lets you accurately find their name.

## Third Normal Form (3NF)

A table is in Third Normal Form if it meets two primary conditions:

- The table is in 2NF.

- No Transitive Dependencies: no non-key attribute should depend on another non-key attribute.

This means that every non-key attribute should be directly dependent on the primary key, not on another non-key attribute. This removes transitive dependency, which can lead to anomalies and redundancy.

A transitive dependency is a special kind of functional dependency which occurs indirectly. For instance, if
A -> B and B -> C, then A -> C is a transitive dependency.

EXCEPTION: Adhering to the third normal form, while theoretically desirable, isn't always practical. If you have a Customers table and you want to eliminate all possible interfield dependencies, you must create separate tables for cities, ZIP codes, sales representatives, customer classes, and any other factor that may be duplicated in multiple records. In theory, normalization is worth pursuing. However, many small tables may degrade performance or exceed open file and memory capacities. It may be more feasible to apply third normal form only to data that changes frequently. If some dependent fields remain, design your application to require the user to verify all related fields when any one is changed.

## Other normalization forms

Fourth normal form, also called Boyce-Codd Normal Form (BCNF), and fifth normal form do exist, but are rarely considered in practical design. Disregarding these rules may result in less than perfect database design, but shouldn't affect functionality.

## Examples of 1NF, 2NF, and 3NF

Imagine we're building a restaurant management application. That application needs to store data about the company's employees and it starts out by creating the following table of employees:

Table 1NF `employee`:

| EMPLOYEE_ID | NAME  | JOB_CODE | JOB       | STATE_CODE | HOME_STATE |
| ----------- | ----- | -------- | --------- | ---------- | ---------- |
| E001        | Alice | J01      | Chef      | 26         | Michigan   |
| E001        | Alice | J02      | Waiter    | 26         | Michigan   |
| E002        | Bob   | J02      | Waiter    | 56         | Wyoming    |
| E002        | Bob   | J03      | Bartender | 56         | Wyoming    |
| E003        | Alice | J01      | Chef      | 56         | Wyoming    |

All the entries are atomic and there is a composite `PrimaryKey: {employee_id, job_code}` so the table is in the first normal form (1NF).

But even if you only know someone's employee_id, then you can determine their name, home_state, and state_code (because they should be the same person). This means name, home_state, and state_code are dependent on employee_id (a part of primary composite key). This is a partial dependecy on a primary key. So, the table is not in 2NF. We should separate them to a different table to make it 2NF.

Table 2NF `employee_jobcode`:

| EMPLOYEE_ID | JOB_CODE |
| ----------- | -------- |
| E001        | J01      |
| E001        | J02      |
| E002        | J02      |
| E002        | J03      |
| E003        | J01      |

Table 2NF `employee`:

| EMPLOYEE_ID | NAME  | STATE_CODE | HOME_STATE |
| ----------- | ----- | ---------- | ---------- |
| E001        | Alice | 26         | Michigan   |
| E002        | Bob   | 56         | Wyoming    |
| E003        | Alice | 56         | Wyoming    |

Table 2NF `job`:

| JOB_CODE | JOB       |
| -------- | --------- |
| J01      | Chef      |
| J02      | Waiter    |
| J02      | Waiter    |
| J03      | Bartender |
| J01      | Chef      |

Attribute home_state is now dependent on state_code. So, if you know the state_code, then you can find the home_state value. To take this a step further, we should separate them again to a different table to make it 3NF.

Table 3NF `employee_jobcode`:

| EMPLOYEE_ID | JOB_CODE |
| ----------- | -------- |
| E001        | J01      |
| E001        | J02      |
| E002        | J02      |
| E002        | J03      |
| E003        | J01      |

Table 3NF `employee`:

| EMPLOYEE_ID | NAME  | STATE_CODE |
| ----------- | ----- | ---------- |
| E001        | Alice | 26         |
| E002        | Bob   | 56         |
| E003        | Alice | 56         |

Table 3NF `state`:

| STATE_CODE | HOME_STATE |
| ---------- | ---------- |
| 26         | Michigan   |
| 56         | Wyoming    |
| 56         | Wyoming    |

Table 3NF `job`:

| JOB_CODE | JOB       |
| -------- | --------- |
| J01      | Chef      |
| J02      | Waiter    |
| J02      | Waiter    |
| J03      | Bartender |
| J01      | Chef      |

Now our database is in 3NF.
