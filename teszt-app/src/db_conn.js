var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "csilla",
    password: "1*spyroSPYRO*1",
    database: 'teszt_app'
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });