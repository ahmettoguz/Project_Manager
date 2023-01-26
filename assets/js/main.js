let url =
  "http://localhost/AhmetOguzErgin/Web/project_manager/assets/controller/controller.php";
const bodyPages = ["Projects", "Tasks", "Members"];
let currentBodyPage = 0;
let projectStates = null;
let projects = null;
let projectMembers = null;
let users = [];
let loadedTables = [];
let tasks = null;
let departments = null;
let taskStates = null;
let company = null;
let leftProjectTab = 99; //all
let addProjectSelectedMembers = [];
let isMessageShow = false;

$(function () {
  getCompany();
  assignCompanyInHeader();

  // constructPageBody();

  // performChangePage();

  prepare_DisplayCompanyInformation();
});

function changeBodyPage(pageNumber) {
  if (pageNumber == null) console.log("page content changed to dashboard");
  else console.log("page content changed to ", bodyPages[pageNumber]);

  changeBodyPageTabColors(pageNumber);
  changeBodyContent(pageNumber);
}

function changeBodyPageTabColors(pageNumber) {
  let tabs = $("section.pageBody .tabTitle .tab");

  // remove class which gives white background
  for (let i = 0; i < tabs.length; i++) {
    $(tabs[i]).removeClass("selectedTab");
  }

  // add class for selected box
  if (pageNumber != null) $(tabs[pageNumber]).addClass("selectedTab");
}

function changeBodyContent(pageNumber) {
  if (pageNumber == null) {
    constructPageBody();
    $("section.pageBody .body").html("");
    displayDashboardContent();
  } else {
    let pageName = bodyPages[pageNumber];

    $("section.pageBody .body").html("");

    // change content to projects
    if (pageName == "Projects") {
      //get required data
      getProjects();
      getProjectMembers();
      getUsers();
      getTasks();
      getProjectStates();

      let interval = setInterval(() => {
        // console.log(loadedTables);
        if (
          loadedTables.includes("project") &&
          loadedTables.includes("project_state") &&
          loadedTables.includes("project_member") &&
          loadedTables.includes("user")
        ) {
          clearInterval(interval);

          // create required parts
          createProjectBase();
          displayProjectStates();
          displayProjectsIn_SectionMain();
        }
      }, 100);
    }
  }
}

function changeFilterProjectColor(tabNumber) {
  let elements = $("section.pageBody .body header .projectState");

  // mark as unselected all
  for (let i = 0; i < elements.length; i++) {
    $(elements).removeClass(`stateId${i} stateSelected`);
  }
  $(elements).removeClass("stateId99 stateSelected");

  // mark selected
  if (tabNumber == 99) {
    $(elements[0]).addClass("stateId99 stateSelected");
  } else {
    $(elements[tabNumber]).addClass(`stateId${tabNumber} stateSelected`);
  }
}

function filterProjects(tabNumber) {
  // change tab number
  leftProjectTab = tabNumber;

  if (tabNumber == 99) console.log("Projects filtered as All");
  else console.log("Projects filtered as", projectStates[tabNumber - 1].state);
  changeFilterProjectColor(tabNumber);

  displayProjectsIn_SectionMain();
  // console.log(projectState);
}

function openAddProjectPage() {
  // console.log(1);
}

function arrangeProgressBarAsRectangle() {
  let height = $(".progressContainer").css("height");
  height = parseFloat(height) - 10;

  $(".progressCircleContainer").css({ width: height, height: height });

  $(".progressNumber").css({
    width: height - 30,
    height: height - 30,
    top: -height + 15,
    left: 15,
  });
  // // let height = $(".progressContainer").css("height");
  // // // height = parseFloat(height) - 10;
  // // $(".progressCircleContainer").css({ width: height, height: height });

  // // let postition = parseFloat(height) - 10;
  // // height = parseFloat(height) - 20;
  // // $(".progressNumber").css({
  // //   width: height,
  // //   height: height,
  // //   top: -postition,
  // //   left: 10,
  // // });

  // console.log(height);
}

function sortByName(a, b) {
  // a.name = a.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  // b.name = b.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function displayProjectInformation(project_id) {
  // get specific project
  $.get(url, { opt: "getSpecificProject", id: project_id }).then(function (
    data
  ) {
    let project_and_user = data;
    // console.log(project_and_user);

    // console.log(project_and_user[0].name);

    changeHeaderLocation(0, project_and_user[0].name, project_and_user[0].id);
  });
}

