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

function updateDatabaseToken($username, $token)
{
    global $db;

    try {
        $sql = "update cookiesession set token = :token where username = :username";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(":username", $username, PDO::PARAM_STR);
        $stmt->bindValue(":token", $token, PDO::PARAM_STR);
        $stmt->execute();
    } catch (PDOException $ex) {
        die("<p>Update Error : " . $ex->getMessage());
    }
}

function  getUserFromDb($token)
{
    global $db;

    try {
        $sql = "select * from cookiesession where token = :token";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(":token", $token, PDO::PARAM_STR);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    return $row;
}

function hasCookieAlready()
{
    if (!empty($_COOKIE))
        return true;
    return false;
}

function isCookieValid()
{
    $token = $_COOKIE["token"];

    $user = getUserFromDb($token);

    if ($user == false)
        return false;
    return true;
}
