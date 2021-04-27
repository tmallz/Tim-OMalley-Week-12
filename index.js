const db = require('./db');
const inquirer = require('inquirer');
require('console.table');

console.log("My app is running");

//async function that displays a table of the current employees
async function viewEmployees() {
    let allEmployees = await db.selectAllEmployees();
    console.table(allEmployees);
    giveOptions();
}

function viewEmployeesByDept() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'department',
            message: 'What department would you like to see the employees for?',
            choices: [
                'Sales', 
                'Engineer', 
                'Finance',
                'Legal'],
        }
        ])
        .then(async (data) =>{
            let employeesByDepartment = await db.viewEmployeesByDepartment(data.department);
            console.table(employeesByDepartment);
            giveOptions();
        });
}

function viewEmployeesManager(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'manager',
            message: 'What department would you like to see the employees for?',
            choices: [
                'John Doe', 
                'Ashley Rodrigues', 
                'Kunal Singh',
                'Sarah Lourd'],
        }
        ])
        .then(async (data) =>{
            let employeesByManager = await db.viewEmployeesByDepartment(data.manager);
            console.log(data.manager);
            console.table(employeesByManager);
            giveOptions();
        });
}

function addEmployee(){
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
            name: 'role',
            message: 'What is the employees role',
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer' ,'Software Engineer', 'Accountant Manager','Accountant', 'Legal Team Lead', 'Lawyer'],
        },
        {
            type: 'list',
            name: 'manager',
            message: 'What department would you like to see the employees for?',
            choices: [
                'John Doe', 
                'Ashley Rodrigues', 
                'Kunal Singh',
                'Sarah Lourd'],
            }
    ])
    .then(async (data) => {
        let newEmployee = {first_name:data.firstName, last_name:data.lastName, role_id:data.role, manager_id:data.manager};
        await db.addEmployeeDB(newEmployee);
        giveOptions();
    })
}

//async function that handles exiting the database connection 
async function exitConnection() {
   await db.exit();
}

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
               return viewEmployees();
            case 'View employees by department':
                return viewEmployeesByDept();
            case 'View employees by manager':
                return viewEmployeesManager();
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
            case 'exit':
                return exitConnection();
        }
    });
}

const start = () =>{
    giveOptions();
}

start();