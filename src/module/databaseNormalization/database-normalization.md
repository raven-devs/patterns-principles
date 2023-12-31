# Database normalization

Normalization is the process of organizing data in a database. It includes creating tables and establishing relationships between those tables according to rules designed both to protect data and to make the database more flexible by eliminating redundancy and inconsistent dependency.

Database normalization is simply the process of structuring and organizing data within a database to reduce redundancy and improve efficiency. It involves breaking down or decomposing large and complex tables into smaller and simpler tables, and then connecting each of these tables using what is known as a foreign key. The purpose of this is to ensure data accuracy, make querying faster, and maintain consistency in a database by minimizing data anomalies and errors.

As with many formal rules and specifications, real world scenarios don't always allow for perfect compliance. In general, normalization requires additional tables and some customers find this cumbersome. If you decide to violate one of the first three rules of normalization, make sure that your application anticipates any problems that could occur, such as redundant data and inconsistent dependencies.

## Why do database engineers normalize databases?

Database engineers or developers normalize databases to reduce data duplication, avoid data modification implications, which in turn helps to simplify data queries from the database. To gain a better understanding of normalization and the challenges it addresses, let’s look at an example of a table that hasn’t been normalized.

| StudentId | StudentName | CourseName        | CourseScore | DeptName           | DeptDirector | DirPhoneNo |
| --------- | ----------- | ----------------- | ----------- | ------------------ | ------------ | ---------- |
| 1         | James       | Computer Science  | 170         | Computing          | Dr. Harry    | +1 474883  |
| 2         | John        | Elect Engineering | 200         | Engineering        | Dr. Strange  | +1 474844  |
| 3         | Isaac       | Elect Engineering | 140         | Engineering        | Dr. Strange  | +1 474844  |
| 4         | Emmanuel    | Mech. Engineering | 160         | Engineering        | Dr. Strange  | +1 474844  |
| 5         | Rose        | Medicine          | 160         | Medicine & Surgery | Dr. Jones    | +1 474822  |

The table above presents a list of university students, courses, and departments. It also illustrates the relationships and associations between students, courses, and departments. Additionally, it includes the names and contact details of the department heads.

Developing tables like this that serve multiple purposes causes serious challenges and problems for database systems. The most common of these challenges include:

1. Insert anomaly
2. Update anomaly and
3. Deletion anomaly

Let’s explore these issues with a slightly more detailed approach.

### Insert Anomaly

Insert anomaly occurs when new data is inserted into a table, which then requires the insertion of additional data. Let’s use the Enrollment Table above as an example. In this table, each student is identified by a special ID. But the issue is, before I can add new records for things like courses, I must first put data in the student ID column. This is because it is a PRIMARY KEY and can not be NULL, even if it does not make sense. Essentially, this means I can’t add a new course without enrolling new students, and I can’t enroll new students without giving them an ID. And this ID can’t be left empty. So, I end up stuck — I can’t add a new course unless I also add new student data. This is what we mean by an insert anomaly, where adding one type of information depends on adding another type that shouldn’t be directly connected.

### Update anomaly

An update anomaly occurs when you attempt to update a record in a table column only to discover that this will result in further updates across the table. Let’s go back to the Enrollment Table to see how this happens. In that table, the course name and department info is repeated for every student in that course. This repeating makes the database bigger and harder to keep accurate. Now, let’s say Dr. Harry, the head of the Computing Department, leaves and a new head comes in. I need to change Dr. Harry’s name to the new head’s name everywhere in the table. But I also have to change it for all the students in that department. This is tough because if I miss any students, the table will have wrong info. This is the update anomaly problem. Changing data in one spot causes changes in many other spots.

### Deletion Anomaly

A deletion anomaly is when the deletion of a record of data causes the deletion of more than one set of data required in the database. For instance, let’s consider Emmanuel, a student with the ID number 4, who wants to quit his course. If I remove Emmanuel’s data, it unexpectedly erases records from the Engineering department as well, since they rely on Emmanuel’s ID. This is a case of the deletion anomaly issue. Deleting one set of data causes the removal of other related records too.

So, how can these problems be solved? The answer lies in database normalization.

Normalization optimizes the database design by creating a single purpose for each table. To normalize the Enrollment Table, I need to redesign it. As you discovered earlier, the table’s current design serves three different purposes. So the solution is to split the table in three, essentially, creating a single table for each purpose. This means that I now have a Student Table with information on each student, a Course Table that contains the records for each course, and a Department Table with information for each department. This separation of information helps to solve the anomaly challenges and also makes it easier to write sequel queries in order to search for, sort and analyze data.

## How to Normalize a Database?

To normalize a database table, you need to adhere to three fundamental normalization forms.

1. First Normal Form (1NF)
2. Second Normal Form (2NF)
3. Third Normal Form (3NF)

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

## Examples of 1NF

The main goal of the first normal form is to remove unnecessary repeating data groups by enforcing the concept of data atomicity.

