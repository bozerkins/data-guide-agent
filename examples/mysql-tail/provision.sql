DROP DATABASE IF EXISTS main_db;
CREATE DATABASE IF NOT EXISTS main_db;
CREATE TABLE IF NOT EXISTS main_db.from_table (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(1000),
    city VARCHAR(1000),
    `state` VARCHAR(1000),
    zipCode VARCHAR(1000),
    product VARCHAR(1000),
    price VARCHAR(1000),
    color VARCHAR(1000),
    stamp BIGINT
);
TRUNCATE TABLE main_db.from_table;
CREATE TABLE IF NOT EXISTS main_db.to_table (
    id INT,
    country VARCHAR(1000),
    city VARCHAR(1000),
    `state` VARCHAR(1000),
    zipCode VARCHAR(1000),
    product VARCHAR(1000),
    price VARCHAR(1000),
    color VARCHAR(1000),
    stamp BIGINT
);
TRUNCATE TABLE main_db.to_table;

INSERT INTO main_db.from_table (country,city,`state`,zipCode,product,price,color,stamp) 
SELECT country,city,`state`,zipCode,product,price,color,stamp FROM main_db.from_table LIMIT 20;