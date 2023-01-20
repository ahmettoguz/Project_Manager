<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        html,
        body,
        #main {
            height: 100%;
            padding: 0;
            margin: 0;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            font-size: 20px;
            background-color: #ddd;
        }

        .maincontainer {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;

        }

        table {
            border-collapse: collapse;
        }

        tr {
            border-radius: 5px;
            border: 2px solid black;
        }

        th {
            padding: 5px 50px;
        }

        td {
            padding: 2px 5px;
            text-align: center;
        }

        h1 {
            text-align: center;
        }

        .box {
            margin: 10px 10px;
        }

        input[type="submit"] {
            font-size: 20px;
            border-radius: 4px;
            color: black;
            background-color: lightblue;
        }
    </style>
</head>

<body>
    <div id="main">
        <div class="maincontainer">
            <?php
            extract($_GET);
            $btn = $btn ?? "asd";

            require_once __DIR__ .  "/pageContentsFunctions.php";
            require_once __DIR__ .  "/DatabaseConnection.php";
            // create database from localhost/phpmyadmin page
            // 3 column I have id, name, code

            // **************************************************************************************
            // create/insert
            if ($btn == "Create") {

                try {
                    // 1. placeholder
                    // $sql = "insert into user (username, email, birthday) values (?, ?, ?)";
                    // $stmt = $db->prepare($sql); // PDOStatement       
                    // $stmt->execute(["Jim", "jim@hotmail.com", "1990-05-15"]);
                    // echo "<p> Jim is added into user table</p>";
                    // echo "<p> Insert ID : ", $db->lastInsertId(), "</p>";
                    // $newUserId = $db->lastInsertId();

                    // 2. by associate array and namespace
                    // $user = [
                    //     "username" => "John",
                    //     "email" => "john@matrix.com",
                    //     "birthday" => "1993-05-30"
                    // ];
                    // $sql = "insert into user (username, email, birthday) values (:username, :email, :birthday)";
                    // $stmt = $db->prepare($sql); // PDOStatement 
                    // $stmt->execute($user);
                    // echo "<p>" . $user["username"] . " is added into user table</p>";
                    // echo "<p> Insert ID : ", $db->lastInsertId(), "</p>";
                    // $newUserId = $db->lastInsertId();


                    $sql = "insert into crudoperations (name, code) values (:name, :code)";
                    $stmt = $db->prepare($sql);
                    $stmt->bindValue(":name", $name, PDO::PARAM_STR);
                    $stmt->bindValue(":code", $code, PDO::PARAM_STR);
                    $stmt->execute();
                    $lastInsertedId = $db->lastInsertId();
                } catch (PDOException $ex) {
                    die("<p>Insert Error : " . $ex->getMessage());
                }
            }
            // **************************************************************************************

            // **************************************************************************************
            // update
            if ($btn == "Update") {
                try {
                    // $user = [
                    //     "user_id" => 3,
                    //     "username" => "John Peter",
                    //     "birthday" => "1995-4-4"
                    // ];
                    // $sql = "update user set username = :username, birthday = :birthday where user_id = :user_id";
                    // $stmt = $db->prepare($sql);
                    // $stmt->execute($user);


                    $sql = "update crudoperations set name = :name, code = :code where id = :id";
                    $stmt = $db->prepare($sql);
                    $stmt->bindValue(":name", $name, PDO::PARAM_STR);
                    $stmt->bindValue(":code", $code, PDO::PARAM_STR);
                    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
                    $stmt->execute();
                    // $updatedRowCount = $stmt->rowCount();
                } catch (PDOException $ex) {
                    die("<p>Update Error : " . $ex->getMessage());
                }
            }
            // **************************************************************************************

            // **************************************************************************************
            // delete
            if ($btn == "Delete") {
                try {

                    $sql = "delete from crudoperations where id = :id";
                    $stmt = $db->prepare($sql);
                    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
                    $stmt->execute();
                    // $deletedRowCount = $stmt->rowCount();
                } catch (PDOException $ex) {
                    die("<p>Update Error : " . $ex->getMessage());
                }
            }
            // **************************************************************************************

            // **************************************************************************************
            // login
            if ($btn == "Login") {
                try {

                    $sql = "select * from crudoperations where id = :id and code = :code";
                    $stmt = $db->prepare($sql);
                    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
                    $stmt->bindValue(":code", $code, PDO::PARAM_STR);
                    $stmt->execute();
                } catch (PDOException $ex) {
                    die("<p>Update Error : " . $ex->getMessage());
                }
                // if ($stmt->rowCount() != 0)
                //     var_dump("logged in");
                // else
                //     var_dump("wrong password");
            }
            // **************************************************************************************

            // **************************************************************************************
            // display/read all 
            try {
                // $sql = "select * from crudoperations order by name asc LIMIT $start , $end";
                // $sql = "select * from crudoperations where name LIKE 'ah%' order by name asc LIMIT $start , $end";
                $sql = "select * from crudoperations";
                $stmt = $db->prepare($sql);
                $stmt->execute();
                $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // $stmt->rowCount();
            } catch (Exception $ex) {
                die("Query Error : " . $ex->getMessage());
            }
            DisplayAll($stmt, $rows);
            // **************************************************************************************

            // **************************************************************************************
            // display/read join
            try {
                $sql = "select * from crudoperations inner join crudoperationsforeigntable on crudoperations.id = crudoperationsforeigntable.referencedId";
                $stmt = $db->prepare($sql);
                $stmt->execute();
                $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // $stmt->rowCount();
            } catch (Exception $ex) {
                die("Query Error : " . $ex->getMessage());
            }
            DisplayJoin($stmt, $rows);
            // **************************************************************************************

            // **************************************************************************************
            // display/read search 1 row
            $id = 1;
            try {
                $sql = "select * from crudoperations where id = :id";
                $stmt = $db->prepare($sql);
                $stmt->bindValue(":id", $id, PDO::PARAM_INT);
                // $stmt->bindValue(":id", $id, PDO::PARAM_STR);
                $stmt->execute();
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
            } catch (Exception $ex) {
                die("Query Error : " . $ex->getMessage());
            }
            DisplayRow($stmt, $row);
            // **************************************************************************************

            ?>

            <table>
                <thead>
                    <th colspan="3">Operations</th>
                </thead>
                <tbody>
                    <tr>
                        <form action="">
                            <td></td>
                            <td><span>Name: </span><input type="text" size="10" name="name"></td>
                            <td><span>Code: </span><input type="text" size="10" name="code"></td>
                            <td><input type="submit" name="btn" value="Create"></td>
                        </form>
                    </tr>
                    <tr>
                        <form action="">
                            <td><span>Id: </span><input type="text" size="10" name="id"></td>
                            <td><span>Name: </span><input type="text" size="10" name="name"></td>
                            <td><span>Code: </span><input type="text" size="10" name="code"></td>
                            <td><input type="submit" name="btn" value="Update"></td>
                        </form>
                    </tr>
                    <tr>
                        <form action="">
                            <td><span>Id: </span><input type="text" size="10" name="id"></td>
                            <td></td>
                            <td></td>
                            <td><input type="submit" name="btn" value="Delete"></td>
                        </form>
                    </tr>
                    <tr>
                        <form action="">
                            <td><span>Id: </span><input type="text" size="10" name="id"></td>
                            <td></td>
                            <td><span>Code: </span><input type="text" size="10" name="code"></td>
                            <td><input type="submit" name="btn" value="Login"></td>
                        </form>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>

</body>

</html>

<!-- add fk -->
<!-- ALTER TABLE `comments`
  ADD CONSTRAINT `comment_user_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT; -->

<!-- LIMIT 0,1   from 0. index 1 row-->
<!-- LIMIT 0,2   from 0. index 2 row-->
<!-- LIMIT 1     from 0. index 1 row-->
<!-- LIMIT 3     from 0. index 3 row-->
<!-- LIMIT 2,2   from 2. index 2 row-->