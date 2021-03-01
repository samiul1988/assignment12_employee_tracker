// required modules
const dbConnection = require('../db/database');

class Query {
    // Gets all departments from database
    viewAllDepartments() {
        const query = 
            `SELECT id AS department_id, name as department_name 
            FROM departments
            ORDER BY id;`;
        const params = [];

        return dbConnection.query(query, params)
            .then(([rows, fields]) => rows)
            .catch(err => {
                console.log(err);
                return;
            });
    }

    // Gets all roles from database
    viewAllRoles() {
        const query = 
            `SELECT r.title AS job_title, r.id AS role_id, d.name as department, r.salary 
            FROM roles AS r
            JOIN departments AS d
            ON r.department_id = d.id
            ORDER BY role_id;`;
        const params = [];

        return dbConnection.query(query, params)
            .then(([rows, fields]) => rows)
            .catch(err => {
                console.log(err);
                return;
            });
    }

    // Get all employees from database
    viewAllEmployees() {
        const query = 
            `SELECT e.id AS employee_id, e.first_name, e.last_name, r.title, d.name as department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employees AS e
            JOIN roles AS r
            ON e.role_id = r.id
            JOIN departments as d
            ON r.department_id = d.id
            LEFT JOIN employees as m
            ON e.manager_id = m.id
            ORDER BY employee_id;`;
        const params = [];

        return dbConnection.query(query, params)
            .then(([rows, fields]) => rows)
            .catch(err => {
                console.log(err);
                return;
            });
    }

    // Gets all employees from database for a particular department
    viewEmployeesByDepartment({ department_name }) {
        const query = 
            `SELECT e.id AS employee_id, e.first_name, e.last_name, r.title, d.name as department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employees AS e
            JOIN roles AS r
            ON e.role_id = r.id
            JOIN departments as d
            ON r.department_id = d.id
            LEFT JOIN employees as m
            ON e.manager_id = m.id
            WHERE d.name = ?
            ORDER BY employee_id;`;
        const params = [department_name];

        return dbConnection.query(query, params)
            .then(([rows, fields]) => rows)
            .catch(err => {
                console.log(err);
                return;
            });
    }

    // Gets all employees from database for a particular manager
    viewEmployeesByManager({ manager }) {
        const [ manager_first_name, manager_last_name ] = manager.split(' ');

        const query = 
            `SELECT e.id AS employee_id, e.first_name, e.last_name, r.title, d.name as department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employees AS e
            JOIN roles AS r
            ON e.role_id = r.id
            JOIN departments as d
            ON r.department_id = d.id
            LEFT JOIN employees as m
            ON e.manager_id = m.id
            WHERE m.first_name = ? AND m.last_name = ?
            ORDER BY employee_id;`;
        const params = [manager_first_name, manager_last_name];

        return dbConnection.query(query, params)
            .then(([rows, fields]) => rows)
            .catch(err => {
                console.log(err);
                return;
            });
    }

    // Inserts a department to the database
    addADepartment({ department_name }) {
        const query = 
            `INSERT INTO departments (name)
            VALUES (?);`;
        const params = [department_name];

        return dbConnection.query(query, params)
            .then(([data, fields]) => {
                if (data.affectedRows == 1) {
                    console.log("New department has been added to the database!");
                    return;
                } else {
                    throw "Could not add department!"
                }
            })
            .catch(err => {
                console.log(err);
                return;
            });
    }

    // Inserts a role to the database
    addARole({ title, salary, department }) {
        const query = 
            `INSERT INTO roles (title, salary, department_id)
            VALUES (?, ?, (SELECT id FROM departments WHERE name = ?));`;
        const params = [title, salary, department];

        return dbConnection.query(query, params)
            .then(([data, fields]) => {
                if (data.affectedRows == 1) {
                    console.log("New role has been added to the database!");
                    return;
                } else {
                    throw "Could not add role!"
                }
            })
            .catch(err => {
                console.log(err);
                return;
            });
    }

    // Inserts an employee to the database
    addAnEmployee({ first_name, last_name, role, manager }) {
        let manager_first_name = '';
        let manager_last_name = '';

        if (manager !== 'None') {
            [ manager_first_name, manager_last_name ] = manager.split(' ');
        }

        const getIdQuery = 
            `SELECT id
            FROM employees
            WHERE first_name = ? AND last_name = ?;`;
        const geIdQueryParams = [manager_first_name, manager_last_name];

        return dbConnection.query(getIdQuery, geIdQueryParams)
            .then(([rows, fields]) => {
                let manager_id;
                
                if ( rows.length == 0 ) {
                    manager_id = null;
                } else if ( rows.length == 1 ) {
                    manager_id = rows[0].id;
                } else {
                    throw "Could not add employee!";
                }

                const insertQuery = 
                    `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, (SELECT id FROM roles WHERE title = ?), ?);`;
                const insertQueryParams = [first_name, last_name, role, manager_id];
                return dbConnection.query(insertQuery, insertQueryParams)
                    .then(([data, fields]) => {
                        if (data.affectedRows == 1) {
                            console.log(`New employee "${first_name} ${last_name}" has been added to the database!`);
                            return;
                        } else {
                            throw "Could not add employee!"
                        }
                    })
            })
            .catch(err => {
                console.log(err);
                return;
            });
    }

