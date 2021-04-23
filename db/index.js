const connection = require('./connection');

class DB {
    constructor(connection){
        this.connection = connection;

    }

    selectAllEmployees(){
        return this.connection.query(
           'SELECT * FROM employee'
        );
    }
    

}

module.exports = new DB(connection);