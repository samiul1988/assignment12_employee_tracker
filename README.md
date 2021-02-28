## Assignment 12: Employee Tracker
---
### Topic
TDD and OOP (Constructors and Classes)

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
    * To be included  

### Sample HTML file generated from this application
[Sample HTML File](./sample/team-profile.html)
#### Output Screenshot
![HTML File Output](./assets/images/Sample_assignment10.png)

### Demo Run
![Demo Run](./assets/images/Demo_assignment10.gif)

### Link of Walkthrough Video
The walkthrough video demonstrates the following:
* all four test suites passing
    * Due to time limitation, I ran all four tests together using ```npm test```
    * In the demo run shown in the previous section, I ran individual test as well as full test to show that individual components have also passed
* how a user would invoke the application from the command line
* how a user would enter responses to all of the prompts in the application
* a generated HTML file that matches the user input
    * when a Github link is clicked, it shows the asssociated github profile in a new tab
    * when an email is clicked, it opens the default email program and populates the TO field of the email with the address


[Click here to see the video](https://drive.google.com/file/d/1IM8kVVlVYrM2cALU0LDn-ewmJCiiwAD9/view)