Data atomicity simply means that each column attribute in a table field should have only a single instance value. In simpler terms, your tables should contain only one value per field. By getting rid of these repeating data groups, you can prevent the unnecessary duplication of data in the database. Instances of duplicated data can lead to both data redundancy and inconsistency.

To understand this better, I’ve built an unnormalized table called Course Table within a college database as seen below.

| CourseId | CourseName       | TutorName | TutorSurname | ContactNumbers   |
| -------- | ---------------- | --------- | ------------ | ---------------- |
| 01       | Computer Science | John      | Conor        | 0734222, 0735231 |
| 02       | Backend Dev.     | Thomas    | Jefferson    | 0764252, 0735532 |
| 03       | Frontend Dev.    | John      | Conor        | 0734222, 0735231 |

It includes information about the colleges tech courses, along with the names and contact details of the course tutors.The course ID column serves as the table’s primary key. However, there are multiple values in each row of the contact number column. For every tutor, there exists both a cell phone number and a landline number. The current structure of this table doesn’t conform to the first normal form (1NF) due to the violation of the atomicity principle. To address this, one potential solution is to introduce separate rows for each contact number, as demonstrated below. This adjustment effectively resolves the concern related to data atomicity.

| CourseId | CourseName       | TutorName | TutorSurname | ContactNumber |
| -------- | ---------------- | --------- | ------------ | ------------- |
| 01       | Computer Science | John      | Conor        | 0734222       |
| 01       | Computer Science | John      | Conor        | 0735231       |
| 02       | Backend Dev.     | Thomas    | Jefferson    | 0764252       |
| 02       | Backend Dev.     | Thomas    | Jefferson    | 0735532       |
| 03       | Frontend Dev.    | John      | Conor        | 0734222       |
| 03       | Frontend Dev.    | John      | Conor        | 0735231       |

The table now has just one value in each field. But this solution has also created another problem. The primary key is no longer unique because multiple rows now has the same course ID. Another way that I could solve the problem of atomicity while retaining the primary key is by creating two columns for contact numbers. One column for cell phones and second column for landline numbers as seen below.

| CourseId | CourseName       | TutorName | TutorSurname | MobileNumber | LandlineNumber |
| -------- | ---------------- | --------- | ------------ | ------------ | -------------- |
| 01       | Computer Science | John      | Conor        | 0734222      | 0735231        |
| 02       | Backend Dev.     | Thomas    | Jefferson    | 0764252      | 0735532        |
| 03       | Frontend Dev.    | John      | Conor        | 0734222      | 0735231        |

But I still have the issue of unnecessary repeated groups of data. John Conor is the assigned tutor for two of the courses. His name appears twice in the table as do his contact details. These instances of data will continue to reappear if he’s assigned more courses to teach. It’s likely that his details will appear in other tables within a database system. This means I could have even more groups of repeated data. This creates another problem. If this user changes any of their details, then I’ll have to update their details in this table and all others in which it appears. If I miss any of these tables, then I’ll have inconsistency and invalid data within my database system. To solve this issue, I can redesign my table to adhere to 1NF or first normal form.

First, I identify the repeating groups of data. In this case it is the tutor’s name and contact numbers. Next, I identify the entities I’m dealing with, which are course and tutor. Then I split the course table so that I now have one table for each entity;A course table that contains information about the course and a Tutor’s table that maintains the name and contact numbers of each tutor. Now I need to assign a primary key to the tutor table by introducing a tutor ID column. I’ve solved the problem of data atomicity, but I also need to provide a link between the two tables. I can connect the two tables by using a foreign key. Likewise, I just add the tutor ID column to the course table. Now both tables are linked. I’ve now achieved data atomicity and eliminated unnecessary repeating groups of data. Then the final database then looks like this:

| CourseId | CourseName       | TutorId |
| -------- | ---------------- | ------- |
| 01       | Computer Science | 01      |
| 02       | Backend Dev.     | 02      |
| 03       | Frontend Dev.    | 01      |

| TutorId | TutorName | TutorSurname | MobileNumber | LandlineNumber |
| ------- | --------- | ------------ | ------------ | -------------- |
| 01      | John      | Conor        | 0734222      | 0735231        |
| 02      | Thomas    | Jefferson    | 0764252      | 0735532        |

## Examples of 2NF

Before we delve into second normal form or 2NF, understand that database normalization is a progressive process. So a database has to be in first normal form before you can implement second normal form (2NF). To bring a database to 2NF you need to first understand what is meant by the terms functional and partial dependency.

In a relation (table), a functional dependency occurs when the value of one or more attributes uniquely determines the value of another attribute. In simple terms, if the value of attribute A determines the value of attribute B, then A functionally determines B and B is functionally dependent on A.

Consider a table named “Students” with attributes: StudentID, FirstName, LastName, and Email. Let’s say that StudentID determines both FirstName and LastName.

