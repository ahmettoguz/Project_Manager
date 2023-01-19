<?php
require_once __DIR__ . "/DatabaseConnection.php";


function checkUserPassword($username, $password)
{
    global $db;

    try {
        $sql = "select * from cookiesession where username = :username and password = :password";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(":username", $username, PDO::PARAM_STR);
        $stmt->bindValue(":password", $password, PDO::PARAM_STR);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    if ($row == false) {
        echo "<h1 class='error'>Wrong Password</h1>";
        return false;
    }
    return true;
}

function  getUserFromDb($username)
{
    global $db;

    try {
        $sql = "select * from cookiesession where username = :username";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(":username", $username, PDO::PARAM_STR);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    return $row;
}

function hasValidSession()
{
    if (isset($_SESSION["user"])) {
        return true;
    }
    return false;
}