function displayProjectsIn_SectionMain() {
  // değiştir sil dinamik yap statik
  departmentId = 1;

  // sort projects, if all,  sort by name   else sort by due
  if (leftProjectTab == 99) {
    projects.sort(sortByName);
  } else {
  }

  // get project users as associativer array
  let projectUsers = [];
  for (let i = 0; i < projectMembers.length; i++) {
    if (projectUsers[projectMembers[i].project_id] == undefined)
      projectUsers[projectMembers[i].project_id] = [projectMembers[i].user_id];
    else
      projectUsers[projectMembers[i].project_id].push(
        projectMembers[i].user_id
      );
  }
  // console.log(projectUsers);
  // console.log(users);

  let output = `<ul>`;
  // console.log("*************************");
  // console.log(projects);

  projects.forEach((project) => {
    // filter according to states
    // console.log(project.state_id);
    // console.log(tabNumber);
    // console.log(project);
    if (
      (project.state_id == leftProjectTab || leftProjectTab == 99) &&
      project.department_id == departmentId
    ) {
      // console.log(tabNumber , project.state_id);
      // console.log(projectUsers);
      // console.log(project);
      // console.log(project.id);

      // get due date as meaningful
      let due = getDateDifferenceMeaningfull(project.due);
      // let due = "due 1 day";
      // console.log("ddd", due);

      // count total task and completed task
      let totalTask = 0;
      let completedTotalTask = 0;

      tasks.forEach((task) => {
        if (project.id == task.project_id) {
          totalTask++;

          if (task.state == "Completed") completedTotalTask++;
        }
      });

      let radialProgress = (project.progress * 360) / 100;

      output += `
    
                        <li class="projectBoxContainer">
                            <div class="left">
                                <div class="header">${project.name}</div>
                                <div class="developerContainer">
                                    <span>Developers</span>`;

      if (projectUsers[project.id] != undefined) {
        output += `
      <div class="developerIconContainer">
      `;
        projectUsers[project.id].forEach((id) => {
          output += `
        <div class="developerIcon" style="background-image: url(../images/users/${users[id].photo});"></div>
        `;
        });
        output += `</div>`;
      } else output += `<span>-</span>`;
      output += `</div>
                                <div class="remainTaskContainer">
                                    <div class="taskIcon"></div>`;
      if (totalTask == 0)
        output += `
                                    <span>-</span>`;
      else
        output += `
                                    <span>${completedTotalTask}/${totalTask}</span>`;
      output += `
                                </div>
                            </div>
                            <div class="right">
                                <div class="progressContainer">
                                    <div class="progressCircleContainer">
                                        <div class="progressCircleColor" style="
                                        background-image: `;
      // if (project.progress < 50)
      //   output += ` conic-gradient(rgb(7,200,250) 0deg,  rgb(58,124,213) ${radialProgress}deg`;
      // else
      if (project.progress < 100)
        output += ` conic-gradient(rgb(7,200,250) 0deg, rgb(58,124,213) ${
          radialProgress / 2
        }deg, rgb(7,200,250) ${radialProgress}deg`;
      else if (project.progress == 100)
        // output += ` conic-gradient(lightgreen 0deg, green 180deg, lightgreen ${radialProgress}deg`;
        output += ` conic-gradient(lightgreen 0deg, green 90deg, lightgreen 180deg, green 270deg, lightgreen 360deg`;
      output += `, white 0deg,white 360deg);
                                        "></div>
                                        <div class="progressNumber">${project.progress}%</div>
                                    </div>
                                </div>
                                <div class="dueBox">${due}</div>
                                <div onclick="displayProjectInformation(${project.id}, '${project.name}')" class="detail"></div>
                            </div>
                        </li>
                   
   `;
    }
  });

  // if tab is all we add create project box extra
  // if (leftProjectTab == 99)
  output += `<li onclick="addProject()" class="projectBoxContainer AddProjectBoxContainer">
        <div onclick="openAddProjectPage()" class="addContainer">
            <div class="addIcon"></div>
            <div>Add Project</div>
        </div>
    </li>`;

  output += `</ul>`;

  $("section.pageBody .body section.main").html(output);

  arrangeProgressBarAsRectangle();
}

function getDateDifferenceMeaningfull(difference) {
  let output = "";
  if (difference != null) {
    let day = parseInt(difference.split(":")[0] / 24);

    if (day < 0) {
      output = `due is expired`;
    } else if (day == 0) {
      // output = `due is today`;
      output = `due ${difference.split(":")[0] % 24} hour`;
    } else if (day < 30) {
      output = `due ${day} day ${difference.split(":")[0] % 24} hour`;
    } else {
      let month = parseInt(day / 30);
      day = day % 30;
      output = `due ${month} month`;
      if (day != 0) output += ` ${day} day`;
    }
  } else {
    output = "-";
  }
  return output;
}

