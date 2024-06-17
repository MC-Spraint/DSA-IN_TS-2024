SELECT name, population, area FROM World
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

SELECT
  name as Department,
  employee_name as Employee,
  salary as Salary
FROM
  salary_ranks
WHERE 
  sal_rank < 4

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

SELECT
    *,
    CASE
        WHEN x + y > z AND y + z > x AND x + z > y
        THEN 'Yes'
        ELSE 'No'
    END as triangle
FROM
    Triangle;

--Self join
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



SELECT p.project_id,
ROUND(AVG(e.experience_years), 2) as average_years FROM Project as p
RIGHT JOIN Employee as e
ON
e.employee_id = p.employee_id
WHERE p.project_id IS NOT NULL
GROUP BY p.project_id
ORDER BY p.project_id


SELECT 
    p.product_id, 
    COALESCE(ROUND(SUM(p.price * u.units)::numeric / SUM(u.units), 2), 0) AS average_price
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
-- Group each accepter_id and count
SELECT
    accepter_id as id,
    COUNT(accepter_id) as num
FROM
    friends
GROUP BY
    accepter_id
-- Get max num
ORDER BY
    num DESC
LIMIT 1

-- Window Pattern
SELECT
    activity_date AS day,
    COUNT(DISTINCT user_id) AS             active_users
FROM
    Activity
WHERE
    activity_date
    IN(
    SELECT
        activity_date
    FROM
        Activity
    WHERE
        activity_date
    BETWEEN
        date '2019-07-27'
        - interval '29 day' 
    AND
        '2019-07-27')
GROUP BY activity_date;

WITH salary_ranks AS (
  SELECT
    e.id,
    d.id,
    d.name,
    e.name as employee_name,
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
  ON d.id = e.departmentid
)