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
    startApp();
});

let mainAction;

function startApp() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "What do you want to do?",
                choices: [
                    "View All Employees", 
                    "View Employees by Department",
                    "Add Employee",
                    "Remove Employee" ,
                    "Update Employee", 
                    "View All Departments",
                    "View All Roles", 
                    "Update Role"               
                ],
                name: "mainAction"
            }
        ])
        .then(answers => {
            mainAction = answers.mainAction;
                console.log(`Select Action: ${mainAction}`);
            function readEmployees() {
                connection.query(
                    'SELECT e.employee_name, d.deptName, r.title, r.salary FROM employees e LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN departments d ON d.id = r.department_id', 
                    function(err, res) {
                    if (err) throw err;
                    console.log("------------ EMPLOYEES ------------");
                    console.table(res);
                });
            }
            if (mainAction == "View All Employees") {
                readEmployees();
            }
        });
}
