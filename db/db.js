const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const users = require('./models/users');


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});


connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id: ' + connection.threadId);
});

module.exports = connection;