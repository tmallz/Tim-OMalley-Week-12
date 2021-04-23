const inquirer = require('inquirer');

const addEmployee = () =>{
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the employees first name?',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'firstName'
        },
        {
            type: 'list',
            name: 'choice',
            message: 'What is the employees role',
            choices: ['Sales Lead', 'Sales Person', 'Software Engineer', 'Engineering Manager', 'Accountant', 'Accountant Manager', 'Lawyer', 'Legal Team Lead'],
        },
    ])
    .then((data) => {
        console.log(`${data.firstName} || ${data.lastName} || ${data.choice}`);
    })
    .catch((err) =>{
        console.log(`Error: ${err}`)
    });
};

module.exports = addEmployee();