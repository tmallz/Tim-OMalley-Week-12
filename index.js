const db = require('./db');
const inquirer = require('inquirer');
require('console.table');

console.log("My app is running");

//async function that displays a table of the current employees
async function viewEmployees() {
    let allEmployees = await db.selectAllEmployees();
    console.table(allEmployees);
    giveOptions()
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

//async function that adds employees
async function addEmployee(){
    let roleArray = await mapRoles();
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
            choices: roleArray 
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

//async function that removes employees
async function removeEmployee(){
    let allEmployees = await employeeList();
    inquirer.prompt([
        {
            type: 'list',
            name: 'remove',
            message: 'What employee would you like to remove?',
            choices: allEmployees,
        },
        ])
        .then(async (data) =>{
            await db.removeEmployee(data.remove);
            giveOptions();
        })
}

async function updateRole(){
    let allEmployees = await employeeList();
    let roleArray = await mapRoles();
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What employee would you like to change the role for?',
            choices: allEmployees,
        },
        {
            type: 'list',
            name: 'role',
            message: 'What role would you like to give the employee?',
            choices: roleArray,
        },
        ])
        .then(async (data) =>{
            await db.updateRole(data.choice, data.role);
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
                return removeEmployee();
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

//helper functions
async function mapRoles(){
    const allRoles = await db.getRoleList();
    const roleArray = allRoles.map(({id, title, salary, deparment_id}) => ({
        name: title, 
        salary: salary,
        deparment_id: deparment_id,
        value: id 
    }));
    return roleArray;
}

async function employeeList(){
    const employees = await db.selectAllEmployees();
    const emmployeeArray = employees.map(({id, first_name, last_name, role_id, manager_id}) => ({
        name: [first_name,last_name].join(' '),
        role_id: role_id,
        manager_id: manager_id,
        value: id
    }));
    return emmployeeArray
}


//function to start program
const start = () =>{
    giveOptions();
}

//intializing the app
start();