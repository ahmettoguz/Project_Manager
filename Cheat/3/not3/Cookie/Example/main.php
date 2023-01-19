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
        extract($_GET);
        extract($_COOKIE);

        // delete cookie by time 
        if (isset($logOut)) {
            setcookie("token", "asd", 1, "/");
            header("Location:./login.php");
            exit;
        }

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

        ?>

        <br>
        <form action="" class="center">
            <input class="" type="submit" name="logOut" value="LogOut">
        </form>
    </div>

</body>

</html>