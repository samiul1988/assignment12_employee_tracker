INSERT INTO departments (name)
VALUES
    ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1), 
    ('Salesperson', 80000, 1), 
    ('Lead Engineer', 150000, 2), 
    ('Software Engineer', 100000, 2), 
    ('Account Manager', 125000, 3), 
    ('Accountant', 80000, 3), 
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Paolo', 'Pasolini', 3, NULL),
  ('James', 'Fraser', 1, 1),
  ('Jack', 'London', 5, NULL),
  ('Robert', 'Bruce', 7, NULL),
  ('Peter', 'Greenaway', 2, 2),
  ('Derek', 'Jarman', 2, 2),
  ('Heathcote', 'Williams', 4, 1),
  ('Sandy', 'Powell', 4, 1),
  ('Emil', 'Zola', 4, 1),
  ('Sissy', 'Coalpits', 6, 3),
  ('Antoinette', 'Capet', 6, 3),
  ('Samuel', 'Delany', 8, 4),
  ('Tony', 'Duvert', 8, 4),
  ('Dennis', 'Cooper', 6, 3),
  ('Monica', 'Bellucci', 6, 3);