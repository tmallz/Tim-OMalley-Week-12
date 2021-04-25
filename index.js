const db = require('./db');
const inquirer = require('inquirer');
require('console.table');

console.log("My app is running");

//async function that displays a table of the current employees
async function viewEmployees() {
    let allEmployees = await db.selectAllEmployees();
    console.table(allEmployees);
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
                viewEmployees();
                return giveOptions();
            case 'View employees by department':
                console.log('View employees by department');
                return giveOptions();
            case 'View employees by manager':
                console.log('View employees by manager');
                return giveOptions();
            case 'Add employee':
                console.log('Add employee');
                return giveOptions();;
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