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

const menuPrompt = [{
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
}];

function startApp() {
    inquirer.prompt(menuPrompt).then(answers => {
        switch (answers.mainAction){
            case "View All Employees":
                console.log(`Select Action: ${answers.mainAction}`);
                function readEmployees(callback) {
                    connection.query(
                        'SELECT e.employee_name, d.deptName, r.title, r.salary FROM employees e LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN departments d ON d.id = r.department_id', 
                        function(err, res) { 
                            if (err) throw err;
                            console.log("------------ EMPLOYEES ------------");
                            console.table(res);
                        }
                    );
                    callback();
                }
                readEmployees(function(){
                    startApp();
                });
                break;
            case "View All Departments":
                console.log(`Select Action: ${answers.mainAction}`);
                function readDepts(callback) {
                    connection.query(
                        'SELECT d.deptName FROM departments d', 
                        function(err, res) {
                            if (err) throw err;
                            console.log("------------ Departments ------------");
                            console.table(res);
                        }
                    );
                    callback();
                }
                readDepts(function(){
                    startApp();
                });
                break;
            case "View All Roles":
                console.log(`Select Action: ${answers.mainAction}`);
                function readRoles(callback){
                    connection.query(
                        'SELECT r.title, r.salary, d.deptName FROM roles r LEFT JOIN departments d ON d.id = r.department_id', 
                        function(err, res) {
                            if (err) throw err;
                            console.log("------------ Roles ------------");
                            console.table(res);
                        }
                    );
                    callback();
                }
                readRoles(function(){
                    startApp();
                });
                break;
        }
    });
}




       /*

            function addEmployee(){
                console.log("------------ Add Employee ------------");
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Employee Name?",
                            name: "employeeName"
                        },
                        {
                            type: "list",
                            message: "Employee Role?",
                            choices: [
                                "Business Analyst",
                                "Data Analyst",
                                "Documentation Specialist",
                                "Performance Analyst", 
                                "Investment Analyst", 
                                "Client Service Coordinator", 
                                "Research Analyst", 
                                "Research Associate", 
                                "Compliance Manager", 
                                "Compliance Specialist", 
                                "Office Manager", 
                                "Executive Assistant" 
                            ],
                            name: "employeeRole"
                        }
                    ])
                    .then(answers => {
                        let employeeName = answers.employeeName;
                        let employeeRole = answers.employeeRole;
                        //change this later
                        let roles = [
                            "Business Analyst",
                            "Data Analyst",
                            "Documentation Specialist",
                            "Performance Analyst", 
                            "Investment Analyst", 
                            "Client Service Coordinator", 
                            "Research Analyst", 
                            "Research Associate", 
                            "Compliance Manager", 
                            "Compliance Specialist", 
                            "Office Manager", 
                            "Executive Assistant"
                        ];
                        let roleId;
                        for (let i=0; i<roles.length; i++) {
                            if (employeeRole == roles[i]) {
                                roleId = roles[i].indexOf() ;
                                console.log(roleId);
                            }
                        }
                        console.log(employeeRole);
                    //connection.query(
                    });
            }
      */
        