function createProjectBase() {
  $("section.pageBody .body").html(`
  <header>
  <div class="left"></div>
  
  </header>
  <section class="main">
  </section>
`);

  // <div class="right">
  //       <div onclick="openAddProjectPage()" class="addContainer">
  //           <div class="addIcon"></div>
  //           <div>Add Project</div>
  //       </div>
  //   </div>
}

function displayProjectStates() {
  $("section.pageBody .body header").html("");
  $("section.pageBody .body header").append(`
      <div class="projectState" onclick="filterProjects(99)">All</div>                                
  `);
  for (let i = 0; i < projectStates.length; i++) {
    $("section.pageBody .body header").append(`
        <div class="projectState" onclick="filterProjects(${i + 1})" >${
      projectStates[i].state
    }</div>
  `);
  }
  // filter to all
  filterProjects(leftProjectTab);
}

function changeHeaderLocation(
  pageNumber = null,
  specificName = null,
  id = null
) {
  let output = `
      <div class="locationNode">
        <div class="targetLocation" id="homeTargetIcon" onclick="performChangePage()"></div>
      </div>
    `;

  if (
    pageNumber == "User Informations" ||
    pageNumber == "Company Informations"
  ) {
    output += ` 
     <div class="locationNode">
        <div class="rightArrow"></div>
        <div class="targetLocation">${pageNumber}</div>
     </div>
    `;
  } else if (pageNumber == "Add Project") {
    output += ` 
      <div class="locationNode">
        <div class="rightArrow"></div>
        <div class="targetLocation" onclick="performChangePage(0)">${bodyPages[0]}</div>
      </div>

     <div class="locationNode">
        <div class="rightArrow"></div>
        <div class="targetLocation">Add Project</div>
     </div>
    `;
  } else {
    // console.log(specificName);

    if (pageNumber == null) {
      output = `
               <div class="locationNode">
                    <div class="targetLocation" id="homeTargetIcon" onclick="performChangePage()"></div>
                </div>
    `;
    } else
      output = `
                <div class="locationNode">
                    <div class="targetLocation" id="homeTargetIcon" onclick="performChangePage()"></div>
                </div>
                 <div class="locationNode">
                    <div class="rightArrow"></div>
                    <div class="targetLocation" onclick="performChangePage(${pageNumber})">${bodyPages[pageNumber]}
                    </div>
                </div>
                `;

    if (specificName != null) {
      output += `
                <div class="locationNode">
                    <div class="rightArrow"></div>
                    <div class="targetLocation" onclick="displayProjectInformation(${id})">${specificName}
                    </div>
                </div>
                `;
    }
  }

  $("#main header #headerMiddle").html(output);
}

function performChangePage(pageNumber = null) {
  changeBodyPage(pageNumber);
  changeHeaderLocation(pageNumber);
}

function constructPageBody() {
  $("section.pageBody").html(`
  <div class="tabTitle">
      <div onclick="performChangePage(0)" class="tab">Projects</div>
      <div onclick="performChangePage(1)" class="tab">Tasks</div>
      <div onclick="performChangePage(2)" class="tab">Members</div>
  </div>

  <div class="body"></div>
  `);
}

function displayUserInformationPage() {
  changeHeaderLocation("User Informations");
  $("section.pageBody").html(`asdds`);
}

