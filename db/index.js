const connection = require('./connection');

class DB {
    constructor(connection){
        this.connection = connection;

    }

    //function that returns all employees in DB
    selectAllEmployees(){
        return this.connection.query(
           'SELECT * FROM employee'
        );
    }

    //fucntion that returns employees by department from DB
    async viewEmployeesByDepartment(department){
        return this.connection.query(`
        SELECT 
            e.id, 
            e.first_name, 
            e.last_name, 
            r.title, 
            d.name AS department, 
            r.salary, 
            CONCAT('', m.first_name, ' ', m.last_name) AS manager
        FROM employee e 
        JOIN role r 
            ON e.role_id = r.id
        JOIN department d
            ON d.id = r.department_id AND d.name = "${department}"
        LEFT JOIN employee m
            ON e.manager_id = m.id 
        ORDER BY e.id ASC`
        );
    }

    async viewEmployeesByManager(manager){
        return this.connection.query(`
        SELECT 
            e.id, 
            e.first_name, 
            e.last_name, 
            r.title, 
            d.name AS department, 
            r.salary, 
            CONCAT('', m.first_name, ' ', m.last_name) AS manager
        FROM employee e 
        JOIN role r 
            ON e.role_id = r.id
        LEFT JOIN employee m
            ON e.manager_id = m.id
        JOIN department d
            ON d.id = r.department_id AND CONCAT('', m.first_name, ' ', m.last_name) = "${manager}"
        ORDER BY e.id ASC
        `);
    }

    async addEmployeeDB(employee){
        let manNum;
        let roleNum =1;
        switch(employee.manager_id){
            case 'John Doe':
                manNum = 1;
                break;
            case 'Ashley Rodrigues':
                manNum = 3;
                break;
            case 'Kunal Singh':
                manNum = 5;
                break;
            case 'Sarah Lourd':
                manNum = 7;
                break;    
        }
        employee.manager_id = manNum;
        employee.role_id = roleNum;
        return this.connection.query(`
            INSERT INTO employee set ?`, employee)
    }

    //function that exits the connection to the db
    exit(){
        return this.connection.end();
    }
    

}

module.exports = new DB(connection);

