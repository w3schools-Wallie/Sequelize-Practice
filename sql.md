## Brief

### Preparation

Installation check of SQL (PostgreSQL or MySQL) will be done during the first part of the session. Instructor to assist learners for any issues in installation.

### Lesson Overview

This lesson will focus on relational databases and SQL as a Relational Database Management System (RDBMS). The first part will discuss what is a relational database, the next part will focus on creating databases and tables, and the last part will focus on CRUD operations and basic join queries.

---

## Part 1 - Relational Databases

A relational database is a type of database that stores and provides access to data points that are related to one another.

A relational database has the following properties:
- Stores related data in tables in the form of columns and rows
- Fixed number of columns (data attributes)
- Variable number of rows
- Relationship between tables
- Unique identifiers for each row (Primary Key)
- Foreign Keys to reference Primary Keys (PK) of other tables

<img src="./assets/relationalDB.png" />

### Relationships

Tables can be related to other tables through their relationships. There are three different kinds of relationship:

1. One to One - Each table can have only one matching row in the other table.
    - Example: A **Person** has a single **Birth certificate**, and that **Birth certificate** can only belong to a single **Person**.
2. One to many - A table can have multiple matching rows in another.
    - Example: An **Author** has written many **Books**, but a **Book** can only have one **Author**
3. Many to many - Each side of the relationship can contain multiple rows.
    - Example: An **Item** can be found in multiple **Carts**, and a **Cart** can have multiple **Items** in it.

### Entity-Relationship Diagram

An Entity-Relationship Diagram (ERD) is a diagram used in database design that contains symbols and connectors that visualize two important information: 
- The major entities (tables) 
- The relationships betwen the entities.

This is useful in planning out how the database would be structured and it also highlights how everything is connected.

### RDBMS

To access relational databases, an RDBMS is needed. RDBMS stands for Relational Database Management System. The RDBMS manages the database through a language to allow users to execute queries.

An example of an RDBMS is SQL (Structured Query Language). 

---

## Part 2 - Data Definition Language

Structured Query Language (SQL) is a database language by the use of which we can perform certain operations on the existing database. SQL can also be used to create a database and tables in a database.

SQL commands are mainly categorized into five categories as: 
- DDL – Data Definition Language
- DQL – Data Query Language
- DML – Data Manipulation Language
- DCL – Data Control Language
- TCL – Transaction Control Language

*For the lesson, the focus will be on DDL to create databases and DML to manipulate data in the database.*

Each statement in SQL have keywords and the values needed by the keywords. All statements end with a semicolon (;).

Data Definition Language actually consists of the SQL commands that can be used to define the database schema. It simply deals with descriptions of the database schema and is used to create and modify the structure of database objects in the database.

### Creating databases

The `CREATE DATABASE` statement is used to create a new SQL database.

Syntax:
`CREATE DATABASE database_name;`

```sql
CREATE DATABASE ecommerce;
```

### Accessing databases

To access a database, the `USE` statement is used. This is done before any query or transaction can be done inside a databases

`USE ecommerce;`

### Creating tables

The `CREATE TABLE` statement is used to create a new table in a database.

Syntax:
```
CREATE TABLE table_name (
    column1 datatype constraint,
    column2 datatype constraint,
    column3 datatype constraint,
   ....
);
```

The column parameters specify the names of the columns of the table.

The datatype parameter specifies the type of data the column can hold (e.g. varchar, integer, date, etc.).

