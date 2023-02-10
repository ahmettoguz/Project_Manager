<?php
require_once __DIR__ . "/../database/DatabaseConnection.php";
session_start();

function performLoginOperation($username, $password, $remember)
{
    global $db;

    $password = sha1($password . "project_manager");

    try {
        $sql = "select user.id, user.name, surname, username, photo, user_type_id, type as user_type, department_id, department.name as department, expertise
         from user inner join user_type ON user.user_type_id = user_type.id
         inner join department ON user.department_id = department.id
         where username = :username and password = :password";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(":username", $username, PDO::PARAM_STR);
        $stmt->bindValue(":password", $password, PDO::PARAM_STR);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    if ($row == false)
        return false;
    else {
        // correct login, form session
        $_SESSION["user"] = $row;
        if ($remember == "true") {
            setcookie(session_name(), session_id(), time() + 60 * 60 * 24 * 7, "/");
        }

        return true;
    }
}

function hasValidSession()
{
    if (isset($_SESSION["user"])) {
        return true;
    }
    return false;
}

function getCompany()
{
    global $db;

    try {
        $sql = "select * from company";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    return $row;
}

function getDepartment()
{
    global $db;

    try {
        $sql = "select * from department";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    return $rows;
}

function getProjectStates()
{
    global $db;

    try {
        $sql = "select * from project_state";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    return $rows;
}


function getProjects()
{
    global $db;

    try {
        // $sql = "select * from project inner join project_state ON project.state_id = project_state.id";
        $sql = "select project.id as id, name, description, photo, start_date, end_date,
        TIMEDIFF(end_date, current_timestamp())  as due, progress, department_id, state_id
        from project 
        inner join project_state 
        ON project.state_id = project_state.id";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    return $rows;
}

function getProjectMembers()
{
    global $db;

    try {
        $sql = "select * from project_member";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    return $rows;
}

function getUsers()
{
    global $db;

    try {
        $sql = "select user.id as id, user.name, surname, username, user_type.type as type, photo, expertise, department.name as department from user
        inner join user_type ON user.user_type_id = user_type.id
        inner join department ON user.department_id = department.id";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    return $row;
}

function getTasks()
{
    global $db;

    try {
        $sql = "select task.id as task_id, department_id, project_id, user_id, name, start_date, end_date, description, comment, state_id, task_state.state
        from task inner join task_state ON  state_id = task_state.id";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    return $row;
}

function getTaskStates()
{
    global $db;

    try {
        $sql = "select * from task_state";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    return $rows;
}



function getSpecificProject($id)
{
    global $db;

    try {
        $sql = "select project.id as id, name, description, photo, start_date, end_date,
        TIMEDIFF(end_date, current_timestamp())  as due, progress, department_id, state_id, state
        from project 
        inner join project_state 
        ON project.state_id = project_state.id
        where project.id = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
        $project = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    try {
        $sql = "select * from project_member where project_id = {$project["id"]}";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
        $members = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    return [$project, $members];
}


function addProject_MemberToDatabase($projectName, $description, $addProjectStartDate, $addProjectEndDate, $addProjectSelectedMembers, $progress, $state, $hasPhoto)
{

    if (($addProjectEndDate) == "")
        $addProjectEndDate = null;

    // değiş. Kontrol et çalışıyor mu diye.
    $departmentId = $_SESSION["user"]["department_id"];

    global $db;

    try {
        $sql = "insert into project (name, description, start_date, end_date, progress, department_id, state_id) values (:name, :description, :start_date, :end_date, :progress, :department_id, :state_id)";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(":name", $projectName, PDO::PARAM_STR);
        $stmt->bindValue(":description", $description, PDO::PARAM_STR);
        $stmt->bindValue(":start_date", $addProjectStartDate, PDO::PARAM_STR);
        $stmt->bindValue(":end_date", $addProjectEndDate, PDO::PARAM_STR);
        $stmt->bindValue(":progress", $progress, PDO::PARAM_INT);
        $stmt->bindValue(":department_id", $departmentId, PDO::PARAM_INT);
        $stmt->bindValue(":state_id", $state, PDO::PARAM_INT);
        $stmt->execute();
        $projectId = $db->lastInsertId();
    } catch (PDOException $ex) {
        die("<p>Insert Error : " . $ex->getMessage());
        return "false";
    }

    if ($hasPhoto == "true") {
        $photoName = "projectId_" . $projectId;

        try {
            $sql = "UPDATE `project` SET `photo` = '$photoName' WHERE `project`.`id` = $projectId";
            $stmt = $db->prepare($sql);
            $stmt->execute();
            // $projectId = $db->lastInsertId();
        } catch (PDOException $ex) {
            die("<p>Insert Error : " . $ex->getMessage());
            return "false";
        }
    }

    $addProjectSelectedMembers = json_decode($addProjectSelectedMembers);

    if (!empty($addProjectSelectedMembers))
        for ($i = 0; $i < count($addProjectSelectedMembers); $i++) {
            try {
                $sql = "insert into project_member (department_id, project_id, user_id) values (:department_id, :project_id, :user_id)";
                $stmt = $db->prepare($sql);
                $stmt->bindValue(":department_id", $departmentId, PDO::PARAM_INT);
                $stmt->bindValue(":project_id", $projectId, PDO::PARAM_INT);
                $stmt->bindValue(":user_id", $addProjectSelectedMembers[$i], PDO::PARAM_INT);
                $stmt->execute();
            } catch (PDOException $ex) {
                die("<p>Insert Error : " . $ex->getMessage());
                return "false";
            }
        }

    return $projectId;
}


function  addProject_PhotoToDatabase($tempLocation, $fileName, $targetLocation)
{
    if (move_uploaded_file($tempLocation, $targetLocation . $fileName)) {
        return "true";
    }

    return "false";
}

function updateCompanyInformation($companyName, $companyIcon)
{
    $preventCache = date("i_s");

    global $db;

    // remove old photo
    try {
        $sql = "select icon from company";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $oldIcon = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $ex) {
        die("<p>Update Error : " . $ex->getMessage());
    }

    if ($oldIcon["icon"] != "default_icon.png")
        unlink("../images/company/{$oldIcon["icon"]}");

    if ($companyIcon == null) {
        try {
            $sql = "update company set name = :name, icon = :icon where id = 1";
            $stmt = $db->prepare($sql);
            $stmt->bindValue(":name", $companyName, PDO::PARAM_STR);
            $stmt->bindValue(":icon", "default_icon.png", PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $ex) {
            die("<p>Update Error : " . $ex->getMessage());
        }
        return "true";
    } else {
        try {
            $sql = "update company set name = :name, icon = :icon where id = 1";
            $stmt = $db->prepare($sql);
            $stmt->bindValue(":name", $companyName, PDO::PARAM_STR);
            $stmt->bindValue(":icon", "icon_{$preventCache}.png", PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $ex) {
            die("<p>Update Error : " . $ex->getMessage());
        }

        if (move_uploaded_file($companyIcon, "../images/company/icon_{$preventCache}.png")) {
            return "true";
        }
    }


    return "false";
}

function logOut()
{
    $_SESSION = [];

    // delete cookie
    setcookie(session_name(), "", 1, "/"); // delete memory cookie 

    // delete session file from tmp
    session_destroy();

    // header("Location:http://localhost/AhmetOguzErgin/Web/project_manager/");
}

function getSession()
{
    return $_SESSION["user"];
}



function updateProject($id, $name, $description, $startDate, $endDate, $members, $progress, $state, $hasPhoto)
{
    $departmentId = $_SESSION["user"]["department_id"];
    if (($endDate) == "")
        $endDate = null;


    // echo "id: " . $id . ", name: " . $name . ", description: " . $description . ", sdate: " . $startDate . ", edate" . $endDate . ", member: " . $members . ", progres: " . $progress . ", state: " . $state . ", hasPhtoo: " . $hasPhoto . ", depId", $departmentId;

    global $db;

    try {
        $sql = "update project set name = :name, description = :description, start_date = :start_date, end_date = :end_date, progress = :progress, state_id = :state_id
        where id = :id
        ";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(":name", $name, PDO::PARAM_STR);
        $stmt->bindValue(":description", $description, PDO::PARAM_STR);
        $stmt->bindValue(":start_date", $startDate, PDO::PARAM_STR);
        $stmt->bindValue(":end_date", $endDate, PDO::PARAM_STR);
        $stmt->bindValue(":progress", $progress, PDO::PARAM_INT);
        $stmt->bindValue(":state_id", $state, PDO::PARAM_INT);
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
    } catch (PDOException $ex) {
        die("<p>Insert Error : " . $ex->getMessage());
        return "false";
    }

    //get current members and create member array
    $curMembersArray = getProjectMembers();
    $curMembers = [];

    foreach ($curMembersArray as $key => $value) {

        if ($value["department_id"] == $departmentId && $value["project_id"] == $id)
            array_push($curMembers, $value["user_id"]);
    }

    $members = json_decode($members);

    // first try to delete if old members are not in the new ones
    for ($i = 0; $i < count($curMembers); $i++) {
        if (!in_array($curMembers[$i], $members)) {
            try {
                $sql = "delete from project_member
                where department_id = :department_id 
                and project_id = :project_id 
                and user_id = :user_id";
                $stmt = $db->prepare($sql);
                $stmt->bindValue(":department_id", $departmentId, PDO::PARAM_INT);
                $stmt->bindValue(":project_id", $id, PDO::PARAM_INT);
                $stmt->bindValue(":user_id", $curMembers[$i], PDO::PARAM_INT);
                $stmt->execute();
            } catch (PDOException $ex) {
                die("<p>Update Error : " . $ex->getMessage());
            }
        }
    }

    // second try to add new members which are not in old one
    for ($i = 0; $i < count($members); $i++) {
        if (!in_array($members[$i], $curMembers)) {
            try {
                $sql = "insert into project_member (department_id, project_id, user_id) values (:department_id, :project_id, :user_id)";
                $stmt = $db->prepare($sql);
                $stmt->bindValue(":department_id", $departmentId, PDO::PARAM_INT);
                $stmt->bindValue(":project_id", $id, PDO::PARAM_INT);
                $stmt->bindValue(":user_id", $members[$i], PDO::PARAM_INT);
                $stmt->execute();
            } catch (PDOException $ex) {
                die("<p>Insert Error : " . $ex->getMessage());
                return "false";
            }
        }
    }

    if ($hasPhoto == "true") {
        $photoName = "projectId_" . $id;

        try {
            $sql = "UPDATE `project` SET `photo` = '$photoName' WHERE `project`.`id` = $id";
            $stmt = $db->prepare($sql);
            $stmt->execute();
        } catch (PDOException $ex) {
            die("<p>Insert Error : " . $ex->getMessage());
            return "false";
        }
    }

    return true;
}

function deleteProject($id)
{
    // delete project
    global $db;
    try {
        $sql = "delete from project where id = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
        // $deletedRowCount = $stmt->rowCount();
    } catch (PDOException $ex) {
        return false;
        die("<p>Update Error : " . $ex->getMessage());
    }

    return true;
}

function checkNewUsername($username)
{
    global $db;

    try {
        $sql = "select * from user where username = :username";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(":username", $username, PDO::PARAM_STR);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    if ($row)
        return false;
    else
        return true;
}
