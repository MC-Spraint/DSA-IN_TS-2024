-- Departments Table
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY, 
    department_name VARCHAR(50) NOT NULL UNIQUE
);

-- Employees Table
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hire_date DATE DEFAULT CURRENT_DATE,
    salary DECIMAL(10, 2) CHECK (salary > 0),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE
);
SELECT
    employee_id,
    department_id,
    salary,
    RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank,
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as dense_rank,
    PERCENT_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as percent_rank,
    LAG(salary, 1) OVER (PARTITION BY department_id ORDER BY salary DESC) as prev_salary,
    LEAD(salary, 1) OVER (PARTITION BY department_id ORDER BY salary DESC) as next_salary
FROM
    employees;


-- Date/Time Functions
SELECT CURRENT_DATE AS current_date;

SELECT CURRENT_TIMESTAMP AS current_timestamp;

SELECT AGE('2024-06-02', '2000-01-01') AS age_difference;

SELECT DATE_PART('year', CURRENT_DATE) AS current_year;

SELECT EXTRACT(MONTH FROM CURRENT_DATE) AS current_month;

SELECT TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD') AS formatted_date;

SELECT NOW() AS current_datetime;

-- Mathematical Functions
SELECT ABS(-15) AS absolute_value;

SELECT CEIL(4.2) AS ceiling_value;

SELECT FLOOR(4.8) AS floor_value;

SELECT ROUND(4.5) AS rounded_value;

SELECT POWER(2, 3) AS power_value;

SELECT SQRT(16) AS square_root;

SELECT MOD(10, 3) AS remainder;

-- Conditional Functions
SELECT COALESCE(NULL, NULL, 'default') AS first_non_null;

SELECT NULLIF(10, 10) AS result;



-- String Functions
SELECT LENGTH('Hello') AS string_length;

SELECT SUBSTRING('Hello, world!', 1, 5) AS substring;

SELECT CONCAT('Hello', ', ', 'world!') AS full_string;

SELECT UPPER('hello') AS upper_string;

SELECT LOWER('HELLO') AS lower_string;

SELECT TRIM('   Hello   ') AS trimmed_string;

SELECT REPLACE('Hello, world!', 'world', 'PostgreSQL') AS replaced_string;

SELECT POSITION('world' IN 'Hello, world!') AS position;

-- Aggregate Functions
SELECT AVG(salary) AS avg_salary FROM employees;

SELECT SUM(salary) AS total_salary FROM employees;

SELECT MAX(salary) AS max_salary FROM employees;

SELECT MIN(salary) AS min_salary FROM employees;

SELECT COUNT(*) AS total_employees FROM employees;

SELECT BIT_OR(flags) AS bitwise_or FROM flags_table; 

-- 6. ARRAY_AGG() - Collects values into an array SELECT ARRAY_AGG(employee_name) AS employee_names FROM employees; 

-- 7. STRING_AGG() - Concatenates values into a string, with an optional delimiter 
SELECT STRING_AGG(employee_name, ', ') AS employee_names FROM employees; 

-- 12. JSON_AGG() - Aggregates values as a JSON array 
SELECT JSON_AGG(employee) AS employees_json FROM employees; 

-- 13. JSONB_AGG() - Aggregates values as a JSONB array 
SELECT JSONB_AGG(employee) AS employees_jsonb FROM employees; 

-- 14. JSON_OBJECT_AGG() - Aggregates key/value pairs as a JSON object 
SELECT JSON_OBJECT_AGG(id, employee_name) AS employee_map FROM employees; 

-- 15. JSONB_OBJECT_AGG() - Aggregates key/value pairs as a JSONB object 
SELECT JSONB_OBJECT_AGG(id, employee_name) AS employee_map FROM employees; 

-- 16. MODE() - Returns the most frequent value SELECT MODE() WITHIN GROUP (ORDER BY salary) AS mode_salary FROM employees;


SELECT
    department_id,
    SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END) as male_count,
    SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END) as female_count
FROM
    employees
GROUP BY
    department_id;


SELECT
    month,
    amount,
    AVG(amount) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS rolling_avg
FROM Sales;

