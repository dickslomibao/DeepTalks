const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "deeptalks",
});

conn.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.message);
    return;
  }

  console.log("Connected to MySQL");
});

module.exports = conn;
