-- SAMPLE QUERIES

USE employee_db;

SELECT e.id AS employee_id, e.first_name, e.last_name, r.title, d.name as department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employees AS e
JOIN roles AS r
ON e.role_id = r.id
JOIN departments as d
ON r.department_id = d.id
LEFT JOIN employees as m
ON e.manager_id = m.id
ORDER BY employee_id;

SELECT e.id AS employee_id, e.first_name, e.last_name, r.title, d.name as department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employees AS e
JOIN roles AS r
ON e.role_id = r.id
JOIN departments as d
ON r.department_id = d.id
LEFT JOIN employees as m
ON e.manager_id = m.id
WHERE d.name = "Sales"
ORDER BY employee_id;

SELECT SUM(r.salary)
FROM employees AS e
JOIN roles AS r
ON e.role_id = r.id
JOIN departments as d
ON r.department_id = d.id
WHERE d.name = "Sales";

SELECT e.id AS employee_id, e.first_name, e.last_name, r.title, d.name as department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employees AS e
JOIN roles AS r
ON e.role_id = r.id
JOIN departments as d
ON r.department_id = d.id
LEFT JOIN employees as m
ON e.manager_id = m.id
WHERE m.first_name = "Paolo" AND m.last_name = "Pasolini"
ORDER BY employee_id;

INSERT INTO roles (title, salary, department_id)
VALUES ('Junior Developer', 75000, (SELECT id FROM departments WHERE name = 'Engineering'));


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Samiul', 'Choudhury', (SELECT id FROM roles WHERE title = 'Software Engineer'), (SELECT id FROM employees WHERE first_name = 'Paolo' AND last_name = 'Pasolini'));

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES (?, ?, (SELECT id FROM roles WHERE title = 'Software Engineer'), 1);

SELECT id
FROM employees
WHERE first_name = 'Paolo' AND last_name = 'Pasolini';

UPDATE employees
SET role_id = (SELECT id FROM roles WHERE title = 'Lead Engineer')
WHERE first_name = 'poi' AND last_name = 'ada';