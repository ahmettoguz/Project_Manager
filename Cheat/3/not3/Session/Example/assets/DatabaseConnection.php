<?php

$databaseName = "test";
$user = "std";
$pass = "";

// create data source name and connect to database
$dsn = "mysql:host=localhost;dbname=$databaseName;charset=utf8mb4";
try {
    $db = new PDO($dsn, $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $ex) {
    die("DB Connect Error");
}
