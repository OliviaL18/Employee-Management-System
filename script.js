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
        "View All Departments",
        "View All Roles", 
        "View Employees by Department",
        "Add Employee",
        "Remove Employee",
        "Update Employee", 
        "Update Role"               
    ],
    name: "mainAction"
}];

const addEmployee = [
    {
        type: "input",
        message: "Employee Name?",
        name: "employeeName"
    },{
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
];

let employeeNames = [];

const removeEmployee = [{
    type: "list",
    message: "Employee Role?",
    choices: employeeNames,
    name: "deleteEmployee"
}];

function startApp() {
    inquirer.prompt(menuPrompt).then(answers => {
        switch (answers.mainAction){
            case "View All Employees":
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
            case "Add Employee":
                console.log("------------ Add Employee ------------");
                inquirer.prompt(addEmployee).then(answers => {
                    let roleID = 0;
                    switch (answers.employeeRole){
                        case "Business Analyst":
                            roleId = 1;
                            console.log(`Selected Role: ${answers.employeeRole}`);
                            console.log(`Role ID: ${roleID}`);
                            break;
                        case "Data Analyst":
                            roleId = 2;
                            console.log(`Selected Role: ${answers.employeeRole}`);
                            console.log(`Role ID: ${roleID}`);
                            break;
                        case "Documentation Specialist":
                            roleId = 3;
                            console.log(`Selected Role: ${answers.employeeRole}`);
                            console.log(`Role ID: ${roleID}`);
                            break;   
                        case "Performance Analyst":
                            roleId = 4;
                            console.log(`Selected Role: ${answers.employeeRole}`);
                            console.log(`Role ID: ${roleID}`);
                            break;  
                        case "Investment Analyst":
                            roleId = 5;
                            console.log(`Selected Role: ${answers.employeeRole}`);
                            console.log(`Role ID: ${roleID}`);
                            break;
                        case "Client Service Coordinator":
                            roleId = 6;
                            console.log(`Selected Role: ${answers.employeeRole}`);
                            console.log(`Role ID: ${roleID}`);
                            break;
                        case "Research Analyst":
                            roleId = 7;
                            console.log(`Selected Role: ${answers.employeeRole}`);
                            console.log(`Role ID: ${roleID}`);
                            break;   
                        case "Research Associate":
                            roleId = 8;
                            console.log(`Selected Role: ${answers.employeeRole}`);
                            console.log(`Role ID: ${roleID}`);
                            break;   
                        case "Compliance Manager":
                            roleId = 9;
                            console.log(`Selected Role: ${answers.employeeRole}`);
                            console.log(`Role ID: ${roleID}`);
                            break;   
                        case "Compliance Specialist":
                            roleId = 10;
                            console.log(`Selected Role: ${answers.employeeRole}`);
                            console.log(`Role ID: ${roleID}`);
                            break;   
                        case "Office Manager":
                            roleId = 11;
                            console.log(`Selected Role: ${answers.employeeRole}`);
                            console.log(`Role ID: ${roleID}`);
                            break;   
                        case "Executive Assistant":
                            roleId = 12;
                            console.log(`Selected Role: ${answers.employeeRole}`);
                            console.log(`Role ID: ${roleID}`);
                            break;                              
                    }
                    connection.query(
                        "INSERT INTO employees SET ?",
                            {
                                employee_name: answers.employeeName,
                                role_id: roleID
                            },
                            function(err) {
                                if (err) throw err;
                                console.log("Employee successfully added!");
                                startApp();
                            }
                    );
                });
            case "Remove Employee": 
                console.log(`Remove Employee`);
                connection.query(
                    'SELECT e.employee_name, d.deptName, r.title, r.salary FROM employees e LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN departments d ON d.id = r.department_id', 
                    function(err, res) { 
                        if (err) throw err;

                        for (let i=0; i<res.length; i++){
                            employeeNames.push(res[i].employee_name);
                        }
                        console.log(employeeNames);
                        
                    }
                ); 
                break;
            break;
        }
    });
}

