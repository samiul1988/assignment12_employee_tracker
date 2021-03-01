// Include required modules
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Import Query class and create an instance 
const Query = require('./lib/queries');
const queryinstance = new Query();

// Helper function that checks for empty input
const validateInput = (inputName, errorMessage) => {
    if (inputName) return true;
    else console.log(errorMessage);

    return false;
};

// Helper function that checks for valid number
const validateNumber = (input, errorMessage) => {
    if (input && !isNaN(input)) return true;
    else console.log(errorMessage);

    return false;
};

// This function returns a list of departments obtained from the database 
const getDepartmentNameList = async () => {
    const res = await queryinstance.viewAllDepartments();
    return res.map(item => item.department_name);
}

// This function returns a list of roles obtained from the database 
const getRoleList = async () => {
    const res = await queryinstance.viewAllRoles();
    return res.map(item => item.job_title);
}

// This function returns a list of employees obtained from the database 
const getEmployeeNames = async () => {
    const res = await queryinstance.viewAllEmployees();
    return res.map(item => `${item.first_name} ${item.last_name}`);
}

// Main Choice List for Inquirer Prompt
const choices = [
    {
        option: 'View All Departments',
        action: queryinstance.viewAllDepartments,
        hasNestedQuestions: false
    },
    {
        option: 'View All Roles',
        action: queryinstance.viewAllRoles,
        hasNestedQuestions: false
    },
    { 
        option: 'View All Employees', 
        action: queryinstance.viewAllEmployees, 
        hasNestedQuestions: false 
    },
    { 
        option: 'View Employees By Department', 
        action: queryinstance.viewEmployeesByDepartment, 
        hasNestedQuestions: true 
    },
    { 
        option: 'View Employees By Manager', 
        action: queryinstance.viewEmployeesByManager, 
        hasNestedQuestions: true 
    },
    { 
        option: 'Add Department', 
        action: queryinstance.addADepartment, 
        hasNestedQuestions: true 
    },
    { 
        option: 'Add Role', 
        action: queryinstance.addARole, 
        hasNestedQuestions: true 
    },
    { 
        option: 'Add Employee', 
        action: queryinstance.addAnEmployee, 
        hasNestedQuestions: true 
    },
    { 
        option: 'Remove Employee', 
        action: queryinstance.removeEmployee,
        hasNestedQuestions: true 
    },
    { 
        option: 'Remove Role', 
        action: queryinstance.removeRole,
        hasNestedQuestions: true 
    },
    { 
        option: 'Remove Department', 
        action: queryinstance.removeDepartment,
        hasNestedQuestions: true 
    },
    { 
        option: 'Update Employee Role', 
        action: queryinstance.updateEmployeeRole, 
        hasNestedQuestions: true 
    },
    { 
        option: 'Update Employee Manager', 
        action: queryinstance.updateEmployeeManager,
        hasNestedQuestions: true 
    },
    { 
        option: 'View Total Utilized Budget of a Department', 
        action: queryinstance.viewTotalUtililzedBudgetOfADept, 
        hasNestedQuestions: true 
    },
    { 
        option: 'Quit', 
        action: queryinstance.closeConnection, 
        hasNestedQuestions: false 
    }
];

