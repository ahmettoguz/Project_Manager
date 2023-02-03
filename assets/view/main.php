<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/message.css">
    <link rel="stylesheet" href="../css/dashboard.css">
    <link rel="stylesheet" href="../css/companyInformation.css">
    <link rel="stylesheet" href="../css/projectDetails.css">
    <link rel="stylesheet" href="../css/modal.css">
    <link rel="stylesheet" href="../css/userInfo.css">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/members.css">
    <!-- font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <!-- font-family: 'Montserrat', sans-serif; -->

    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- font-family: 'Manrope', sans-serif; -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <!-- font-family: 'Roboto', sans-serif; -->

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <!-- font-family: 'Inter', sans-serif; -->

    <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
    <!-- font-family: 'Rubik', sans-serif; -->

    <!-- font -->

    <script src="../js/jquery-3.6.0.min.js"></script>
    <!-- <script src="https://raw.githack.com/SortableJS/Sortable/master/Sortable.js"></script> -->
    <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.min.js" integrity="sha256-eTyxS0rkjpLEo16uXTS0uVCS4815lc40K2iVpWDvdSY=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="../js/main.js"></script>

    <title>Main</title>
</head>

<!-- session operation -->
<?php
require_once __DIR__ . "/../controller/functions.php";

if (!hasValidSession()) {
    header("Location:http://localhost/AhmetOguzErgin/Web/project_manager/");
    exit;
}
?>
<!-- session operation -->

<body>
    <div id="main">
        <header>
            <div id="headerLeft" class="headerElement">
                <div class="companyContainer" onclick="prepare_DisplayCompanyInformation()">
                    <div id="companyIcon" onclick="prepare_DisplayCompanyInformation()"></div>
                    <div id="companyName" onclick="prepare_DisplayCompanyInformation()">Company Name</div>
                </div>
            </div>
            <div id="headerMiddle" class="headerElement"></div>
            <div id="headerRight" class="headerElement">
                <div onclick="changeLanguage()" id="changeLanguageIcon"></div>
                <div class="dropdownContainer">
                    <div class="dropdownHeader"><img src="../images/main/male.png"> Ahmet Oğuz Ergin </div>
                    <ul class="dropdownContent">
                        <li onclick="prepareDisplayUserInformationPage()"><img class="liIcon" src="../images/main/updateUser.png"> <span>User Information</span> </li>
                        <li onclick="logOut()"><img class="liIcon" src="../images/main/logOut.png"> <span>Logout</span> </li>
                    </ul>
                </div>
            </div>
        </header>

        <section class="pageBody">
        </section>
    </div>

    <div id="modalContainer" onclick="closeModal()">
        <div class="modal" onclick="clickOnModal(event)">
            <div class="header">
                <div class="text">-text-</div>
                <div class="close" onclick="closeModal()"></div>
            </div>
            <div class="content">-content-</div>
            <div class="buttonContainer">
                <div class="accept" onclick="acceptModalOperation(this)" >Accept</div>
                <div class="reject" onclick="closeModal()">Reject</div>
            </div>
        </div>
    </div>

    <div onclick="clickMessage()" id="pageMessage">dummy</div>
</body>

</html>