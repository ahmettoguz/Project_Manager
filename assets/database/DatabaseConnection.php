<?php

$host = "localhost";
$databaseName = "project_manager";
$user = "root";
$pass = "";

// create data source name and connect to database
$dsn = "mysql:host=$host;dbname=$databaseName;charset=utf8mb4";
try {
    $db = new PDO($dsn, $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $ex) {
    die("DB Connect Error");
}
