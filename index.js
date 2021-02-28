// Include required modules
const inquirer = require('inquirer');

// const isEmail = require('validator/lib/isEmail');
// const isInt = require('validator/lib/isInt');

// const { writeToFile, copyFile } = require('./src/utils/fsUtilities');
// const generateHTML = require('./src/generateHTML');


// Import Query class and create an instance 
const Query = require('./lib/queries');
const queryinstance = new Query();

// Helper function that checks for empty input
const validateInput = (inputName, errorMessage) => {
    if (inputName) return true;
    else console.log(errorMessage);
    
    return false;
};

// Helper function to check if the input is an integer number
const validateNumber = (input, errorMessage) => {
    if (input && isInt(input)) return true;
    else console.log(errorMessage);
    
    return false;
};

const choices = [
    { option: 'View All Departments', action: queryinstance.viewAllDepartments },
    { option: 'View All Roles', action: queryinstance.viewAllRoles },
    { option: 'View All Employees', action: queryinstance.viewAllRoles },
    { option: 'View All  Employees By Departments', action: queryinstance.viewAllRoles },
    { option: 'View All Employees By Manager', action: queryinstance.viewAllDepartments },
    { option: 'Add Department', action: queryinstance.viewAllRoles },
    { option: 'Add Role', action: queryinstance.viewAllRoles },
    { option: 'Add Employee', action: queryinstance.viewAllRoles },
    { option: 'Remove Employee', action: queryinstance.viewAllDepartments },
    { option: 'Update Employee Role', action: queryinstance.viewAllRoles },
    { option: 'Update Employee Manager', action: queryinstance.viewAllRoles },
    { option: 'Quit', action: queryinstance.viewAllRoles },
];

// const choices = [ 
//     'View All Departments',
//     'View All Roles',
//     'View All Employees', 
//     'View All Employees By Departments', 
//     'View All Employees By Manager',
//     // new inquirer.Separator(),
//     'Add Department',
//     'Add Role',
//     'Add Employee',
//     'Remove Employee',
//     'Update Employee Role',
//     'Update Employee Manager',
//     // new inquirer.Separator(),
//     'Quit'
// ];

// This function generates a list of questions based on role 
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
            .then( ({ actionChoice }) => {
                const action = choices.find(choice => choice.option === actionChoice).action;
                console.log(action());
                // let teamData = {};
                // teamData.manager = new Manager( name, employeeID, email, officeNumber );
                // return { ...teamData,  choice: addEmployeeChoice };
            });
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
    promptQuestions();
    // promptManagerQuestions()
    //     .then( promptMemberQuestions )
    //     .then(data => generateHTML(data))
    //     .then(htmlData => writeToFile('./dist/team-profile.html', htmlData, 'HTML file has been created sucessfully!'))
    //     .then(writeFileResp => {
    //         console.log(writeFileResp.message); 
    //         return copyFile('./src/style/styles.css', './dist/style/styles.css', 'Stylesheet has been copied successfully!');
    //     })
    //     .then(copyFileResp => {
    //         console.log(copyFileResp.message); 
    //     })
    //     .catch(err => console.log(err));
}

// Function call to initialize app
init();




// // This function generates a list of questions based on role 
// const generateQuestionss = employeeRole => { 
//     // Common questions
//     let questions = [
//         {
//             type: 'input',
//             name: 'name',
//             message: `[${employeeRole}'s Name] Enter name of the ${employeeRole} (Required)`,
//             validate: name => validateInput(name, 'Please enter a name!')
//         },
//         {
//             type: 'input',
//             name: 'employeeID',
//             message: `[Employee ID] Enter ${employeeRole}'s Employee ID (Required)`,
//             validate: employeeID => validateNumber(employeeID, '\nID must be a number!')
//         },
//         {
//             type: 'input',
//             name: 'email',
//             message: `[EMAIL] Enter ${employeeRole}'s email address (Required)`,
//             validate: email => {
//                 let response = validateInput(email, 'Please enter an email address!'); 
//                 if(response) {
//                     if(!isEmail(email)) {
//                         console.log('\nPlease enter a valid email address!')
//                         return false;
//                     }
//                 }
//                 return response;
//             }
//         }
//     ];

//     // Role specific quesions
//     switch (employeeRole) {
//         case "Manager":
//             questions.push(
//                 {
//                     type: 'input',
//                     name: 'officeNumber',
//                     message: `[Office Number] Enter ${employeeRole}'s Office Number (Required)`,
//                     validate: projectTitle => validateNumber(projectTitle, '\nPlease enter a valid room number (Integer)!')
//                 }
//             );
//             break;
//         case "Engineer":
//             questions.push(
//                 {
//                     type: 'input',
//                     name: 'githubUsername',
//                     message: `[GITHUB USERNAME] Enter ${employeeRole}'s GitHub Username (Required)`,
//                     validate: githubUsername => validateInput(githubUsername, 'Please enter a valid GitHub username!')
//                 }
//             );
//             break;
//         case "Intern":
//             questions.push({
//                 type: 'input',
//                 name: 'schoolName',
//                 message: `[SCHOOL] Enter ${employeeRole}'s School Name (Required)`,
//                 validate: schoolName => validateInput(schoolName, 'Please enter a School Name!')
//             });
//             break;
//     }

//     // Question regarding adding member(s)
//     questions.push(
//         {
//             type: 'list',
//             name: 'addEmployeeChoice',
//             message: '[ADD MEMBER] Please select an option',
//             choices: ['Add Engineer', 'Add Intern', 'Finish building the team']
//         }
//     );

//     return questions;
// };

// // This fucntion prompts manager specific questions and creates an instance of Manager class to store the answers 
// const promptManagerQuestions = () => {
//     return inquirer
//             .prompt(generateQuestions("Manager"))
//             .then( ({ name, employeeID, email, officeNumber, addEmployeeChoice }) => {
//                 let teamData = {};
//                 teamData.manager = new Manager( name, employeeID, email, officeNumber );
//                 return { ...teamData,  choice: addEmployeeChoice };
//             });
// };

// // This fucntion prompts engineer/intern specific questions 
// // and creates instances of Engineer/Intern classes as required to store the answers
// const promptMemberQuestions = data => {
//     let { choice, ...rest } = data;
//     if (choice === 'Finish building the team') {
//         return rest;
//     } else if (choice === 'Add Engineer') {
//         if (!rest.engineers) {
//             rest.engineers = [];
//         }
//         return inquirer
//             .prompt(generateQuestions("Engineer"))
//             .then( ({ name, employeeID, email, githubUsername, addEmployeeChoice }) => {
//                 rest.engineers.push( new Engineer( name, employeeID, email, githubUsername ));
//                 return promptMemberQuestions({ ...rest,  choice: addEmployeeChoice });
//             });
//     } else if (choice === 'Add Intern') {
//         if (!rest.interns) {
//             rest.interns = [];
//         }
//         return inquirer
//             .prompt(generateQuestions("Intern"))
//             .then( ({ name, employeeID, email, schoolName, addEmployeeChoice }) => {
//                 rest.interns.push( new Intern( name, employeeID, email, schoolName ));
//                 return promptMemberQuestions({ ...rest,  choice: addEmployeeChoice });
//             });
//     }
// };