## Assignment 12: Employee Tracker (CMS)
---
### Topic
MySQL and NodeJS

### User Story (Obtained from the assignment description)

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

### Acceptance Criteria (Obtained from the assignment description)

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## My Actions and Notes

* The project was developed from scratch.
* Basic considerations were as follows:
    * Following packages were used in the assignment: MySQL2, Inquirer, console.table and dotenv 
    * The database configuration information was saved in a local .env file
    * No test files have been added since there was no specific instruction to add test cases
    * Validation was considered while obtaining user input using Inquirer prompt
    * The query functions were organized in a class called ```Query```
    * Demo data was inserted using a ```seed.sql``` file 
    * Added UNIQUE constraints to the department name, role title and employee (first name + last name) since majority of the selections are based on names  


### Demo Run
![Demo Run](./assets/images/assignment12_demo.gif)

### Link of Walkthrough Video
[Click here to see the video](https://drive.google.com/file/d/1xRFRwKGhstbyqxfGJwp0Wo2IO9pcFueT/view)
