<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/style.css">
    <style>
        * {
            font-size: 20px;
        }

        .container {
            width: 70%;
        }
    </style>
    <title>Document</title>
</head>

<body>
    <div class="container">
        <?php
        require_once __DIR__ . "/assets/functions.php";
        session_start();
        extract($_GET);
        extract($_COOKIE);

        // check session to prevent unauthenticated users
        if (!hasValidSession()) {
            header("Location:./login.php");
            exit;
            var_dump(hasValidSession());
        }

        $userData = $_SESSION["user"];

        echo "<p class='center'> Hello {$userData["username"]}. </br> We miss you! </p>";
        echo "<p class='center'></br>Your cookie with sessionId help us to authenticate you ! <br> {$_COOKIE["PHPSESSID"]} </p>";


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


        ?>

        <br>
        <form action="" class="center">
            <input class="" type="submit" name="logOut" value="LogOut">
        </form>
    </div>

</body>

</html>