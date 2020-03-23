DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employees (
    id int NOT NULL AUTO_INCREMENT,
    employee_name varchar(30) NOT NULL,
    role_id int,
    manager_id int,
    PRIMARY KEY (id)
);

CREATE TABLE departments (
    id int NOT NULL AUTO_INCREMENT,
    deptName varchar(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(30),
    salary decimal(7,2) NOT NULL,
    department_id int NOT NULL,
    PRIMARY KEY (id)
);