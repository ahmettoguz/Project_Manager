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

    // check if already have authenticated
    if (hasCookieAlready() && isCookieValid()) {
        header("Location:./main.php");
        exit;
    }

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


    ?>

    <div class="container">
        <h1>Login Page</h1>
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