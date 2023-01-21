<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/message.css">
    <!-- font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <!-- font-family: 'Montserrat', sans-serif; -->

    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- font-family: 'Manrope', sans-serif; -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <!-- font-family: 'Roboto', sans-serif; -->
    <!-- font -->

    <script src="../js/jquery-3.6.0.min.js"></script>
    <!-- <script src="https://raw.githack.com/SortableJS/Sortable/master/Sortable.js"></script> -->
    <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.min.js" integrity="sha256-eTyxS0rkjpLEo16uXTS0uVCS4815lc40K2iVpWDvdSY=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="../js/main.js"></script>

    <title>Main</title>
</head>
<style>
    /* font */
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap');

    /* font-family: 'Outfit', sans-serif; */
    /* font */
    * {
        box-sizing: border-box;
    }

    html,
    body {
        font-family: 'Outfit', sans-serif;
        height: 100%;
        padding: 0;
        margin: 0;
    }

    .layoutContainer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(0, 0, 0, 0.3);
    }

    .layout {
        width: 40%;
        height: 40%;
        background-color: white;
        border: 4px outset silver;

        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: black 0px 13px 27px -5px, black 0px 8px 16px -8px;
    }

    .displayNone {
        display: none !important;
    }

    #main {
        height: 100%;
        background-color: rgb(240, 248, 250);
    }

    #main>header {
        height: 8.5%;
        user-select: none;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        box-shadow: 0px 0px 4px silver, 0px 0px 2px black;
    }

    .headerElement {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
    }

    #headerLeft {
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;
        font-style: italic;
        width: 30%;
        /* background-color: yellow; */
    }

    #companyIcon {
        margin: 0 15px;
        width: 50px;
        height: 100%;
        background-image: url("../images/main/company_0.png");
        background-size: 40px auto;
        background-position: center;
        background-repeat: no-repeat;
    }

    #headerMiddle {
        width: 40%;
        /* background-color: blue; */
    }

    .locationNode {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .locationNode div,
    .locationNode span {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* home icon */
    #homeTargetIcon {
        color: transparent;
        width: 37px;
        background-image: url("../images/main/home_4.png");
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-position: center;
        /* background-color: blueviolet; */
    }

    .rightArrow {
        width: 20px;
        margin: 0 5px;
        background-image: url("../images/main/rightArrow.png");
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    }

    #headerRight {
        width: 30%;
        /* background-color: red; */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #changeLanguageIcon {
        height: 100%;
        width: 48px;
        background-image: url("../images/main/language.png");
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
        transition: all 300ms ease-in-out;
    }

    #changeLanguageIcon:hover {
        transform: rotate(-10deg);
    }

    .dropdownContainer {
        min-width: max-content;
        width: 250px;
        margin: 0 20px;
        height: 100%;
        position: relative;
        /* border: 1px solid black; */
    }


    .dropdownHeader {
        padding: 0 20px 0 0;
        overflow: hidden;
        /* border: 1px solid black; */
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        margin: auto;
    }

    .dropdownHeader img {
        padding: 0 5px;
        height: 90%;
        width: auto;
        transition: all 500ms ease-in-out;
    }

    .dropdownHeader:hover img,
    .dropdownContainer:has(.dropdownContent:hover) .dropdownHeader img {
        transform: scale(1.1);
    }

    .dropdownHeader:hover~.dropdownContent,
    .dropdownContent:hover {
        position: absolute;
        max-height: 500px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    .dropdownContent {
        margin-top: 5px;
        position: absolute;
        width: 100%;
        max-height: 0;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-radius: 3px;

        transition: max-height 500ms ease-in-out;
    }


    ul {
        margin: 0;
        padding: 0;
    }

    .dropdownContent li {
        margin: 0;
        padding: 5px 10px;
        list-style: none;

        border-radius: 3px;
        transition: border 150ms ease-in-out;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 0.5px solid silver;
        border-top: 0.5px solid transparent;
        border-right: 0.5px solid transparent;
        background-color: white;
    }

    .dropdownContent li:hover {
        background-image: linear-gradient(270deg, rgb(255, 215, 215), white);
        border-left: 4px solid rgb(35, 171, 242);
        border-top: 0.5px solid rgb(35, 171, 242);
        border-bottom: 0.5px solid rgb(35, 171, 242);
        border-right: 0.5px solid rgb(35, 171, 242);
    }

    .dropdownContent li:hover img {
        transform: scale(1.1);
    }

    .liIcon {
        height: auto;
        width: 30px;
        padding-right: 20px;
        padding-left: 10px;
        transition: all 600ms ease-in-out;
    }

    /* ********************************************************** */

    section.pageBody {
        /* font-family: 'Manrope', sans-serif; */
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        font-family: 'Roboto', sans-serif;
        margin: 1.5vh 1%;
        width: 98%;
        height: 88.5%;
        /* border: 1px solid black; */
        /* background-color: rgb(230, 238, 240); */
        /* background-color: red; */
    }

    section.pageBody .tabTitle {
        height: 9%;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(228, 232, 235);
        width: 80%;
        margin: 0 auto;
        /* margin-top: 50px; */
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 7px;
        margin-top: 0.2vh;
        /* border: 1px solid black; */
    }

    section.pageBody .tabTitle .tab {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 75%;
        background-color: yellow;
        width: 100%;
        border-radius: 5px;
        margin: 0 7px;
        font-size: 1.4em;
        font-weight: 500;
        background-color: rgb(228, 232, 235);
        color: darkslategray;
        transition: all 500ms;
    }

    section.pageBody .tabTitle .selectedTab {
        background-color: white;
        color: #087FFF;
        font-size: 1.6em;
    }

    section.pageBody .body {
        margin-top: 1vh;
        width: 98%;
        height: 86.5%;
        border-radius: 2px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        /* border: 1px solid black; */
    }

    section.pageBody .body header {
        width: 94%;
        margin: 0.5vh 3% 0 3%;
        min-height: 60px;
        height: 12%;
        /* background-color: rgb(255, 245, 245); */
        border-radius: 12px;
        /* border: 1px solid black; */
        box-shadow: 0px 10px 10px -15px #111;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: 'Manrope', sans-serif;
        font-size: 1.3em;
        font-weight: 500;
    }

    section.pageBody .body header>div {
        width: 50%;
        height: 90%;
        display: flex;
        align-items: center;
    }

    /* colors of project states  */
    :root {
        --completed1: rgb(76, 201, 120);
        --completed2: rgb(93, 250, 148);
        --completed3: rgb(93, 250, 148);
        --completed4: rgb(176, 233, 80);
        --completed5: rgb(149, 212, 68);
        --completed6: rgb(80, 158, 39);

        --waiting1: rgb(250, 214, 95);
        --waiting2: rgb(255, 216, 91);
        --waiting3: rgb(248, 168, 66);
        --waiting4: rgb(247, 122, 37);

        --inProgress1: rgb(116, 211, 251);
        --inProgress2: rgb(28, 147, 255);
        --inProgress3: rgb(23, 118, 254);
        --inProgress4: rgb(44, 104, 210);
        --inProgress5: rgb(55, 91, 246);
        --inProgress6: rgb(113, 41, 231);


        --terminated1: rgb(244, 194, 199);
        --terminated2: rgb(254, 141, 143);
        --terminated3: rgb(238, 63, 94);
        --terminated4: rgb(220, 53, 68);
        --terminated5: rgb(220, 53, 68);
        --terminated6: rgb(196, 21, 49);

        --inMaintenance1: rgb(233, 185, 225);
        --inMaintenance2: rgb(217, 184, 224);
        --inMaintenance3: rgb(171, 185, 224);
        --inMaintenance4: rgb(159, 179, 218);

        --shadow: box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px 0px;
    }

    section.pageBody .body header {
        user-select: none;
        margin-left: 25px;
        width: 100%;
        justify-content: center;
        /* background-color: yellow; */
    }

    section.pageBody .body header .projectState {
        padding: 0 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 4px;
        height: 70%;
        border-radius: 4px;
        color: white;
        font-weight: 600;
        background-color: rgb(228, 232, 235, 0.7);
        color: rgb(47, 79, 79, 0.7);
        transition: all 1s;
        box-shadow: none;
    }


    section.pageBody .body header .stateId1 {
        background-image: linear-gradient(var(--inProgress1), var(--inProgress2));
    }

    section.pageBody .body header .stateId2 {
        background-image: linear-gradient(var(--waiting2), var(--waiting3));
    }

    section.pageBody .body header .stateId3 {
        background-image: linear-gradient(var(--inMaintenance1), var(--inMaintenance4));
    }

    section.pageBody .body header .stateId4 {
        background-image: linear-gradient(var(--completed3), var(--completed1));
    }

    section.pageBody .body header .stateId5 {
        background-image: linear-gradient(var(--terminated2), var(--terminated3));
    }

    section.pageBody .body header .stateId6 {
        background-image: radial-gradient(at 5% 10%, var(--completed4), var(--completed1));
    }


    section.pageBody .body header .stateId99 {
        background-image: radial-gradient(at 15% 20%, var(--completed1), var(--inProgress4));
    }

    section.pageBody .body header .stateSelected {
        color: white;
        box-shadow: 0px 10px 7px -10px #087FFF;
    }

    section.pageBody .body header .right {
        /* şuraya bir bak */
        justify-content: flex-end;
        align-items: center;
        margin-right: 25px;
        width: 20%;
        /* background-color: wheat; */
    }

    section.pageBody .body section.main {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: auto;
        overflow-x: visible;
        width: 100%;
        margin-top: 2.5vh;
        min-height: 450px;
        height: 86%;
        padding: 0 10px;
        /* border: 1px solid black; */
    }

    /* scroll bar */
    section.pageBody .body section.main::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: #F5F5F5;
        border-radius: 10px;
    }

    section.pageBody .body section.main::-webkit-scrollbar {
        width: 10px;
        background-color: #F5F5F5;
    }

    section.pageBody .body section.main::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #FFF;
        background-image: linear-gradient(var(--completed3), var(--completed2), var(--completed3))
    }

    /* scroll bar */

    section.pageBody .body section.main ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: flex-start;
    }

    section.pageBody .body section.main ul li.projectBoxContainer:hover {
        box-shadow: rgba(0, 0, 0, 0.37) 0px 3px 6px, rgba(0, 0, 0, 0.4) 0px 3px 6px;
    }

    section.pageBody .body section.main ul li.projectBoxContainer {
        margin: 10px;
        width: 30%;
        min-width: 320px;
        height: 140px;
        min-height: 140px;
        /* border: 1px solid black; */
        border-radius: 5px;
        list-style: none;
        font-family: 'Manrope', sans-serif;
        font-weight: 500;
        display: flex;
        font-size: 15px;
        background-image: radial-gradient(at 20% 0%, white 40%, rgb(230, 238, 240));
        /* box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px 0px; */
        /* box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; */
        /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; */
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
        transition: 200ms;

    }

    section.pageBody .body section.main ul li.projectBoxContainer .left {
        border-radius: 5px;
        display: flex;
        /* align-items: center; */
        justify-content: center;
        flex-direction: column;
        /* background-color: yellow; */
        width: 65%;
        padding-left: 5px;
    }

    section.pageBody .body section.main ul li.projectBoxContainer .left .header {
        overflow: hidden;
        padding: 0 5px;
        height: 50%;
        text-align: center;
        /* line-height: 20px; */
        /* background-color: red; */
        justify-content: center;
        display: flex;
        align-items: center;
        font-weight: 800;
        font-size: 18px;
    }

    section.pageBody .body section.main ul li.projectBoxContainer .left .developerContainer {
        display: flex;
        height: 20%;
        align-items: center;
        margin: 0 15px;
        /* background-color: yellow; */
    }

    section.pageBody .body section.main ul li.projectBoxContainer .left .developerContainer span {
        margin-right: 10px;
        font-size: 18px;
    }

    section.pageBody .body section.main ul li.projectBoxContainer .left .developerContainer .developerIconContainer {
        box-sizing: border-box;
        height: 28px;
        border-radius: 50%;
        display: flex;
    }

    section.pageBody .body section.main ul li.projectBoxContainer .left .developerContainer .developerIconContainer .developerIcon {
        box-sizing: border-box;
        border: 1px solid white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 150%;
    }

    section.pageBody .body section.main ul li.projectBoxContainer .left .remainTaskContainer {
        height: 25%;
        display: flex;
        align-items: center;
        /* background-color: aqua; */
    }

    section.pageBody .body section.main ul li.projectBoxContainer .left .remainTaskContainer .taskIcon {
        background-image: url("../images/project/taskBoard_0.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        width: 30px;
        height: 30px;
        margin: 0 15px;
        /* border: 1px solid black; */
    }

    section.pageBody .body section.main ul li.projectBoxContainer .right {
        border-radius: 5px;
        width: 35%;
        /* background-color: greenyellow; */
        /* border: 1px solid black; */
    }

    section.pageBody .body section.main ul li.projectBoxContainer .right .progressContainer {
        /* position: relative; */
        width: 100%;
        height: 70%;
        padding: 10px;
        border-radius: 5px;
        /* background-color: yellow; */
        /* border: 1px solid blue; */
        display: flex;
        justify-content: center;
        align-items: flex-start;
        /* background-color: yellow; */
    }

    section.pageBody .body section.main ul li.projectBoxContainer .right .dueBox {
        border-radius: 5px;
        font-family: 'Outfit', sans-serif;
        height: 30%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        /* background-color: aqua; */
        /* border: 1px solid black; */
    }

    /* radial progress bar */
    .progressCircleContainer {
        font-size: 1em;
        /* margin: auto; */
        /* width: 0px; */
        /* height: 100%; */
        /* height: 50px; */
        /* background-color: black */
    }

    .progressCircleColor {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid rgb(200, 200, 200);
        box-shadow: 6px 6px 10px -1px rgb(0, 0, 0, 0.15),
            -4px -4px 10px -1px rgb(255, 255, 255, 0.7);
    }

    .progressNumber {
        font-size: 18px;
        position: relative;
        top: 0px;
        left: 0px;
        width: 0px;
        height: 0px;
        border-radius: 50%;
        /* background-color: yellow; */
        background-color: white;
        border: 1px solid silver;
        box-shadow: inset 4px 4px 6px -1px rgb(0, 0, 0, 0.2),
            inset -4px -4px 6px -1px rgb(255, 255, 255, 0.7),
            0.5px 0.5px 0px rgb(0, 0, 0, 0.15),
            0px 12px 10px -10px rgb(0, 0, 0, 0.05);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* radial progress bar */

    section.pageBody .body section.main ul li.projectBoxContainer .right .detail {
        position: relative;
        top: -97%;
        left: 78%;
        background-image: url("../images/main/information_2.png");
        background-position: center;
        background-size: cover;
        width: 23px;
        height: 23px;
    }

    section.pageBody .body section.main ul li.AddProjectBoxContainer:hover .addContainer {
        width: 60%;
        font-size: 1.8em;
        font-weight: 700;
        /* color:#087FFF; */
    }

    section.pageBody .body section.main ul li.AddProjectBoxContainer {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    section.pageBody .body section.main ul li.AddProjectBoxContainer .addContainer {
        font-family: 'Roboto', sans-serif;
        opacity: 0.7;
        font-size: 1.5em;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 50%;
        height: 75%;
        transition: all 0.1s;
        /* border: 1px solid black; */
        /* background-color: red; */
    }

    section.pageBody .body section.main ul li.AddProjectBoxContainer .addContainer .addIcon {
        background-image: url("../images/main/add.png");
        height: 80%;
        width: 25%;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        margin: 0 5px;
        /* border: 1px solid black; */
    }


    /* addProject */
    .pageBody .body .addProjectContainer {
        font-size: 20px;
        margin: 0 auto;
        width: 50%;
        height: 100%;
        min-height: 453px;
        min-width: 750px;
        background-image: linear-gradient(rgb(217, 237, 254), white);
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-radius: 5px;
        font-family: 'Outfit', sans-serif;
    }

    .pageBody .body .addProjectContainer form {
        height: 100%;
        width: 100%;
    }

    .addProjectContainer .up {
        height: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .addProjectContainer .top #addProjectName {
        font-family: 'Outfit', sans-serif;
    }

    .addProjectContainer .middle #addProjectDescription {
        font-family: 'Outfit', sans-serif;
    }

    .addProjectContainer .down {
        height: 90%;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .addProjectContainer .down>div {
        height: 100%;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .addProjectContainer .down .left>div {
        width: 90%;
        /* border: 1px solid black; */
    }

    .addProjectContainer .down .left {}

    .addProjectContainer .down .left .top {
        height: 14%;
        display: flex;
        flex-direction: column;
    }



    .addProjectContainer .down .left .top input {
        border: inset 2px lightgrey;
        transition: 1s;

        margin-top: 5px;
        font-size: 18px;
        /* width: 95%; */
    }

    .addProjectContainer .down .left input[type=text]:hover {
        box-shadow: 0 0 0 0.1rem rgb(55 190 255);
        border: inset 2px silver;
    }

    .addProjectContainer .down .left input[type=text]:focus {
        box-shadow: 0 0 0 0.1rem rgb(55 190 255);
        outline-width: 0px;
        border: inset 2px silver;
    }

    .addProjectContainer .down .left .middle {
        height: 57%;
        display: flex;
        flex-direction: column;
    }

    .addProjectContainer .down .left .middle textarea {
        margin-top: 5px;
        resize: none;
        font-size: 18px;

        border: inset 2px lightgrey;
        transition: 1s;
    }

    .addProjectContainer .down .left .middle textarea:hover {
        box-shadow: 0 0 0 0.2rem rgb(55 190 255);
        border: inset 2px silver;
    }

    .addProjectContainer .down .left .middle textarea:focus {
        box-shadow: 0 0 0 0.2rem rgb(55 190 255);
        outline-width: 0px;
        border: inset 2px silver;
    }


    .addProjectContainer .down .left .bottom {
        height: 20%;
        display: flex;
    }

    /* date */
    input[type="date"]::-webkit-datetime-edit,
    input[type="date"]::-webkit-inner-spin-button,
    input[type="date"]::-webkit-clear-button {
        color: #fff;
        position: relative;
    }

    input[type="date"]::-webkit-datetime-edit-year-field {
        position: absolute !important;
        border-left: 1px solid #8c8c8c;
        color: #000;
        left: 56px;
        padding-left: 5px;
    }

    input[type="date"]::-webkit-datetime-edit-month-field {
        position: absolute !important;
        border-left: 1px solid #8c8c8c;
        color: #000;
        left: 30px;
        padding-left: 5px;
    }


    input[type="date"]::-webkit-datetime-edit-day-field {
        position: absolute !important;
        color: #000;
        left: 3px;
        padding-left: 5px;
    }

    input[type="date"] {
        border: 5px solid black;
    }

    /* date */

    .addProjectContainer .down .left .bottom input {
        margin-top: 5px;
        background-image: linear-gradient(90deg, white, rgb(217, 237, 254));
        border: 2px outset gray;
    }

    .addProjectContainer .down .left .bottom .left {
        width: 50%;
    }

    .addProjectContainer .down .left .bottom .left span {}

    .addProjectContainer .down .left .bottom .right {
        height: 100%;
        width: 50%;
    }

    .addProjectContainer .down>.right>div {
        /* background-color: lightblue; */
        width: 100%;
        /* border: 1px solid black; */
    }

    .addProjectContainer .down>.right>div {
        /* background-color: greenyellow; */
        width: 90%;
        /* border: 1px solid black; */
    }

    .addProjectContainer .down>.right>.top {
        /* background-color: red; */
        height: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .addProjectContainer .down>.right>.top>.photoUploadContainer {
        width: 80%;
        height: 100%;
        border: 5px dashed darkgray;
        /* background-color: red; */

        transition: all 1s;
    }

    .addProjectContainer .down>.right>.top>.photoUploadContainer:hover {
        /* border: 5px dashed rgb(0,0,0,0.8); */
        border: 5px dashed #087FFF;
        /* font-size: 25px; */
        box-shadow: rgba(50, 50, 93, 0.1) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.1) 0px 18px 36px -18px inset;
    }

    .addProjectContainer .down>.right>.top>.photoUploadContainer:hover label {
        font-size: 25px;
    }

    .addProjectContainer .down>.right>.top>.photoUploadContainer input {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: aqua;
        /* visibility: hidden; */
        border: none;
        outline: none;
        opacity: 0;
        /* color: transparent; */
        z-index: 11;
    }

    .addProjectContainer .down>.right>.top>.photoUploadContainer .labelContainer {
        box-sizing: border-box;
        position: relative;
        width: 100%;
        height: 100%;
        top: -105%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    }

    .addProjectContainer .down>.right>.top>.photoUploadContainer .labelContainer label {
        opacity: 1;
        transition: 1s;
    }


    .addProjectContainer .down>.right>.middle {
        margin-top: 10px;
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .addProjectContainer .down>.right>.middle .memberSelectHeader {
        /* background-color: yellow; */
        height: 100%;
        width: 100%;
        /* position: relative; */
    }


    .addProjectContainer .down>.right>.middle .memberSelectHeader .selectedMemberContainer {
        border: 3px solid darkgray;
        border-radius: 5px;
        /* margin:5px; */
        margin: 5px auto;
        width: 90%;
        height: 50%;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        position: relative;
        transition: 1s;
    }

    .addProjectContainer .down>.right>.middle .memberSelectHeader .selectedMemberContainer:hover {
        box-shadow: 0px 6px 10px -10px black,
            0px -15px 10px -20px black;
        border: 3px solid rgb(29, 233, 182);
    }


    /* scroll bar */
    .addProjectContainer .down>.right>.middle .memberSelectHeader .selectedMemberContainer::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: #F5F5F5;
        border-radius: 10px;
    }

    .addProjectContainer .down>.right>.middle .memberSelectHeader .selectedMemberContainer::-webkit-scrollbar {
        border-radius: 5px;
        width: 5px;
        background-color: #F5F5F5;
    }

    .addProjectContainer .down>.right>.middle .memberSelectHeader .selectedMemberContainer::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-image: linear-gradient(red, violet);
    }

    /* scroll bar */

    .addProjectContainer .down>.right>.middle .memberSelectHeader .selectedMemberContainer .selectedMember {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .addProjectContainer .down>.right>.middle .memberSelectHeader .selectedMemberContainer .selectedMember>img {
        border-radius: 50%;
        height: 37px;
        width: auto;
        max-width: 60px;
        padding: 0 4px;
    }

    .addProjectContainer .down>.right>.middle .memberSelectHeader>.memberSelectContent {}

    .addProjectContainer .down>.right>.middle .memberSelectHeader .selectedMemberContainer:hover~.memberSelectContent,
    .addProjectContainer .down>.right>.middle .memberSelectHeader .memberSelectContent:hover {
        /* opacity: 1; */
        /* left: 0; */

        border: 3px outset silver;
        max-height: 10000px;
        height: 200px;
    }


    .addProjectContainer .down>.right>.middle .memberSelectHeader>.memberSelectContent {
        /* opacity: 0; */
        max-height: 0px;
        height: 0px;
        box-sizing: border-box;
        overflow: auto;
        overflow-x: hidden;
        border: 0px outset silver;
        background-color: #F5F5F5;
        border-radius: 5px;
        position: relative;
        /* left: -20px; */

        transition: border 500ms, opacity 1s, top 1s cubic-bezier(0, 1.95, 1, .49), height 1s ease-in-out, max-height 1s ease-in-out;
    }

    /* scroll bar */
    .addProjectContainer .down>.right>.middle .memberSelectHeader>.memberSelectContent::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: #F5F5F5;
        border-radius: 10px;
    }

    .addProjectContainer .down>.right>.middle .memberSelectHeader>.memberSelectContent::-webkit-scrollbar {
        border-radius: 5px;
        width: 7px;
        background-color: #F5F5F5;
    }

    .addProjectContainer .down>.right>.middle .memberSelectHeader>.memberSelectContent::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #FFF;
        background-image: linear-gradient(gray, var(--completed2), gray)
    }

    /* scroll bar */

    .addProjectContainer .down>.right>.middle .memberSelectHeader>.memberSelectContent .memberContainer {
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 50px;
        border-bottom: 3px solid silver;
        border-radius: 5px;
        transition: all 1s;
    }

    .addProjectContainer .down>.right>.middle .memberSelectHeader>.memberSelectContent .memberContainer:hover {
        background-image: linear-gradient(270deg, white 60%, lightgreen);
        border-bottom: 3px solid black;
    }

    .addProjectContainer .down>.right>.middle .memberSelectHeader>.memberSelectContent .memberContainer>input {
        margin-left: 10px;
        height: 22px;
        width: 22px;
    }

    .addProjectContainer .down>.right>.middle .memberSelectHeader>.memberSelectContent .memberContainer>img {
        margin-left: 15px;
        margin-right: 15px;
        height: 70%;
        width: auto;
        border-radius: 50%;
    }


    .addProjectContainer .down>.right>.bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 30%;
        box-sizing: border-box;
    }

    .addProjectContainer .down>.right>.bottom .top {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50%;
        /* border: 3px dotted black; */
        width: 100%;
    }

    .addProjectContainer .down>.right>.bottom .top .progressContainer {
        height: 100%;
        /* border: 3px dotted black; */
        width: 50%;
    }

    .addProjectContainer .down>.right>.bottom .top .stateContainer select option {
        font-size: 18px;
    }

    .addProjectContainer .down>.right>.bottom .top .stateContainer {
        height: 100%;
        /* border: 3px dotted black; */
        width: 50%;
    }

    .addProjectContainer .down>.right>.bottom .top .stateContainer {
        height: 100%;
        /* border: 3px dotted black; */
        width: 50%;

    }

    .addProjectContainer .down>.right>.bottom .top .stateContainer select {
        margin: 10px 2px;
        font-size: 20px;
        font-family: 'Outfit', sans-serif;
        /* border: outset 2px silver; */
        background-image: linear-gradient(90deg, white, rgb(217, 237, 254));
        box-sizing: border-box;
    }

    .addProjectContainer .down>.right>.bottom .top .stateContainer select {
        outline: none;
    }


    .addProjectContainer .down>.right>.bottom .down {
        height: 50%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        /* border: 3px dotted black; */
    }


    .addProjectContainer .down>.right>.bottom .down .buttonContainer {
        width: 40%;
        height: 60%;
        /* border: 1px solid black; */
        transition: 1s ease-in-out;
    }

    .addProjectContainer .down>.right>.bottom .down .buttonContainer::after {
        margin-top: 2px;
        content: "";
        width: 50%;
        height: 4px;
        background-color: red;
        transition: 1s;
        background: linear-gradient(130deg, #ff7a18, #af002d 41.07%, #319197 76.05%);
    }

    .addProjectContainer .down>.right>.bottom .down .buttonContainer input {
        height: 100%;
        width: 100%;
        font-size: 20px;
        font-family: 'Outfit', sans-serif;
        border: outset 2px silver;
        background-image: linear-gradient(90deg, white, rgb(217, 237, 254));
        background-color: lightgreen;
        background-repeat: no-repeat;
        box-sizing: border-box;
        transition: all 1s;
        /* position: relative; */
    }


    .addProjectContainer .down>.right>.bottom .down .buttonContainer input:hover {
        background-position: 10px 0;
        font-size: 24px;
    }

    .addProjectContainer .down>.right>.bottom .down .buttonContainer:has(input:hover) {
        width: 50%;
        height: 65%;
    }

    .addProjectContainer .down>.right>.bottom .down .buttonContainer:has(input:hover)::after {
        border-radius: 5px;
        content: "";
        width: 90%;
        height: 5px;
        box-shadow: 10px 10px 10px silver;
    }

    /* addProject */

    /* animation */
    .invalidInput {
        animation-name: invalidInput;
        animation-duration: 400ms;
        animation-direction: alternate;
        animation-timing-function: ease-in-out;
        animation-iteration-count: 2;
    }

    @keyframes invalidInput {
        0% {
            position: relative;
            background-color: white;
            left: 0px;
        }

        25% {
            position: relative;
            left: -10px;
        }

        50% {
            position: relative;
            left: 10px;
        }

        75% {
            position: relative;
            left: -10px;
        }

        100% {
            position: relative;
            left: 10px;
            background-color: rgb(245, 198, 203);
        }
    }

    /* animation */
</style>

<body>
    <div id="main">
        <header>
            <div id="headerLeft" class="headerElement">
                <div id="companyIcon"></div>
                <div id="companyName">Company Name</div>
            </div>
            <div id="headerMiddle" class="headerElement"></div>
            <div id="headerRight" class="headerElement">
                <div onclick="changeLanguage()" id="changeLanguageIcon"></div>
                <div class="dropdownContainer">
                    <div class="dropdownHeader"><img src="../images/main/male.png"> Ahmet Oğuz Ergin </div>
                    <ul class="dropdownContent">
                        <li onclick="displayUserInformationPage()"><img class="liIcon" src="../images/main/updateUser.png"> <span>User Information</span> </li>
                        <li><img class="liIcon" src="../images/main/logOut.png"> <span>Logout</span> </li>
                    </ul>
                </div>
            </div>
        </header>

        <section class="pageBody">
        </section>

    </div>

    <!-- <div class="layoutContainer displayNone">
        <div class="layout">
            asdfasdfasdfasdf
        </div>
    </div> -->

    <div onclick="clickMessage()" id="pageMessage">
        project Uploaded Successfully
    </div>
</body>

</html>