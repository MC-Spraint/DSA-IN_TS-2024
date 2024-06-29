-- Advanced

-- Stored procedure
CREATE OR REPLACE PROCEDURE get_high_salary_employees (IN threshold NUMERIC)
AS $$
BEGIN
    SELECT first_name, last_name
    FROM employees
    WHERE salary > threshold;
END;
$$ LANGUAGE plpgsql;

CALL get_high_salary_employees(60000);


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


-- Transactions
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


-- CHECK constraints
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    salary NUMERIC,
    -- Add a CHECK constraint to ensure salary is positive
    CHECK (salary > 0)
);
