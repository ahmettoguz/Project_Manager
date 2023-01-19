<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/style.css">
    <title>Document</title>
</head>

<body>

    <?php
    require_once __DIR__ . "/assets/functions.php";
    extract($_POST);

    //create session id and assign to cookie
    session_start();


    //check if there is session 
    if (hasValidSession()) {
        header("Location:./main.php");
        exit;
    }

    // login 
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (checkUserPassword($username, $password) == true) {
            // form session file
            $_SESSION["user"] = getUserFromDb($username);

            //remember me, //set session cookie with time
            // setcookie(session_name(), $_COOKIE["PHPSESSID"], time() + 60 * 60 * 3, "/");

            // direct to main page
            header("Location:./main.php");
            exit;
        }
    }


    ?>

    <div class="container">
        <h1>Login Page Session</h1>
        <form action="" method="POST">
            <table>
                <tr>
                    <td>
                        <span>Username: </span>
                    </td>
                    <td>
                        <input type="text" name="username" value="<?= isset($username) ? $username : "" ?>">
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>Password: </span>
                    </td>
                    <td>
                        <input type="password" name="password" value="<?= isset($password) ? $password : "" ?>">
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="center">
                        <input type="submit" value="Login">
                    </td>
                </tr>
            </table>
        </form>
    </div>


</body>

</html>