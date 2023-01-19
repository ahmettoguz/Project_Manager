<?php

// Main  purpose of using cookie is storing client information for different purposes
// First thing is authentication. ..Advertisement, development according to user preferences
// cookies are stored in client browser
// expire date can be determined to any time
// client may change his cookie information 
// lets say we have table like username password and cookie token

// Implementation
// when user get into LOGIN PAGE: CHECK
// ******************************************************************************
// 1. check if has cookie and this cookie is valid for application (compare with database) if it is true direct to main page. bypass login page.

if (hasCookieAlready() && isCookieValid()) {
    header("Location:./main.php");
    exit;
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
// ******************************************************************************
// 2. if there is no cookie and user logged on system with correct password and username than  CREATE
// create unique token with sha1 
// update database token
// send cookie to client
// and direct to authenticated page

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // check username and password from database
    if (checkUserPassword($username, $password)) {
        // you are authenticated

        // create unique cookie token for user
        $token = sha1(uniqid() . "_TOKEN_" . time());

        // update database token column 
        updateDatabaseToken($username, $token);

        // give that token to user as cookie
        setcookie("token", $token, time() + 60 * 60 * 1, "/", "", true, true);

        // direct to page as authenticated with cookie
        header("Location:./main.php");
        exit;
    }
}
// ******************************************************************************

// when user get into Main Page: 
// 1. check if user get this page by authentication or not
if (!hasCookieAlready() || !isCookieValid()) {
    // if there is no cookie or cookie is not valid for us exit with login page
    header("Location:./login.php");
    exit;
} else {
    // display info
    $user =  getUserFromDb($token);
    echo "<p class='center'> Hello {$user["username"]}. </br> We miss you! </p>";
    echo "<p class='center'></br>Your cookie token help us to authenticate you ! <br> $token</p>";
}
// ******************************************************************************

// LOGOUT
// basically it delete cookie by aranging time to a past 
// delete cookie by time     as delete also you may update like that
if (isset($logOut)) {
    setcookie("token", "asd", 1, "/");
    header("Location:./login.php");
    exit;
}




// Tricks footnotes
// when setcookie() is executed $_COOKIE array not refreshed so you need to refresh page.
// you cannot change cookie with array you need to use setcookie() expression
// in inspect element -> application you may see change cookies
// setcookie("name" : "ahmet", time()+60*60*2, "/", "ahmo.net", true, true)
//        cookiename, value  , 2 hour,  allowed folder, domain, https, not sending cookie with javascript
