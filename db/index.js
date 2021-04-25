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

    exit(){
        return this.connection.end();
    }
    

}

module.exports = new DB(connection);