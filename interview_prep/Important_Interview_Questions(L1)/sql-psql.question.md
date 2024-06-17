### [1] What are the types of SQL statements?

SQL statements include Data Definition Language (DDL), Data Manipulation Language (DML), Data Control Language (DCL), and Transaction Control Language (TCL).

### [2] What is a primary key?

A primary key is a unique identifier for each record in a table. It ensures that there are no duplicate records and provides a way to uniquely identify each record.

### [3] What is a foreign key?

A foreign key is a field in a table that refers to the primary key in another table. It establishes a relationship between two tables by enforcing referential integrity.

### [4] What is normalization?

Normalization is the process of organizing data in a database to reduce redundancy and dependency by dividing large tables into smaller tables and defining relationships between them.

### [5] What is denormalization?

Denormalization is the process of adding redundant data to a database to improve performance by avoiding costly joins, especially in read-heavy applications.

### [6] What is a JOIN in SQL?

A JOIN is used to combine rows from two or more tables based on a related column between them.

### [7] What are the different types of JOINs?

INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.

### [8] What is an index?

An index is a database object that improves the speed of data retrieval operations on a table by providing quick access to the rows.

### [9] What is the difference between clustered and non-clustered index?

In a clustered index, the physical order of the rows in the table matches the order of the key values, while in a non-clustered index, the physical order of the rows does not match the key values.

### [10] What is a subquery?

A subquery is a query nested inside another query. It can be used to return data that will be used in the main query.

**Important Concepts**

### [11] What is a stored procedure?

A stored procedure is a prepared SQL code that can be saved and reused. It allows for better performance and code reusability.

```postgresql
CREATE OR REPLACE PROCEDURE get_high_salary_employees (IN threshold NUMERIC)
AS $$
BEGIN
    SELECT first_name, last_name
    FROM employees
    WHERE salary > threshold;
END;
$$ LANGUAGE plpgsql;

CALL get_high_salary_employees(60000);
```

### [12] What is a trigger?

A trigger is a set of SQL statements that automatically "fires" or executes when certain events occur in a database, such as INSERT, UPDATE, or DELETE operations on a table.
````postgresql
-- Create a trigger function
CREATE OR REPLACE FUNCTION update_salary()
RETURNS TRIGGER AS $$
BEGIN
    NEW.salary := NEW.salary * 1.1; -- Increase salary by 10%
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger function to the employees table
CREATE TRIGGER update_salary_trigger
BEFORE INSERT ON employees
FOR EACH ROW
EXECUTE FUNCTION update_salary();
````
### [13] What is the difference between DELETE and TRUNCATE?

DELETE removes rows from a table based on a condition, while TRUNCATE removes all rows from a table without considering any conditions. DELETE is a DML command, while TRUNCATE is a DDL command.

### [14] What is a view?

A view is a virtual table based on the result of a SELECT query. It allows users to query the data in the view as if it were a normal table.

### [15] What is ACID in SQL?

ACID stands for Atomicity, Consistency, Isolation, and Durability, which are the four properties that ensure database transactions are processed reliably.

### [16] What is the purpose of the TRANSACTION keyword?

The TRANSACTION keyword is used to define a set of SQL statements that are treated as a single unit of work. It ensures data consistency and integrity by allowing changes to be rolled back if an error occurs.

```postgresql
-- Perform database operations
BEGIN TRANSACTION;

-- Perform database operations
UPDATE employees SET salary = salary * 1.1 WHERE department = 'Sales';
DELETE FROM orders WHERE order_date < '2023-01-01';
INSERT INTO audit_log (action, timestamp) VALUES ('Data cleanup', NOW());

-- Check if operations were successful
-- If successful, commit the transaction
COMMIT TRANSACTION;

-- If any errors occurred, rollback the transaction
-- This will undo all changes made within the transaction
ROLLBACK TRANSACTION;
```

### [17] What is the difference between UNION and UNION ALL?

UNION merges the results of two or more SELECT queries and removes duplicate rows, while UNION ALL does the same but retains duplicate rows.

```postgresql
-- UNION keyword
SELECT name, department FROM employees
UNION
SELECT name, department FROM managers;
```



### [18] What is the purpose of the DISTINCT keyword?

The DISTINCT keyword is used to retrieve unique values from a query result set, eliminating duplicate rows.

### [19] What is the CHECK constraint?

The CHECK constraint is used to enforce domain integrity by limiting the values that can be stored in a column. It specifies a condition that must be true for each row in the table.

### [20] What is the purpose of the ORDER BY clause?

The ORDER BY clause is used to sort the result set of a SELECT statement in ascending or descending order based on one or more columns.

```postgresql
--ORDER BY clause
SELECT * FROM students ORDER BY grade ASC, age DESC;
```

### [20] What is the difference between CASCADE and SET NULL in foreign key constraints?

CASCADE automatically deletes or updates related rows in child tables when a parent row is deleted or updated, while SET NULL sets the foreign key columns in child tables to NULL when the corresponding parent row is deleted or updated.