function addProject() {
  changeHeaderLocation("Add Project");

  let out = `
      <div class="addProjectContainer">
      <form action="" id="addProjectForm" method="post" enctype="multipart/form-data">
        <div class="up">
            <h3>Add Project</h3>
        </div>
        <div class="down">
            <div class="left">
                <div class="top">
                    <span>Name</span>
                    <input type="text" id="addProjectName" maxlength="50" width="10" required/>
                </div>
                <div class="middle">
                    <span>Description</span>
                    <textarea id="addProjectDescription" cols="30" rows="10" maxlength="500" required></textarea>
                </div>
                <div class="bottom">
                    <div class="left">
                        <span>Start Date</span>
                        <input type="date" id="addProjectStartDate">
                    </div>
                    <div class="right">
                        <span>End Date</span>
                        <input type="date" id="addProjectEndDate">
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="top">
                    <div class="photoUploadContainer">
                      <input accept="image/gif, image/jpeg, image/png" type="file" id="addProjectFileUpload" onchange="addProjectImageUploadStyle(event)">
                        <div class="labelContainer"><label for="addProjectFileUpload">Click / drag file </br> to upload image</label></div>
                    </div>
                </div>
                <div class="middle">  
                     <div class="memberSelectHeader">
                        Members
                        <div class="selectedMemberContainer">`;
  out += `
                      </div>
                      <div class="memberSelectContent">`;

  users.forEach((user, id) => {
    out += `
                            <div onclick="AddProjectSelectMembers(this,${user.id})" class="memberContainer"><input onclick="addProjectCheckBoxOperation(event,${user.id})" type="checkbox"> <img src="../images/users/${user.photo}" alt=""> <div class="memberName">${user.name} ${user.surname}</div></div>
                            `;
  });
  out += `
                      </div>
                  </div>
                </div>
                <div class="bottom">
                  <div class="top">
                      <div class="progressContainer">
                        <span>Progress: <span class="progressCount">0</span>%</span>
                        <input type="range" oninput="changeProgress()">
                      </div>

                      <div class="stateContainer">
                        <select id="selectProjectStateInput">
                          <option value="0" disabled selected>Select state</option>
                        `;
  for (let i = 0; i < projectStates.length; i++) {
    out += `
                          <option value="${projectStates[i].id}">${projectStates[i].state}</option>
            `;
  }
  out += `
                        </select>
                      </div>
                  </div>
                  <div class="down">
                    <div class="buttonContainer">
                      <input onclick="addProjectToDatabase()" type="submit" value="Add Project">
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </form>
      </div>
  `;

  $(".pageBody .body").html(out);
  bindForSubmission();

  // set start date today
  let today = new Date();
  let day = today.getDate();
  if (day < 10) day = "0" + day;
  let month = today.getMonth() + 1;
  if (month < 10) month = "0" + month;
  let year = today.getFullYear();

  $("#addProjectStartDate").val(`${year}-${month}-${day}`);

  // set progress to zero
  $(".progressContainer input[type=range]").val("0");
}

function addProjectToDatabase() {
  // check errors before adding project
  let errors = [];

  let projectName = $(".addProjectContainer .down .left .top input").val();
  projectName = projectName.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
  let description = $(
    ".addProjectContainer .down .left .middle textarea"
  ).val();
  let addProjectStartDate = $("#addProjectStartDate").val();
  let addProjectEndDate = $("#addProjectEndDate").val();
  let progress = $(".progressContainer input[type=range]").val();
  let state = $(
    ".addProjectContainer .down>.right>.bottom .top .stateContainer select"
  ).val();
  let addProjectFileUpload = $("#addProjectFileUpload")[0].files[0];

  let hasPhoto = null;
  if (addProjectFileUpload == undefined) {
    console.log("Project file is not entered.");
    hasPhoto = "false";
  } else hasPhoto = "true";

  console.log("project Added");
  console.log("projectName: ", projectName);
  console.log("description: ", description);
  console.log("addProjectStartDate: ", addProjectStartDate);
  console.log("addProjectEndDate: ", addProjectEndDate);
  console.log("addProjectFileUpload: ", addProjectFileUpload);
  console.log("addProjectSelectedMembers:", addProjectSelectedMembers);
  console.log("progress:", progress);
  console.log("state:", state);
  console.log("members", addProjectSelectedMembers);

  // check inputs for errors
  if (projectName.trim() == "") errors.push("empty name");
  if (description.trim() == "") errors.push("empty description");
  if (state == null) errors.push("empty state");

  //create data
  var ajaxData = new FormData();
  ajaxData.append("opt", "uploadPhotoToDatabase");
  ajaxData.append("addProjectFileUpload", addProjectFileUpload);
  // ajaxData.append("addProjectSelectedMembers",addProjectSelectedMembers );

  // console.log("formdata:", ajaxData);

  // valid input
  if (errors.length == 0) {
    $.ajax({
      url: url,
      type: "POST",
      cache: false,
      data: {
        opt: "addProject_MemberToDatabase",
        projectName: projectName,
        description: description,
        addProjectStartDate: addProjectStartDate,
        addProjectEndDate: addProjectEndDate,
        addProjectSelectedMembers: JSON.stringify(addProjectSelectedMembers),
        progress: progress,
        state: state,
        hasPhoto: hasPhoto,
      },
      success: function (data) {
        if (data != "false" && hasPhoto == "true") {
          ajaxData.append("targetFileName", "projectId_" + data + ".png");
          ajaxData.append("destinationLocationFile", "../images/project/");
          $.ajax({
            url: url,
            type: "POST",
            contentType: false,
            processData: false,
            cache: false,
            dataType: "json",
            enctype: "multipart/form-data",
            data: ajaxData,
            success: function (data) {
              console.log(data);
              if (data == "true") {
                // update and display projects
                getProjects();
                getProjectMembers();
                performChangePage(0);
                alertt("Project Successfully Uploaded.", "green");

                // initialize selected members if operation successfull
                addProjectSelectedMembers = [];
              }
            },
          });
        } else if (hasPhoto == "false") {
          // update and display projects
          getProjects();
          getProjectMembers();
          performChangePage(0);
          alertt("Project Successfully Uploaded.", "green");

          // initialize selected members if operation successfull
          addProjectSelectedMembers = [];
        }
      },
    });
  } else {
    $("#addProjectName").removeClass("invalidInput");
    $("#addProjectDescription").removeClass("invalidInput");
    $("#selectProjectStateInput").removeClass("invalidInput");

    if (errors.includes("empty name")) {
      setTimeout(() => {
        $("#addProjectName").addClass("invalidInput");
        $("#addProjectName").attr(
          "placeholder",
          "Project name cannot leave as blank!"
        );
      }, 10);
    }
    if (errors.includes("empty description")) {
      setTimeout(() => {
        $("#addProjectDescription").addClass("invalidInput");
        $("#addProjectDescription").attr(
          "placeholder",
          "Project description cannot leave as blank!"
        );
      }, 1);
    }
    if (errors.includes("empty state")) {
      $("#selectProjectStateInput").css("background-image", "none");
      setTimeout(() => {
        $("#selectProjectStateInput").addClass("invalidInput");
      }, 1);
    }
    console.log("Add Project Errors: ", errors.join(", "));
  }
}

