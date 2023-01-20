<?php
require_once __DIR__ . "/../database/DatabaseConnection.php";
session_start();

function performLoginOperation($username, $password, $remember)
{
    global $db;

    $password = sha1($password . "project_manager");

    try {
        $sql = "select user.id,name,surname,username,mail,photo,user_type_id,type as user_type
         from user inner join user_type ON user.user_type_id = user_type.id
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
        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    return $row;
}

function getUsers()
{
    global $db;

    try {
        $sql = "select * from user";
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
        $sql = "select task.id as task_id, department_id, project_id, 	user_id, progress_contribution, name, start_date, end_date, description, comment, state_id, task_state.state
        from task inner join task_state ON  state_id = task_state.id";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        die("Query Error : " . $ex->getMessage());
    }

    return $row;
}


function getSpecificProject($id)
{
    global $db;

    try {
        $sql = "select project.id as id, name, description, photo, start_date, end_date,
        TIMEDIFF(end_date, current_timestamp())  as due, progress, department_id, state_id
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


function addProject_MemberToDatabase($projectName, $description, $addProjectStartDate, $addProjectEndDate, $addProjectSelectedMembers, $progress, $state)
{

    if (($addProjectEndDate) == "")
        $addProjectEndDate = null;

    // change department id dynamic 
    $departmentId = 1;

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
        $proejctId = $db->lastInsertId();
    } catch (PDOException $ex) {
        die("<p>Insert Error : " . $ex->getMessage());
        return "false";
    }

    $addProjectSelectedMembers = json_decode($addProjectSelectedMembers);

    if (!empty($addProjectSelectedMembers))
        for ($i = 0; $i < count($addProjectSelectedMembers); $i++) {
            try {
                $sql = "insert into project_member (department_id, project_id, user_id) values (:department_id, :project_id, :user_id)";
                $stmt = $db->prepare($sql);
                $stmt->bindValue(":department_id", $departmentId, PDO::PARAM_INT);
                $stmt->bindValue(":project_id", $proejctId, PDO::PARAM_INT);
                $stmt->bindValue(":user_id", $addProjectSelectedMembers[$i], PDO::PARAM_INT);
                $stmt->execute();
            } catch (PDOException $ex) {
                die("<p>Insert Error : " . $ex->getMessage());
                return "false";
            }
        }

    return "true";
}


function  addProject_PhotoToDatabase($tempLocation)
{
    if (move_uploaded_file($tempLocation, "../images/project/projectId_0.png")) {
        return "true";
    }

    return "false";
}