| StudentId | FirstName | LastName | Email             |
| --------- | --------- | -------- | ----------------- |
| 1         | John      | Smith    | john@example.com  |
| 2         | Emily     | Johnson  | emily@example.com |

Here, StudentID determines the firstname and lastname of each student therefore both first and last names are functionally dependent of studentID.

A partial dependency occurs when an attribute is functionally dependent on only part of a candidate key (OrderID+ProductID) rather than the entire key. In other words, an attribute depends on only a subset of the primary key, leading to redundancy.

A candidate key is a specific type of field in a relational database that can identify each unique record independently of any other data.

Let’s consider a table named “Orders” with attributes: OrderID, ProductID, ProductName, and CustomerID. Suppose that both OrderID and ProductID together uniquely identify ProductName, but ProductName is dependent on ProductID alone and NOT (OrderID+ProductID). In other words, ProductID -> ProductName is a partial dependency because ProductName depends only on part of the candidate key (ProductID), not the whole key (OrderID + ProductID).

| OrderId | ProductId | ProductName | CustomerId |
| ------- | --------- | ----------- | ---------- |
| 1       | 101       | Laptop      | C101       |
| 2       | 102       | Smartphone  | C102       |

Now, what we aim to achieve by implementing second normal form is to avoid instances like partial dependencies as it violates the 2NF rule. Let’s look at how to upgrade this table to 2NF. Looking at the table, the non-key attributes (ProductName) are functionally dependent only on part of the candidate key (ProductID), which leads to partial dependency. To achieve 2NF, we’ll need to split the table into two tables: one for Orders and another for Products and then link these 2 tables using a foreign key. By doing this, we end up with the following tables:

| OrderId | ProductId | CustomerId |
| ------- | --------- | ---------- |
| 1       | 101       | C101       |
| 2       | 102       | C102       |

| ProductId | ProductName |
| --------- | ----------- |
| 101       | Laptop      |
| 102       | Smartphone  |

Finally, we have the non-key attributes (ProductName) depending on ProductID, and CustomerID dependening on OrderID, with this we ’ve eliminated all unnecessary replication of data table. The 2 tables are now in the second normal form, or 2NF.

## Examples of 3NF

For a relation (table) in a database to be in the third normal form, it must already be in the second normal form (2NF) and no non-key attribute is transitively dependent on the candidate key.

Transitive dependency occurs when a non-key attribute depends on another non-key attribute, which itself depends on the candidate key. In other words, the value of a non-key attribute is indirectly determined by the candidate key through another non-key attribute. Let’s take a look at this Employees table which is already in 2NF.

| EmployeeId | DepartmentId | DepartmentName |
| ---------- | ------------ | -------------- |
| 1          | 101          | HR             |
| 2          | 102          | IT             |

In this example DepartmentName depends on DepartmentID, and DepartmentID depends on EmployeeID. This is a case of transitive dependency.

To achieve 3NF, we want to remove the transitive dependencies by creating separate tables. Let’s use the “Employees” example to illustrate this process.

To remove the transitive dependency and achieve 3NF, we create separate tables for employees and departments.

| EmployeeId | DepartmentId |
| ---------- | ------------ |
| 1          | 101          |
| 2          | 102          |

| DepartmentId | DepartmentName |
| ------------ | -------------- |
| 101          | HR             |
| 102          | IT             |

Now, DepartmentName is no longer transitively dependent on EmployeeID. Instead, it is directly dependent on DepartmentID.

By splitting the original table into two normalized tables, we’ve achieved 3NF. Each table now represents a distinct entity, and the transitive dependency has been eliminated, ensuring data integrity and reducing redundancy.

## Transitive dependency vs partial dependency

What’s the difference between transitive and partial dependency, from the examples above, they are almost same thing.

The key difference be is this.

Partial dependency occurs when a non-key attribute depends on only part of the candidate key. In other words, a non-key attribute depends on only some, but not all, attributes of the candidate key, the candidate key here is most times a composite primary key. This leads to redundancy and is typically resolved by decomposing the table into smaller tables.

For example, in a table with attributes (A, B, C), if B is part of the candidate key A+B but non-key attribute C depends only on A, then it’s a case of partial dependency.

Transitive dependency, on the other hand, occurs when a non-key attribute depends on another non-key attribute, which itself depends on the candidate key. In transitive dependency, the non-key attribute is indirectly determined by the candidate key through an intermediate non-key attribute.

For example, in a table with attributes (A, B, C, D), if non-key attribute D depends on B, and B depends on the candidate key (A), then it’s a case of transitive dependency.

The key difference lies in the nature of the dependency chain:

- Partial Dependency involves a direct dependency of a non-key attribute on part of the candidate key.

- Transitive Dependency involves an indirect dependency of a non-key attribute on the candidate key through an intermediate non-key attribute.

In practice, both partial and transitive dependencies violate higher normal forms (2NF, 3NF) because they lead to redundancy and anomalies. They are resolved by breaking down the original table into smaller, normalized tables to eliminate these dependency issues and improve data integrity.