*This [link](https://www.w3schools.com/sql/sql_datatypes.asp) shows the SQL data types*

The constraints are used to limit the type of data that can go into a table. 

This ensures the accuracy and reliability of the data in the table. If there is any violation between the constraint and the data action, the action is aborted.

Constraints can be column level or table level. Column level constraints apply to a column, and table level constraints apply to the whole table.

The following constraints are commonly used in SQL:

- NOT NULL - Ensures that a column cannot have a NULL value
- UNIQUE - Ensures that all values in a column are different
- PRIMARY KEY - A combination of a NOT NULL and UNIQUE. Uniquely identifies each row in a table
- FOREIGN KEY - Prevents actions that would destroy links between tables
- DEFAULT - Sets a default value for a column if no value is specified

```sql
CREATE TABLE categories (
    id SERIAL NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE items (
    id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    description TEXT,
    category_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) 
        REFERENCES categories(id)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);
```

The foreign key references another table's primary key. This is useful for establishing relationships between tables. The `ON DELETE` and `ON UPDATE` constraints define what happens to a row in the table when the parent is updated or deleted.

*Note: mySQL uses AUTO_INCREMENT constraint instead of the SERIAL data type*

### Altering Tables

The `ALTER TABLE` statement is used to add, delete, or modify columns in an existing table.

The `ALTER TABLE` statement is also used to add and drop various constraints on an existing table.

Syntax:
```
ALTER TABLE table_name
ADD column_name datatype;

ALTER TABLE table_name
DROP COLUMN column_name;

ALTER TABLE table_name
RENAME COLUMN old_name to new_name;
```

### Deleting Tables

The DROP TABLE statement is used to drop/delete an existing table in a database. Note that it removes all existing data in the table so be very careful in using this command.

Syntax:
```
DROP TABLE table_name;
```

---

## Part 3 - Querying for Data

After the database and tables have been written, data can now be inserted, read, and manipulated. This is where the Data Manipulation Language comes in. 

The SQL commands that deals with the manipulation of data present in the database belong to DML or Data Manipulation Language and this includes most of the SQL statements.

There are four operations involved in data querying and manipulation and they are collectively known as the **CRUD** (Create, Retrieve, Update, Delete) operations

### Creating new entries

The INSERT INTO statement is used to insert new records in a table. This can be done by specify both the column names and the values to be inserted.

Syntax:
```
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

Example:
```sql
INSERT INTO categories (name) VALUES ('fruits');
INSERT INTO categories (name) VALUES ('vegetables');
```

Note that the id column / field doesn't need have to have values. This is because when the table was created, the id field was made into `SERIAL`, which means it adds automatically a new id for each new row.

```sql
INSERT INTO items (name, price, description) VALUES ('Banana', 18.75, 'A bunch of yellow bananas');
INSERT INTO items (name, price, description) VALUES ('Strawberry', 70.99, 'Fresh strawberries');
INSERT INTO items (name, price, description) VALUES ('Celery', 5.00, 'A sprig of celery');
```

### Querying entries

The `SELECT` statement is used to select data from a database.

The data returned is stored in a result table, called the result-set.

Syntax
```
SELECT column1, column2, ...
FROM table_name
WHERE columnx = value;
```
Column1, column2, ... are the field names of the table to select data from.

The WHERE clause is an optional clause that is used to filter records. It is used to extract only those records that fulfill a specified condition.

To select all the fields available in the table, use the following syntax:

Syntax:
```
SELECT *
FROM table_name
WHERE columnx = value;
```

Example:
```sql
SELECT * FROM categories;

SELECT name, price FROM items;

SELECT * FROM items WHERE name = 'Banana';

SELECT * FROM items WHERE price > 10;
```

### Updating entries

The `UPDATE` statement is used to modify the existing records in a table.

Syntax:
```
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

The `SET` clause applies new values to specific columns of the rows. The `WHERE` clause is important as it determines which rows would be affected by the update.

Example:
```sql
UPDATE items SET category_id = 1 WHERE name = 'Banana';
UPDATE items SET category_id = 1 WHERE name = 'Strawberry';
UPDATE items SET category_id = 2 WHERE name = 'Celery';
```

### Deleting queries

The `DELETE` statement is used to delete existing records in a table.

Syntax:
```
DELETE FROM table_name WHERE condition;
```

The `WHERE` clause is important here as it would determine which rows are to be deleted.

Example:
```sql
DELETE FROM items WHERE name = 'Strawberry';
SELECT * FROM items;
```

### Reading data from two or more tables

Data can be read from two or more tables using the `JOIN` clause. This is useful as data that is required is often found in multiple tables.

```Syntax
SELECT columns FROM tableA JOIN tableB ON condition
```

Example:
```sql
SELECT c.name, i.name, i.description 
FROM categories c 
JOIN items i
ON i.category_id = c.id; 
```

This code joins the categories and items tables and gets the value of the name columns and description columns of the respective tables.