function AddProjectSelectMembers(element = null, userId = null) {
  let isChecked = null;
  if (element != null) {
    // div is clicked
    let checkBox = $(element).children()[0];
    isChecked = checkBox.checked;

    // change checkbox
    if (isChecked) $(checkBox).prop("checked", false);
    else $(checkBox).prop("checked", true);

    isChecked = checkBox.checked; // false or true according to checkbox checked
  } else {
    isChecked;
    // checkBox is clicked
  }

  AddProjectSelectMemberstoArray(userId);
  displaySelectedMembers();
}

function addProjectCheckBoxOperation(event, userId) {
  event.stopPropagation();
  AddProjectSelectMembers(null, userId);
}

function AddProjectSelectMemberstoArray(userId) {
  if (addProjectSelectedMembers.includes(userId)) {
    // remove element
    let i = addProjectSelectedMembers.indexOf(userId);
    if (i > -1) {
      addProjectSelectedMembers.splice(i, 1);
    }
  } else addProjectSelectedMembers.push(userId);
}

function displaySelectedMembers() {
  let out = "";

  addProjectSelectedMembers.forEach((id) => {
    out += `
    <div class="selectedMember"><img src="../images/users/${users[id].photo}" alt=""></div>
    `;
  });

  $(
    ".addProjectContainer .down>.right>.middle .memberSelectHeader .selectedMemberContainer"
  ).html(out);
}

function changeProgress() {
  let progress = $(".progressContainer input[type=range]").val();
  $(".progressContainer .progressCount").html(progress);
}

function bindForSubmission() {
  $("#addProjectForm").submit(function (event) {
    event.preventDefault();
    // console.log("submit");

    // console.log($("#addProjectForm").serialize());
  });
}

function changeLanguage() {
  alertt("helloooo", "green");
}

// function displayLayout() {
//   $(".layoutContainer").removeClass("displayNone");
// }

function clickMessage() {
  if (isMessageShow) {
    alertBox.removeClass("appearMessage");
    alertBox.addClass("disappearMessage");
    setTimeout(() => {
      isMessageShow = false;
    }, 1000);
  }
}

