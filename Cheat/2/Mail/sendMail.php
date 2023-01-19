<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            font-size: 20px;
        }
    </style>
</head>

<body>

    <?php

    require_once __DIR__ . "/PHPMailer/src/Exception.php";
    require_once __DIR__ . "/PHPMailer/src/SMTP.php";
    require_once __DIR__ . "/PHPMailer/src/PHPMailer.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.office365.com'; // $mail->Host = 'asmtp.bilkent.edu.tr';
    $mail->SMTPAuth = true;
    $mail->Username = "gereksizmaa@hotmail.com"; // $mail->Username = "oguz.ergin@ug.bilkent.edu.tr";
    $mail->Password = "gereksizMa123"; //password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom($mail->Username, 'Header'); // header
    $mail->addAddress('oguz.ergin@ug.bilkent.edu.tr', 'oguz'); // recipents

    $mail->isHTML(true);
    $mail->Subject = 'Subject'; //subject
    $mail->Body = "<div>hello</div> </br> <h1>Hi</h1>"; //message
    $mail->send();

    ?>
</body>

</html>