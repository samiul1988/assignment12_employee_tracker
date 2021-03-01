// required module
const mysql = require('mysql2'); // get the client
require('dotenv').config(); // get database connection info

// create the connection to database
const dbConnection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD
});

module.exports = dbConnection.promise();