-- -- -- ### Sub Tables ### -- -- --
-- Return department_name, employee_name and salary of the top 3 highest-paid employees from each department
-- [Department Table:]
-- id: A unique identifier for each department.
-- name: The name of the department.

-- [Employee Table]
-- id: A unique identifier for each employee.
-- name: The name of the employee.
-- salary: The salary of the employee.
-- departmentid: A foreign key referencing the department the employee belongs to.

-- Window Pattern
WITH salary_ranks AS 
(
  SELECT
    e.id,
    d.id,
    e.name as employee_name,
    d.name,
    e.salary,
    DENSE_RANK() OVER (
      PARTITION BY
        e.departmentid 
      ORDER BY 
        e.salary DESC
    ) AS sal_rank
  FROM
    Employee AS e
  LEFT JOIN 
    Department AS d
  ON d.id = e.departmentId
)
SELECT DISTINCT
  name as Department,
  employee_name as Employee,
  salary as Salary
FROM
  salary_ranks
WHERE 
  sal_rank < 4


WITH friends AS (
    SELECT 
        accepter_id
    FROM
        RequestAccepted
    UNION ALL
    SELECT 
        requester_id
    FROM
        RequestAccepted
) 
SELECT
    accepter_id as id,
    COUNT(accepter_id) as num
FROM
    friends
GROUP BY
    accepter_id
ORDER BY
    num DESC
LIMIT 1


WITH filtered_users AS 
(
    SELECT *
    FROM
        users
    WHERE
        age >= 12
    ORDER BY
        age ASC
    OFFSET 2
    LIMIT 5
)
SELECT
    age AS _id,
    AVG(age) AS avg,
    ARRAY_AGG(username) AS usernames,
    ARRAY_AGG(email) AS emails
FROM
    filtered_users
GROUP BY 
    age;

-- -- -- ### Nested Query ### -- -- --
-- NOT IN
SELECT
    employee_id
FROM
    Employees
WHERE
    manager_id
        NOT IN
        (
        SELECT
            employee_id
        FROM
            Employees
        )
    AND
    salary < 30000
ORDER BY 
    employee_id

-- IN
SELECT
    activity_date AS day,
    COUNT(DISTINCT user_id) AS active_users
FROM
    Activity
WHERE
    activity_date
    IN
    (
    SELECT
        activity_date
    FROM
        Activity
    WHERE
        activity_date
    BETWEEN
        date '2019-07-27' 
        - interval '29 day' -- start date meaning 29 days before the current date
    AND
        '2019-07-27'
    )
GROUP BY activity_date;

-- -- -- ### Join Tables ### -- -- --
--LEFT JOIN
SELECT 
    p.product_id, 
    COALESCE(
        ROUND(
            SUM(p.price * u.units)::numeric / SUM(u.units)
        , 2)
    , 0) AS average_price
FROM 
    Prices p 
LEFT JOIN 
    UnitsSold u
ON 
    p.product_id = u.product_id 
AND 
    u.purchase_date BETWEEN p.start_date AND p.end_date
GROUP BY 
    p.product_id;

--RIGHT JOIN
SELECT p.project_id,
    ROUND(AVG(e.experience_years), 2) as average_years
FROM
    Project as p
RIGHT JOIN
    Employee as e
ON
    e.employee_id = p.employee_id
WHERE
    p.project_id IS NOT NULL
GROUP BY 
    p.project_id
ORDER BY
    p.project_id

--SELF JOIN
SELECT
    e.employee_id,
    e.name,
    COUNT(r.employee_id) AS reports_count,
    ROUND(AVG(r.age)) AS average_age
FROM
    Employees e
JOIN
    Employees r
ON
    e.employee_id = r.reports_to
GROUP BY
    e.employee_id, e.name
ORDER BY
    e.employee_id;





SELECT name, population, area 
FROM World
WHERE area >= 3000000 OR
population >= 25000000


SELECT name FROM Customer
WHERE referee_id IS NULL OR
referee_id <> 2


SELECT product_id FROM Products
WHERE low_fats = "Y" AND
recyclable = "Y";


SELECT
    tweet_id
FROM
    Tweets
WHERE 
    LENGTH(content) > 15;


SELECT DISTINCT 
    author_id as id
FROM
    Views
WHERE
    author_id = viewer_id
ORDER BY id ASC


SELECT *
FROM
    Cinema
WHERE 
    description <> "boring"
    AND
    id % 2 = 1
ORDER BY 
    rating DESC


SELECT
    *,
    CASE
        WHEN x + y > z AND y + z > x AND x + z > y
        THEN 'Yes'
        ELSE 'No'
    END as triangle
FROM
    Triangle;


SELECT
    CASE 
        WHEN
            salary < 3000
        THEN 
            'Low'
        WHEN 
            salary BETWEEN 3000 AND 6000 
        THEN 'Medium'
        ELSE 'High'
    END AS salary_range
FROM
    employees;
















