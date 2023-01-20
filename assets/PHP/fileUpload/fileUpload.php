<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        input[type="file"] {
            background-color: yellow;

        }
    </style>
</head>

<body>

    <?php

    extract($_POST);
    extract($_FILES);

    // var_dump($_POST);
    var_dump($_FILES);

    if (!empty($_FILES)) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], "../destination/destination.png")) {
            var_dump("file uploaded");
        }
    } else


    ?>

    <form action="" method="post" enctype="multipart/form-data">
        <!-- <input type="text" name="name" value="ahmet"> -->
        <br>
        <br>
        <br>
        <input type="file" name="file">
        <br>
        <br>
        <br>
        <input type="submit">
    </form>

</body>

</html>