CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;


CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- CREATE TABLE roles (
--   id INTEGER AUTO_INCREMENT,
--   title VARCHAR(30) NOT NULL,
--   salary DECIMAL NOT NULL,
--   department_id INTEGER UNSIGNED,
--   PRIMARY KEY (id),
--   CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
-- );

-- CREATE TABLE employees (
--   id INTEGER AUTO_INCREMENT,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   role_id INTEGER UNSIGNED NOT NULL,
--   manager_id INTEGER UNSIGNED,
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE votes (
--   id INTEGER PRIMARY KEY,
--   voter_id INTEGER UNSIGNED NOT NULL,
--   candidate_id INTEGER UNSIGNED NOT NULL,
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--   CONSTRAINT uc_voter UNIQUE (voter_id),
--   CONSTRAINT fk_voter FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE CASCADE,
--   CONSTRAINT fk_candidate FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
-- );

