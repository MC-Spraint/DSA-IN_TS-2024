
-- INNER JOIN 
SELECT e.first_name, e.last_name, d.name AS department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

--LEFT JOIN
SELECT e.first_name, e.last_name, COALESCE(d.name, 'No Department') AS department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;

--RIGHT JOIN
SELECT e.first_name, e.last_name, COALESCE(d.name, 'No Department') AS department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;

--FULL OUTER JOIN
SELECT e.first_name, e.last_name, COALESCE(d.name, 'No Department') AS department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;

--CROSS JOIN
SELECT e.first_name, e.last_name, d.name AS department_name
FROM employees e
CROSS JOIN departments d;




-- Required Tables
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    department_id INT REFERENCES departments(id)
);

-- Practice

SELECT d.name AS department_name, COALESCE(emp_count, 0) AS employee_count
FROM departments d
LEFT JOIN (
    SELECT department_id, COUNT(*) AS emp_count
    FROM employees
    GROUP BY department_id
) AS subquery ON d.id = subquery.department_id
RIGHT JOIN (
    SELECT id, 0 AS emp_count
    FROM departments
) AS right_subquery ON d.id = right_subquery.id;



WITH department_employees AS (
    SELECT d.name AS department_name, e.first_name, e.last_name
    FROM departments d
    JOIN employees e ON d.id = e.department_id
)
SELECT * FROM department_employees;




WITH department_employees AS (
    SELECT d.name AS department_name, e.first_name, e.last_name
    FROM departments d
    JOIN employees e ON d.id = e.department_id
)
SELECT * FROM department_employees;


SELECT first_name, last_name, salary,
       RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rank_within_department
FROM employees;



SELECT id, first_name, last_name,
       json_build_object('id', id, 'name', first_name || ' ' || last_name) AS employee_json
FROM employees;


SELECT id, first_name, last_name,
       ARRAY[first_name, last_name] AS name_array
FROM employees;



-- An INNER JOIN selects records that have matching values in both tables.
-- It returns rows when there is at least one match in both tables based on the join condition.
-- If there is no match found, the row will not be included in the result set.
-- Syntax: SELECT * FROM table1 INNER JOIN table2 ON table1.column = table2.column;


-- A LEFT JOIN or LEFT OUTER JOIN returns all records from the left table (table1), and the matched records from the right table (table2).
-- If there is no match found, NULL values are returned from the right table.
-- Syntax: SELECT * FROM table1 LEFT JOIN table2 ON table1.column = table2.column;
-- RIGHT JOIN (or RIGHT OUTER JOIN):

-- A RIGHT JOIN or RIGHT OUTER JOIN returns all records from the right table (table2), and the matched records from the left table (table1).
-- If there is no match found, NULL values are returned from the left table.
-- Syntax: SELECT * FROM table1 RIGHT JOIN table2 ON table1.column = table2.column;
-- FULL OUTER JOIN (or FULL JOIN):

-- A FULL OUTER JOIN returns all records when there is a match in either the left (table1) or right (table2) table.
-- If there is no match found, NULL values are returned from the opposite table.
-- Syntax: SELECT * FROM table1 FULL OUTER JOIN table2 ON table1.column = table2.column;
-- CROSS JOIN (or Cartesian Join):

-- A CROSS JOIN returns the Cartesian product of the two tables, meaning it combines each row of the first table with each row of the second table.
-- It does not require any matching condition.
-- Syntax: SELECT * FROM table1 CROSS JOIN table2;