function alertt(msg, state = null) {
  alertBox = $("#pageMessage");
  let gradient = null;
  switch (state) {
    case "green":
      gradient = "linear-gradient(rgb(103, 250, 148), white)";
      break;

    case "yellow":
      gradient = "linear-gradient(rgb(255, 175, 0),white)";
      break;

    case "red":
      gradient = "linear-gradient(rgb(238, 63, 94), white)";
      break;

    default:
      gradient = "linear-gradient(red, blue)";
      break;
  }
  alertBox.css("background-image", gradient);

  alertBox.html(msg);

  if (isMessageShow == false) {
    alertBox.addClass("appearMessage");
    setTimeout(() => {
      isMessageShow = true;
    }, 1000);
    setTimeout(() => {
      if (isMessageShow) {
        alertBox.removeClass("appearMessage");
        alertBox.addClass("disappearMessage");
        setTimeout(() => {
          isMessageShow = false;
        }, 1000);
      }
    }, 4000);
  }
}

function removeFromArray(ar, element) {
  if (ar.includes(element)) {
    let i = ar.indexOf(element);
    if (i > -1) {
      ar.splice(i, 1);
    }
  }
}

function addProjectImageUploadStyle(event) {
  let fileObject = $(
    ".addProjectContainer .down>.right>.top>.photoUploadContainer input"
  );
  let fileName = fileObject.val();
  fileName = fileName.substring(
    fileName.indexOf(`fakepath`) + 9,
    fileName.length
  );

  let fileExtension = fileName.split(".")[1];

  if (fileExtension == "png" || fileExtension == "jpg") {
    fileObject = URL.createObjectURL(event.target.files[0]);
    $(
      " .addProjectContainer .down>.right>.top>.photoUploadContainer .labelContainer"
    ).css("background-image", `url(${fileObject})`);

    $(" .addProjectContainer .down>.right>.top>.photoUploadContainer").css(
      "border",
      "5px dashed #1DE9B6"
    );
    $(
      ".addProjectContainer .down>.right>.top>.photoUploadContainer .labelContainer label"
    ).html("");
  } else {
    $(
      ".addProjectContainer .down>.right>.top>.photoUploadContainer .labelContainer label"
    ).html("Extension should be </br> png or jpg");
  }
}

function displayDashboardContent() {
  // get and update data
  getProjects();
  getProjectStates();
  getProjectMembers();
  getTasks();
  getTaskStates();

  let interval = setInterval(() => {
    // console.log(loadedTables);
    if (
      loadedTables.includes("project") &&
      loadedTables.includes("project_state") &&
      loadedTables.includes("project_member") &&
      loadedTables.includes("task") &&
      loadedTables.includes("task_state")
    ) {
      clearInterval(interval);
      displayDashboardContentReady();
    }
  }, 10);
}

function displayDashboardContentReady() {
  let userId = 1; //değiştir sil dinak olmalı.
  let departmentId = 1; //değiştir sil dinamik olmalı.

  let userProjectCount = 0;
  let totalProjectCount = 0;

  let userTaskCount = 0;
  let totalTaskCount = 0;

  // count user and total project
  totalProjectCount = projects.length;
  projectMembers.forEach((member) => {
    if (member.user_id == userId) userProjectCount++;
  });
  // console.log(totalProjectCount);
  // console.log(userProjectCount);

  // count user and total task
  userTaskCount = 0;
  totalTaskCount = 0;

  tasks.forEach((task) => {
    if (task.department_id == departmentId) {
      totalTaskCount++;
      if (task.user_id == userId) userTaskCount++;
    }
  });

  output = "";

  output += `
    <div id="dashBoardContainer">
      <div class="header">IT Department</div>

      <div class="content">
        <div class="left">
          <div class="projectPart">
            <div class="header">Total <span class="total">${totalProjectCount}</span> project, you took part in <span class="member">${userProjectCount}</span>.</div>
            <div class="projectContainer">`;

  projectStates.forEach((project_state) => {
    let specificTotalCount = 0;
    let specificUserCount = 0;
    projects.forEach((project) => {
      if (project.state_id == project_state.id) {
        specificTotalCount++;

        projectMembers.forEach((project_member) => {
          if (
            project_member.project_id == project.id &&
            project_member.user_id == userId
          )
            specificUserCount++;
        });
      }
    });
    // console.log(project_state);

    // dont show if there is no project with that state
    if (specificTotalCount != 0)
      output += `
              <div class="project"> <div class="numbers"><span class="total">${specificTotalCount}</span>/<span class="member">${specificUserCount}</span></div><span class="state">${project_state.state}</span></div>`;
  });

  output += `
            </div>
          </div>

          <div class="taskPart">
            <div class="header">Total <span class="total">${totalTaskCount}</span> Tasks, you have been assigned to <span class="member">${userTaskCount}</span>.</div>
            <div class="taskContainer">`;

  // count tasks with states
  taskStates.forEach((taskState) => {
    specificTotalCount = 0;
    specificUserCount = 0;
    // console.log(taskState);

    tasks.forEach((task) => {
      if (task.state_id == taskState.id && task.department_id == departmentId) {
        specificTotalCount++;
        if (task.user_id == userId) specificUserCount++;
      }
    });

    //if there is no task with that do not show
    if (specificTotalCount != 0)
      output += `
                    <div class="task"> <div class="numbers"><span class="total">${specificTotalCount}</span>/<span class="member">${specificUserCount}</span></div><span class="state">${taskState.state}</span></div>`;
  });

  output += `
            </div>
          </div>
        </div>
     
        <div class="right">
          <div class="banner"></div>
        </div>
      </div>
    </div>
  `;

  // output += "";
  // output += "";
  // output += "";
  // output += "";
  $("#main .body").html(output);
}

