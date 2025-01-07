-- 1. Find all users with "admin" role
SELECT * 
FROM users 
WHERE data -> 'roles' @> '[{"role": "admin"}]';

-- 2. Find all products with a price greater than 100
SELECT * 
FROM products 
WHERE data -> 'price' > 100;

-- 3. Find all orders with a status of "shipped"
SELECT * 
FROM orders 
WHERE data ->> 'status' = 'shipped';

-- 4. Find all users who have "email" and "phone" in their contact information
SELECT * 
FROM users 
WHERE 
    data ? 'email' 
    AND 
    data ? 'phone';

-- 5. Find all products with a "color" that includes "red"
SELECT * 
FROM products 
WHERE data -> 'colors' @> '[{"color": "red"}]';

-- 6. Update the "status" of an order to "delivered"
UPDATE orders 
SET data = jsonb_set(data, '{status}', '"delivered"', true) 
WHERE order_id = 1;

-- 7. Add a new key-value pair to the "metadata" object
UPDATE users 
SET data = jsonb_set(data, '{metadata, newKey}', '"newValue"', true) 
WHERE user_id = 1;

-- 8. Find all orders with a total amount greater than 100
SELECT * 
FROM orders 
WHERE (data -> 'totalAmount')::numeric > 100;

-- 9. Find all users who have subscribed to the newsletter
SELECT * 
FROM users 
WHERE data -> 'preferences' ->> 'newsletter' = 'true';

-- 10. Find all products with a discount greater than 10%
SELECT * 
FROM products 
WHERE (data -> 'discount')::numeric > 10;