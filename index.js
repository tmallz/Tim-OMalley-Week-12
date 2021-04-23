//importing mysql and dotenv
const mysql = require('mysql');
const inquirer = require('inquirer');
require('dotenv').config();

//importing helper functions
//const addEmployee = require('./src/addEmployee');

//creating the mysql connection using envirionment variables 
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

});

const giveOptions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all employees', 
                'View employees by department', 
                'View employees by manager',
                'Add employee',
                'Remove employee',
                'Update employee role',
                'Update employee manager',
                'View all roles',
                'exit' ],
        }
    ])
    .then((data) =>{
        switch(data.choice){
            case 'View all employees':
                console.log('View all employees');
                return giveOptions();
            case 'View employees by department':
                console.log('View employees by department');
                return giveOptions();
            case 'View employees by manager':
                console.log('View employees by manager');
                return giveOptions();
            case 'Add employee':
                return addEmployee();
            case 'Remove employee':
                console.log('Remove employee');
                return giveOptions();
            case 'Update employee role':
                console.log('Update employee role');
                return giveOptions();
            case 'Update employee manager':
                console.log('Update employee manager');
                return giveOptions();
            case 'View all roles':
                console.log('View all roles');
                return giveOptions();
            case 'exit': //works as intended :)
                console.log('exit');
                return connection.end();
        }
    })
    .catch((err) =>{
        console.log(err)
    });
}

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
            name: 'lastName'
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
        giveOptions();
    })
    .catch((err) =>{
        console.log(`Error: ${err}`)
    });
};

connection.connect((err) => {
    if (err) throw err;

    giveOptions();
})
