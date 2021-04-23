const mysql = require('mysql');
const util = require('util');
require('dotenv').config();

//creating the mysql connection using envirionment variables 
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

});

//establishing connection to the database
connection.connect((err) => {
    if (err) throw err;

    //giveOptions();
})

connection.query = util.promisify(connection.query);

module.exports = connection;
