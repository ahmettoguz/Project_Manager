<?php
require_once __DIR__ . "/functions.php";
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($_POST["opt"] == "login")
        echo json_encode(performLoginOperation($_POST["username"], $_POST["password"], $_POST["remember"]));
    if ($_POST["opt"] == "addProjectToDatabase")
        echo json_encode(addProjectToDatabase($_POST["projectName"], $_POST["description"], $_POST["addProjectStartDate"], $_POST["addProjectEndDate"], $_POST["addProjectSelectedMembers"], $_POST["progress"], $_POST["state"]));
        
        
        
        

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
}
