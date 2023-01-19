<?php
// In session, file is created by server 
// File id will be given to client with cookie
// Cookie of the session automatically deleted when browser is closed or logout 
session_start(); //do not forget to put that for every page


// ------------------------------------------------------------------
// 1. LOGIN CREATE 
//check if there is session and direct
if (hasValidSession()) {
    header("Location:./main.php");
    exit;
}

function hasValidSession()
{
    if (isset($_SESSION["user"])) {
        return true;
    }
    return false;
}

// if there is no, form session file
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (checkUserPassword($username, $password) == true) {
        // form session file
        $_SESSION["user"] = getUserFromDb($username);

        //remember me, //set session cookie with time
        // bu aşağıdaki sayfa ilk açıldığı zaman çalışmıyor çünkü cookie sayfa kapanınca save ediliyor.
        // setcookie(session_name(), $_COOKIE["PHPSESSID"], time() + 60 * 60 * 24 * 7, "/");
        // setcookie(session_name(), session_id(), time() + 60 * 60 * 24 * 7, "/");

        // direct to main page
        header("Location:./main.php");
        exit;
    }
}

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

// ------------------------------------------------------------------
// 2. Main Page CHECK READ
// check session to prevent unauthenticated users
if (!hasValidSession()) {
    header("Location:./login.php");
    exit;
    var_dump(hasValidSession());
}

$userData = $_SESSION["user"];

// ------------------------------------------------------------------
// 3. LOG OUT DELETE  UPDATE
if (isset($logOut)) {
    //delete anything specific
    // unset($_SESSION["login"]);

    // update anything specific
    // $_SESSION["login"]["name"] = "ahmet" ;

    //clear data
    $_SESSION = [];

    // delete cookie
    setcookie(session_name(), "", 1, "/"); // delete memory cookie 

    // delete session file from tmp
    session_destroy();

    header("Location: login.php");
}