const getActionBasedQuestions = async (action) => {
    let questions;
    switch (action) {
        case 'Add Department':
            questions = [
                {
                    type: 'input',
                    name: 'department_name',
                    message: `[ADD DEPARTMENT] Enter the name of the Department (Reuquired): `,
                    validate: name => validateInput(name, 'Please enter a valid department name!')
                }
            ];
            break;
        case 'Add Role':
            let choices = await getDepartmentNameList();
            questions = [
                {
                    type: 'input',
                    name: 'title',
                    message: `[ADD ROLE] Enter the title of the role (Reuquired): `,
                    validate: name => validateInput(name, 'Please enter a valid role title!')
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: `[ADD ROLE] Enter the salary (Reuquired): `,
                    validate: name => validateNumber(name, 'Please enter a valid salary (numeric value only)!')
                },
                {
                    type: 'list',
                    name: 'department',
                    message: `[ADD ROLE] Select the department the role will be associated with (select an option): `,
                    choices: choices
                }
            ];
            break;
        case 'Add Employee':
            let roleChoices = await getRoleList();
            let managerChoices = await getEmployeeNames();
            managerChoices.unshift("None");

            questions = [
                {
                    type: 'input',
                    name: 'first_name',
                    message: `[ADD EMPLOYEE] What is the employee's first name (Reuquired)?: `,
                    validate: name => validateInput(name, 'Please enter a valid name!')
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: `[ADD EMPLOYEE] What is the employee's last name (Reuquired)?: `,
                    validate: name => validateInput(name, 'Please enter a valid name!')
                },
                {
                    type: 'list',
                    name: 'role',
                    message: `[ADD EMPLOYEE] What is the employee's role (select an option): `,
                    choices: roleChoices
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: `[ADD EMPLOYEE] Who is the emplyoee's manager (select an option): `,
                    choices: managerChoices
                }
            ];
            break;
        case 'Update Employee Role':
            let updatedRoleChoices = await getRoleList();
            let updateEmployeeChoices = await getEmployeeNames();

            questions = [
                {
                    type: 'list',
                    name: 'employee',
                    message: `[UPDATE EMPLOYEE ROLE] Which employee's role you want to update (select an option)?: `,
                    choices: updateEmployeeChoices
                },
                {
                    type: 'list',
                    name: 'role',
                    message: `[UPDATE EMPLOYEE ROLE] What is the new role of the selected employee (select an option)?: `,
                    choices: updatedRoleChoices
                }
            ];
            break;
        case 'Update Employee Manager':
            let updateManagerEmployeeChoices = await getEmployeeNames();
            let updateManagerChoices = [...updateManagerEmployeeChoices];
            updateManagerChoices.unshift("None");

            questions = [
                {
                    type: 'list',
                    name: 'employee',
                    message: `[UPDATE EMPLOYEE MANAGER] Which employee's manager you want to update (select an option)?: `,
                    choices: updateManagerEmployeeChoices
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: `[UPDATE EMPLOYEE MANAGER] Who is the new manager of the selected employee (select an option)?: `,
                    choices: ({ employee }) => updateManagerChoices.filter(item => item !== employee)
                }
            ];
            break;
        case 'View Employees By Department':
            let deptListForViewEmplByDept = await getDepartmentNameList();

            questions = [
                {
                    type: 'list',
                    name: 'department_name',
                    message: `[VIEW EMPLOYEES BY DEPARTMENT] Select a department (select an option): `,
                    choices: deptListForViewEmplByDept
                }
            ];
            break;
        case 'View Employees By Manager':
            let employeeListForViewEmplByManager = await getEmployeeNames();

            questions = [
                {
                    type: 'list',
                    name: 'manager',
                    message: `[VIEW EMPLOYEES BY Manager] Select a manager (select an option): `,
                    choices: employeeListForViewEmplByManager
                }
            ];
            break;
        case 'Remove Department':
            let removeDeptChoiceList = await getDepartmentNameList();
            questions = [
                {
                    type: 'list',
                    name: 'department',
                    message: `[REMOVE DEPARTMENT] Which department do you want to remove (select an option)?: `,
                    choices: removeDeptChoiceList
                }
            ];
            break;
        case 'Remove Role':
            let removeRoleChoiceList = await getRoleList();
            questions = [
                {
                    type: 'list',
                    name: 'role',
                    message: `[REMOVE ROLE] Which role do you want to remove (select an option)?: `,
                    choices: removeRoleChoiceList
                }
            ];
            break;
        case 'Remove Employee':
            let removeEmployeeChoiceList = await getEmployeeNames();
            questions = [
                {
                    type: 'list',
                    name: 'employee_name',
                    message: `[REMOVE EMPLOYEE] Which employee do you want to remove (select an option)?: `,
                    choices: removeEmployeeChoiceList
                }
            ];
            break;
        case 'View Total Utilized Budget of a Department':
            let viewBudgetChoiceList = await getDepartmentNameList();
            questions = [
                {
                    type: 'list',
                    name: 'department_name',
                    message: `[VIEW BUDGET BY DEPARTMENT] Select a department to see the total utilized budget (select an option)?: `,
                    choices: viewBudgetChoiceList
                }
            ];
            break;    
    }

    return questions;
};

// This function generates a list of questions based on selection by the user 
const promptActionBasedQuestions = async ({ option, action }) => {
    return inquirer.prompt(await getActionBasedQuestions(option))
        .then(async data => {
            const res = await action(data);
            if (option.includes("View")) console.table("\n", res);
            return promptQuestions();
        })
        .catch(err => console.log(err));
};

// This function generates the preliminary list of choices 
const promptQuestions = () => {
    let questions = [
        {
            type: 'list',
            name: 'actionChoice',
            message: 'What you would like to do (select an option)? ',
            choices: choices.map(choice => choice.option)
        }
    ];

    return inquirer.prompt(questions)
        .then(async ({ actionChoice }) => {
            const choiceItem = choices.find(choice => choice.option === actionChoice);
            if (actionChoice === 'Quit') {
                choiceItem.action();
                return;
            } else {
                if (choiceItem.hasNestedQuestions) {
                    return promptActionBasedQuestions(choiceItem);
                }
                const action = await choiceItem.action();
                console.table("\n", action);
                return promptQuestions();
            }
        })
        .catch(err => console.log(err));
};

// This funciton initializes the app
function init() {
    console.log(`
====================================================
|  ╔═╗╔╦╗╔═╗╦  ╔═╗╦ ╦╔═╗╔═╗  ╔╦╗╔═╗╔╗╔╔═╗╔═╗╔═╗╦═╗  |
|  ║╣ ║║║╠═╝║  ║ ║╚╦╝║╣ ║╣   ║║║╠═╣║║║╠═╣║ ╦║╣ ╠╦╝  |
|  ╚═╝╩ ╩╩  ╩═╝╚═╝ ╩ ╚═╝╚═╝  ╩ ╩╩ ╩╝╚╝╩ ╩╚═╝╚═╝╩╚═  |
====================================================
`);
    return promptQuestions();
}

// Function call to initialize app
init();