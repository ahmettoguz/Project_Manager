<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- icon -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <!-- <span class="material-symbols-outlined">account_circle</span> -->
    <!-- <span class="material-symbols-outlined">person</span> -->
    <!-- <span class="material-symbols-outlined">lock</span> -->
    <!-- icon -->

    <!-- font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <!-- font-family: 'Montserrat', sans-serif; -->
    <!-- font -->

    <link rel="stylesheet" href="./assets/css/login.css">


    <script src="./assets/js/jquery-3.6.0.min.js" type="text/javascript"></script>
    <!-- jquery ui -->
    <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.min.js" integrity="sha256-eTyxS0rkjpLEo16uXTS0uVCS4815lc40K2iVpWDvdSY=" crossorigin="anonymous"></script>
    <script src="./assets/js/login.js" type="text/javascript"></script>
    <link rel="shortcut icon" href="./assets/images/login/login.png" type="image/x-icon" />
    <title>Login</title>
</head>

<body>
    <div id="main">
        <div id="bigIconContainer">
            <div>
                <span class="material-symbols-outlined">
                    account_circle
                </span>
            </div>
        </div>
        <div class="body">
            <div id="inputs">
                <div class="inputBox">
                    <span class="material-symbols-outlined">person</span>
                    <input id="username" type="text" name="username" placeholder="Username">
                </div>
                <div class="inputBox">
                    <span id="lockIcon" class="material-symbols-outlined">lock</span>
                    <input id="password" type="password" name="password" placeholder="Password">
                </div>
            </div>
            <div id="inputfooter">
                <div id="checkbox">
                    <input type="checkbox" name="remember" value="1"> <span>Remember Me</span>
                </div>
                <div id="forgetpassword"></div>
                <span>Forgot Password?</span>
            </div>
        </div>
        <div id="loginContainer">
            <p>Login</p>
        </div>
    </div>

    <div id="loadingPage">
        <div class="lds-ripple">
            <div></div>
            <div></div>
        </div>
    </div>
</body>

</html>