function getCompany() {
  removeFromArray(loadedTables, "company");

  $.get(url, { opt: "getCompany" }, function (data) {
    company = data;
  }).then(function () {
    loadedTables.push("company");
  });
}

function getProjectStates() {
  removeFromArray(loadedTables, "project_state");

  $.get(url, { opt: "getProjectStates" }, function (data) {
    projectStates = data;
  }).then(function () {
    loadedTables.push("project_state");
  });
}

function getProjects() {
  removeFromArray(loadedTables, "project");

  $.get(url, { opt: "getProjects" }).then(function (data) {
    projects = data;
    // console.log(projects);
    // projects.sort(sortByName);

    loadedTables.push("project");
  });
}

function getProjectMembers() {
  removeFromArray(loadedTables, "project_member");

  $.get(url, { opt: "getProjectMembers" }).then(function (data) {
    projectMembers = data;
    loadedTables.push("project_member");
  });
}

function getUsers() {
  removeFromArray(loadedTables, "getUsers");

  $.get(url, { opt: "getUsers" }).then(function (data) {
    // users = data;
    let temp = data;

    temp.forEach((element) => {
      users[element.id] = element;
    });

    loadedTables.push("user");
  });
}

function getTasks() {
  removeFromArray(loadedTables, "task");

  $.get(url, { opt: "getTasks" }).then(function (data) {
    tasks = data;

    loadedTables.push("task");
  });
}

function getTaskStates() {
  removeFromArray(loadedTables, "task_state");

  $.get(url, { opt: "getTaskStates" }, function (data) {
    taskStates = data;
  }).then(function () {
    loadedTables.push("task_state");
  });
}

function getDepartments() {
  removeFromArray(loadedTables, "department");

  $.get(url, { opt: "getDepartment" }, function (data) {
    departments = data;
  }).then(function () {
    loadedTables.push("department");
  });
}

function displayCompanyInformation() {
  changeHeaderLocation("Company Informations");

  let output = "";

  output += `
    <div id="companyInformationsContainer">
      <div class="top">
        <div class="left">
          <div class="icon" onclick="performChangePage()"></div>
        </div>
        <div class="middle">
          <div class="companyBox">
            <div class="companyName">${company.name}</div>
            <div class="companyIcon" style="background-image : url(../images/company/${company.icon})"></div>
          </div>
        </div>
        <div class="right">
          <div class="icon" onclick="displayCompanyEditPage()"></div>
        </div>
      </div>
      <div class="bottom">

        <div class="infoBox">
          <div class="icon"></div>
          <div class="text">
            <span class="number">0</span>
            <span>Departments</span>
          </div>
        </div>

        <div class="infoBox">
          <div class="icon"></div>
          <div class="text">
            <span class="number">0</span>
            <span>Projects</span>
          </div>
        </div>

        <div class="infoBox">
          <div class="icon"></div>
          <div class="text">
            <span class="number">0</span>
            <span>Tasks</span>
          </div>
        </div>

        <div class="infoBox">
          <div class="icon"></div>
          <div class="text">
            <span class="number">0</span>
            <span>Members</span>
          </div>
        </div>
        
      </div>
    </div>
  `;
  $("#main .pageBody").html(output);

  //when page is loaded bring numbers (animation) V2,
  for (let i = 1; i < 5; i++) {
    $(
      `#companyInformationsContainer .bottom .infoBox:nth-of-type(${i}) .text span:nth-of-type(1)`
    ).html(0);
  }

  setTimeout(() => {
    increaseNumbersInDepartmentPage();
  }, 400);

  // sil
  displayCompanyEditPage();
}

