<?php
require_once __DIR__ . "/functions.php";
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($_POST["opt"] == "login")
        echo json_encode(performLoginOperation($_POST["username"], $_POST["password"], $_POST["remember"]));

    if ($_POST["opt"] == "addProject_MemberToDatabase")
        echo json_encode(addProject_MemberToDatabase($_POST["projectName"], $_POST["description"], $_POST["addProjectStartDate"], $_POST["addProjectEndDate"], $_POST["addProjectSelectedMembers"], $_POST["progress"], $_POST["state"], $_POST["hasPhoto"]));
    if ($_POST["opt"] == "uploadPhotoToDatabase")
        echo json_encode(addProject_PhotoToDatabase($_FILES["addProjectFileUpload"]["tmp_name"], $_POST["targetFileName"], $_POST["destinationLocationFile"]));


    // *************************
    // *************************
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if ($_GET["opt"] == "getProjectStates")
        echo json_encode(getProjectStates());
    elseif ($_GET["opt"] == "getProjects")
        echo json_encode(getProjects());
    elseif ($_GET["opt"] == "getProjectMembers")
        echo json_encode(getProjectMembers());
    elseif ($_GET["opt"] == "getUsers")
        echo json_encode(getUsers());
    elseif ($_GET["opt"] == "getTasks")
        echo json_encode(getTasks());
    elseif ($_GET["opt"] == "getSpecificProject")
        echo json_encode(getSpecificProject($_GET["id"]));
    elseif ($_GET["opt"] == "getTaskStates")
        echo json_encode(getTaskStates());
    elseif ($_GET["opt"] == "getDepartment")
        echo json_encode(getDepartment());
}