SELECT
    date,
    temperature,
    AVG(temperature) OVER (ORDER BY date RANGE BETWEEN INTERVAL '6' DAY PRECEDING AND CURRENT ROW) AS moving_avg
FROM TemperatureReadings;
SELECT
    month,
    amount,
    AVG(amount) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS rolling_avg
FROM Sales;

SELECT
    employee_id,
    department_id,
    salary,
    RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank,
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as dense_rank,
    PERCENT_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as percent_rank,
    LAG(salary, 1) OVER (PARTITION BY department_id ORDER BY salary DESC) as prev_salary,
    LEAD(salary, 1) OVER (PARTITION BY department_id ORDER BY salary DESC) as next_salary
FROM
    employees;


-- Constraints
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL,
    UNIQUE (department_name)
);
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,  -- PRIMARY KEY and AUTO_INCREMENT
    first_name VARCHAR(50) NOT NULL,             -- NOT NULL constraint
    last_name VARCHAR(50) NOT NULL,              -- NOT NULL constraint
    email VARCHAR(100) UNIQUE NOT NULL,          -- UNIQUE and NOT NULL constraint
    hire_date DATE DEFAULT CURRENT_DATE,         -- DEFAULT constraint
    salary DECIMAL(10, 2) CHECK (salary > 0),    -- CHECK constraint
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
    ON DELETE SET NULL                           -- FOREIGN KEY constraint with ON DELETE action
    ON UPDATE CASCADE                            -- FOREIGN KEY constraint with ON UPDATE action
);
-- Insert into departments table
INSERT INTO departments (department_name) VALUES
    ('Sales'),
    ('Marketing'),
    ('Engineering'),
    ('Human Resources'),
    ('Finance'),
    ('IT'),
    ('Customer Support'),
    ('Legal'),
    ('Operations');

-- Insert into employees table
INSERT INTO employees (first_name, last_name, email, salary, department_id) VALUES
    ('John', 'Doe', 'john.doe@example.com', 50000.00, 1),
    ('Jane', 'Smith', 'jane.smith@example.com', 60000.00, 2),
    ('David', 'Lee', 'david.lee@example.com', 75000.00, 3),
    ('Sarah', 'Jones', 'sarah.jones@example.com', 45000.00, 4),
    ('Michael', 'Brown', 'michael.brown@example.com', 80000.00, 5),
    ('Emily', 'Davis', 'emily.davis@example.com', 65000.00, 6),
    ('Daniel', 'Wilson', 'daniel.wilson@example.com', 55000.00, 7),
    ('Olivia', 'Taylor', 'olivia.taylor@example.com', 90000.00, 8),
    ('James', 'Anderson', 'james.anderson@example.com', 70000.00, 9),
    ('Christopher', 'Martinez', 'christopher.martinez@example.com', 52000.00, 1),
    ('Amanda', 'Garcia', 'amanda.garcia@example.com', 62000.00, 2),
    ('Joseph', 'Rodriguez', 'joseph.rodriguez@example.com', 78000.00, 3),
    ('Barbara', 'Clark', 'barbara.clark@example.com', 48000.00, 4),
    ('Charles', 'Walker', 'charles.walker@example.com', 85000.00, 5),
    ('Marie', 'Perez', 'marie.perez@example.com', 68000.00, 6),
    ('Jennifer', 'Hall', 'jennifer.hall@example.com', 58000.00, 7),
    ('Andrew', 'Young', 'andrew.young@example.com', 95000.00, 8),
    ('Thomas', 'Lee', 'thomas.lee@example.com', 72000.00, 9),
    ('Joshua', 'Wright', 'joshua.wright@example.com', 54000.00, 1),
    ('Brittany', 'Lopez', 'brittany.lopez@example.com', 64000.00, 2);
    
SELECT
    employee_id,
    department_id,
    salary,
    RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank,
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as dense_rank,
    PERCENT_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as percent_rank,
    LAG(salary, 1) OVER (PARTITION BY department_id ORDER BY salary DESC) as prev_salary,
    LEAD(salary, 1) OVER (PARTITION BY department_id ORDER BY salary DESC) as next_salary
FROM
    employees;
    
    