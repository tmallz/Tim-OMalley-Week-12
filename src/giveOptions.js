//importing and inquirer
const inquirer = require('inquirer');

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
                console.log('exit');
                return connection.end();
        }
    });
}

module.exports = giveOptions();