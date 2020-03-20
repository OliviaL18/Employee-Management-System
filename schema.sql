DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employees (
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id int NOT NULL,
    manager_id int NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE departments (
    id int NOT NULL AUTO_INCREMENT,
    deptName varchar(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(30) NOT NULL,
    salary int NOT NULL,
    department_id int NOT NULL,
    PRIMARY KEY (id)
);