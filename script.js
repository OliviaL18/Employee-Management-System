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

//Inquirer prompt for start menu
const menuPrompt = [{
    type: 'list',
    message: "What do you want to do?",
    choices: [
        "View All Employees", 
        "View All Departments",
        "View All Roles", 
        //"View Employees by Department",
        "Add Employee",
        //"Remove Employee",
        "Update Employee", 
        //"Update Role"               
    ],
    name: "mainAction"
}];

//Inquirer prompt for adding employee
const addEmployeePrompt = [
    {
        type: "input",
        message: "Employee Name?",
        name: "employeeName"
    },{
        type: "input",
        message: "Enter the Role ID for the Employee",
        name: "employeeRole"
    }
];

const updateEmployeePrompt = [
    {
        type: "input",
        message: "Enter the ID of the Employee you want to Update",
        name: "updateEmployeeID"
    },
    {
        type: "input",
        message: "Enter the ID of the Role you want the Employee to have",
        name: "updateEmployeeRoleID"
    },
];

function readEmployees(callback) {
    connection.query(
        'SELECT e.id, e.employee_name, d.deptName, r.title, r.salary FROM employees e LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN departments d ON d.id = r.department_id', 
        function(err, res) { 
            if (err) throw err;
            console.log("------------ EMPLOYEES ------------");
            console.table(res);
            callback();
        }
    );
}

function readDepts(callback) {
    connection.query(
        'SELECT d.deptName FROM departments d', 
        function(err, res) {
            if (err) throw err;
            console.log("------------ Departments ------------");
            console.table(res);
            callback();
        }
    );
}

function readRoles(callback){
    connection.query(
        'SELECT r.id, r.title, r.salary, d.deptName FROM roles r LEFT JOIN departments d ON d.id = r.department_id', 
        function(err, res) {
            if (err) throw err;
            console.log("------------ Roles ------------");
            console.table(res);
            callback();
        }
    );
}

function addEmployee(role, name, callback){
    connection.query(
        "INSERT INTO employees SET ?",
            {
                employee_name: name,
                role_id: role,
            },
            function(err) {
                if (err) throw err;
                callback();
            }
    );
}

function updateEmployee(role, id, callback) {
    console.log(`Role: ${role}`);
    console.log(`ID: ${id}`);
    connection.query(
        "UPDATE employees SET ? WHERE ?", 
        [
            {
              role_id: parseInt(role)
            },
            {
              id: parseInt(id)
            }
          ],
        function(err, res) {
            if (err) throw err;
            console.log(res);
            callback();
        }
    );
}

/*const removeEmployee = [{
    type: "list",
    message: "Which employee would you like to remove?",
    choices: employeeNames,
    name: "deleteEmployee"
}];*/

function startApp() {
    inquirer.prompt(menuPrompt).then(answers => {
        switch (answers.mainAction){
            case "View All Employees":
                readEmployees(function(){
                    startApp();
                });
                break;
            case "View All Departments":
                readDepts(function(){
                    startApp();
                });
                break;
            case "View All Roles":
                readRoles(function(){
                    startApp();
                });
                break;
            case "Add Employee":
                console.log("------------ Add Employee ------------");
                readRoles(function(){
                    inquirer.prompt(addEmployeePrompt).then(answers => {
                        addEmployee(answers.employeeRole, answers.employeeName, function(){
                            console.log("Employee successfully added!");
                            startApp();
                        });
                    });
                });
                break;
            case "Update Employee":
                console.log("------------ Update Employee ------------");
                readEmployees(function(){});
                readRoles(function(){
                    inquirer.prompt(updateEmployeePrompt).then(answers => {
                        updateEmployee(answers.updateEmployeeRoleID, answers.updateEmployeeID, function(){
                            console.log(`Employee Successfully Updated`);
                            startApp();
                        });
                    })
                })
            break;

            /*case "Remove Employee": 
                console.log(`Remove Employee`);
                connection.query(
                    'SELECT e.employee_name, d.deptName, r.title, r.salary FROM employees e LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN departments d ON d.id = r.department_id', 
                    function(err, res) { 
                        if (err) throw err;

                        for (let i=0; i<res.length; i++){
                            employeeNames.push(res[i].employee_name);
                        }
                        inquirer.prompt(removeEmployee).then(answers => {
                            console.log(`Deleted Employee: ${answers.deleteEmployee}`);
                        });                        
                    }
                ); 
                break;*/
            break;
        }
    });
}