function increaseNumbersInDepartmentPage() {
  let departmentCount = departments.length;
  let projectCount = projects.length;
  let taskCount = tasks.length;
  let memberCount = users.length;

  let currentDepartmentCount = null;
  let currentProjectCount = null;
  let currentTaskCount = null;
  let currentMemberCount = null;

  let intervalTimer = 150;
  if (
    departmentCount > 20 ||
    projectCount > 20 ||
    taskCount > 20 ||
    memberCount > 20
  )
    intervalTimer = 50;
  else if (
    departmentCount > 100 ||
    projectCount > 100 ||
    taskCount > 100 ||
    memberCount > 100
  )
    intervalTimer = 10;

  let interval = setInterval(() => {
    currentDepartmentCount = $(
      "#companyInformationsContainer .bottom .infoBox:nth-of-type(1) .text span:nth-of-type(1)"
    ).html();
    currentProjectCount = $(
      "#companyInformationsContainer .bottom .infoBox:nth-of-type(2) .text span:nth-of-type(1)"
    ).html();
    currentTaskCount = $(
      "#companyInformationsContainer .bottom .infoBox:nth-of-type(3) .text span:nth-of-type(1)"
    ).html();
    currentMemberCount = $(
      "#companyInformationsContainer .bottom .infoBox:nth-of-type(4) .text span:nth-of-type(1)"
    ).html();

    //change
    if (currentDepartmentCount < departmentCount) {
      currentDepartmentCount++;
      $(
        "#companyInformationsContainer .bottom .infoBox:nth-of-type(1) .text span:nth-of-type(1)"
      ).html(currentDepartmentCount);
    }
    if (currentProjectCount < projectCount) {
      currentProjectCount++;
      $(
        "#companyInformationsContainer .bottom .infoBox:nth-of-type(2) .text span:nth-of-type(1)"
      ).html(currentProjectCount);
    }
    if (currentTaskCount < taskCount) {
      currentTaskCount++;
      $(
        "#companyInformationsContainer .bottom .infoBox:nth-of-type(3) .text span:nth-of-type(1)"
      ).html(currentTaskCount);
    }
    if (currentMemberCount < memberCount) {
      currentMemberCount++;
      $(
        "#companyInformationsContainer .bottom .infoBox:nth-of-type(4) .text span:nth-of-type(1)"
      ).html(currentMemberCount);
    }

    if (
      currentDepartmentCount == departmentCount &&
      currentProjectCount == projectCount &&
      currentTaskCount == taskCount &&
      currentMemberCount == memberCount
    ) {
      clearInterval(interval);
    }
  }, intervalTimer);
}

function prepare_DisplayCompanyInformation() {
  getCompany();
  getDepartments();
  getProjects();
  getTasks();
  getUsers();

  let interval = setInterval(() => {
    // console.log(loadedTables);
    if (
      loadedTables.includes("company") &&
      loadedTables.includes("department") &&
      loadedTables.includes("project") &&
      loadedTables.includes("task") &&
      loadedTables.includes("user")
    ) {
      clearInterval(interval);
      displayCompanyInformation();
    }
  }, 100);
}

function displayCompanyEditPage() {
  // remove edit icon
  $("#companyInformationsContainer .top .right .icon").css(
    "background-image",
    "none"
  );

  // prepare content
  let output = "";

  output += `
    <div class="container">

      <div class="top">
        <span class="header">Company Name</span> <input type="text" id="editCompanyName" />
      </div>

      <div class="middle">
        <div class="left">
          <div class="imageContainer">
            <span class="header">Upload</br>Company Icon</span>
            <input type="file" id="editCompanyIcon" />
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="default"onclick="companyInformation_setDefault()"><span class="text">Default</span></div>
        <div class="save"   onclick="companyInformation_save()"><span class="text">Save</span></div>
        <div class="cancel" onclick="prepare_DisplayCompanyInformation()"><span class="text">Cancel</span></div>
      </div>

    </div>
  `;

  $("#companyInformationsContainer .bottom").html(output);
}

function companyInformation_setDefault() {
  alertt("setdefault", "green");
}
function companyInformation_save() {
  alertt("saved", "green");
}

function assignCompanyInHeader() {
  let interval = setInterval(() => {
    if (loadedTables.includes("company")) {
      clearInterval(interval);

      // main body of the function
      $("#companyName").html(company.name);
      $("#companyName").html(company.name);

      $("#companyIcon").css(
        "background-image",
        `url(../images/company/${company.icon})`
      );
      // main body of the function
    }
  }, 10);
}
