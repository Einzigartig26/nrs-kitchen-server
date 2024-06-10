var mysql = require("mysql");

var mySQL = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
});

module.exports = mySQL;
