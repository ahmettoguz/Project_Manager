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
    if ($_POST["opt"] == "updateCompanyInformation") {
        echo json_encode(updateCompanyInformation($_POST["companyName"], isset($_FILES["companyIcon"]["tmp_name"]) ? $_FILES["companyIcon"]["tmp_name"] : null));
        // echo json_encode(updateCompanyInformation($_POST["companyName"], $_FILES["companyIcon"]["tmp_name"]));
    }
    if ($_POST["opt"] == "updateProject")
        echo json_encode(updateProject($_POST["projectId"], $_POST["projectName"], $_POST["description"], $_POST["addProjectStartDate"], $_POST["addProjectEndDate"], $_POST["addProjectSelectedMembers"], $_POST["progress"], $_POST["state"], $_POST["hasPhoto"]));

    // **************
    if ($_POST["opt"] == "updateUserInformations") {
        if (isset($_FILES["file"])) {
            echo json_encode(updateUserInformations($_POST["name"], $_POST["surname"], $_POST["username"], $_POST["expertise"], $_POST["password"], $_FILES["file"]["tmp_name"], $_POST["id"]));
        } else {
            echo json_encode(updateUserInformations($_POST["name"], $_POST["surname"], $_POST["username"], $_POST["expertise"], $_POST["password"], "no file", $_POST["id"]));
        }
    }

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
    elseif ($_GET["opt"] == "getCompany")
        echo json_encode(getCompany());
    elseif ($_GET["opt"] == "logOut")
        echo json_encode(logOut());
    elseif ($_GET["opt"] == "getSession")
        echo json_encode(getSession());
    elseif ($_GET["opt"] == "deleteProject")
        echo json_encode(deleteProject($_GET["id"]));
    elseif ($_GET["opt"] == "checkNewUsername")
        echo json_encode(checkNewUsername($_GET["username"]));
}
