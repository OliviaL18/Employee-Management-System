const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root1234",
    database: "employeeDB"
  });

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readEmployees();
    readDepartments();
    readRoles();
});

function readEmployees() {
    connection.query('SELECT * FROM employees', function(err, res) {
      if (err) throw err;
      console.log("------------ EMPLOYEES ------------");
      console.table(res);
    });
}

function readDepartments() {
    connection.query('SELECT * FROM departments', function(err, res) {
      if (err) throw err;
      console.log("------------ Departments ------------");
      console.table(res);
    });
}

function readRoles() {
    connection.query('SELECT * FROM roles', function(err, res) {
      if (err) throw err;
      console.log("------------ ROLES ------------");
      console.table(res);
    });
}