    // Updates the manager_id property of an employee
    updateEmployeeManager({ employee, manager }) {
        const [first_name, last_name] = employee.split(' ');

        let manager_first_name = '';
        let manager_last_name = '';

        if (manager !== 'None') {
            [ manager_first_name, manager_last_name ] = manager.split(' ');
        }

        const getIdQuery = 
            `SELECT id
            FROM employees
            WHERE first_name = ? AND last_name = ?;`;
        const geIdQueryParams = [manager_first_name, manager_last_name];

        return dbConnection.query(getIdQuery, geIdQueryParams)
            .then(([rows, fields]) => {
                let manager_id;
                
                if ( rows.length == 0 ) {
                    manager_id = null;
                } else if ( rows.length == 1 ) {
                    manager_id = rows[0].id;
                } else {
                    throw "Could not update employee manager!";
                }

                const updateQuery = 
                    `UPDATE employees
                    SET manager_id = ?
                    WHERE first_name = ? AND last_name = ?;`;
                const updateQueryParams = [manager_id, first_name, last_name];
                return dbConnection.query(updateQuery, updateQueryParams)
                    .then(([data, fields]) => {
                        if (data.affectedRows == 1) {
                            console.log(`Employee manager has been updated!`);
                            return;
                        } else {
                            throw "Could not update employee manager!"
                        }
                    })
            })
            .catch(err => {
                console.log(err);
                return;
            });
    }

    // Updates the role_id property of an employee
    updateEmployeeRole({ employee, role }) {
        const [first_name, last_name ] = employee.split(' ');
        const query = 
            `UPDATE employees
            SET role_id = (SELECT id FROM roles WHERE title = ?)
            WHERE first_name = ? AND last_name = ?;`;
        const params = [role, first_name, last_name];

        return dbConnection.query(query, params)
            .then(([data, fields]) => {
                if (data.affectedRows == 1) {
                    console.log(`Role of ${employee} has been updated!`);
                    return;
                } else {
                    throw "Could not update role!"
                }
            })
            .catch(err => {
                console.log(err);
                return;
            });
    }

    // Deletes an employee from the database
    removeEmployee({ employee_name }) {
        const [first_name, last_name ] = employee_name.split(' ');
        const query = 
            `DELETE FROM employees
            WHERE first_name = ? AND last_name = ?;`;
        const params = [first_name, last_name];

        return dbConnection.query(query, params)
            .then(([data, fields]) => {
                if (data.affectedRows == 1) {
                    console.log(`Employee "${employee_name}" has been removed from database!`);
                    return;
                } else {
                    throw "Could not remove employee!"
                }
            })
            .catch(err => {
                console.log(err);
                return;
            });
    }

    // Deletes a role from the database
    removeRole({ role }) {
        const query = 
            `DELETE FROM roles
            WHERE title = ?;`;
        const params = [role];

        return dbConnection.query(query, params)
            .then(([data, fields]) => {
                if (data.affectedRows == 1) {
                    console.log(`Role "${role}" has been removed from database!`);
                    return;
                } else {
                    throw "Could not remove role!"
                }
            })
            .catch(err => {
                console.log(err);
                return;
            });
    }

    // Deletes a department from the database
    removeDepartment({ department }) {
        const query = 
            `DELETE FROM departments
            WHERE name = ?;`;
        const params = [department];

        return dbConnection.query(query, params)
            .then(([data, fields]) => {
                if (data.affectedRows == 1) {
                    console.log(`Department "${department}" has been removed from database!`);
                    return;
                } else {
                    throw "Could not remove department!"
                }
            })
            .catch(err => {
                console.log(err);
                return;
            });
    }

    // Gets total utilized budget for a particular department
    viewTotalUtililzedBudgetOfADept({department_name }) {
        const query = 
            `SELECT d.name as department_name, SUM(r.salary) as total_utilized_budget
            FROM employees AS e
            JOIN roles AS r
            ON e.role_id = r.id
            JOIN departments as d
            ON r.department_id = d.id
            WHERE d.name = ?;`;
        const params = [department_name];

        return dbConnection.query(query, params)
            .then(([rows, fields]) => rows)
            .catch(err => {
                console.log(err);
                return;
            });
    }

    // Close db connection
    closeConnection() {
        dbConnection.end();
        console.log('Thanks for using Employee Manager!');
        return;
    }
}

module.exports = Query;