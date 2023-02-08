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
let session = null;

$(function () {
  // get session to display main pages
  getSession();
  let interval = setInterval(() => {
    if (loadedTables.includes("session")) {
      clearInterval(interval);

      // main function
      assignCompanyInHeader();
      assignUserInHeader();

      performChangePage();
      setTimeout(() => {
        performChangePage(2);
      }, 100);
    }
  }, 10);

  // YAPILACAKLAR
  // * boss user ekleyebilecek ama diğerleri ekleyemeyecek (boss: user add, delete)

  // * task editleme sayfası eklenicek burada task silinebilecek

  // * task sayfası eklenicek

  // * task ekleme sayfası eklenicek

  // * projelerde tasklara tıklanabilir olmalı

  // * language icon will be removed

  // * main sayfanın yüklenmelerini ayarlayabilirsen, özellikle company background'u

  // YAPILACAKLAR
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
    constructPageBody(pageNumber);
    $("section.pageBody .body").html("");
    displayDashboardContent();
  } else {
    let pageName = bodyPages[pageNumber];

    $("section.pageBody .body").html("");

    // change content to projects
    if (pageName == "Projects") {
      constructPageBody(pageNumber);
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
    } else if (pageName == "Members") {
      constructPageBody(pageNumber);
      //get required data
      getUsers();

      let interval = setInterval(() => {
        // console.log(loadedTables);
        if (loadedTables.includes("user")) {
          clearInterval(interval);

          // create required parts
          displayUsersInMain();
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

function displayProjectsIn_SectionMain() {
  let departmentId = session.department_id;

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

    if (difference.split(":")[0] < 0) {
      output = `due is expired`;
    } else if (day == 0) {
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

function constructPageBody(pageNumber) {
  let beginningContent = $("section.pageBody").html().substring(0, 22); //<div class="tabTitle">

  let output = `<div class="tabTitle">`;
  if (beginningContent != '<div class="tabTitle">') {
    for (let i = 0; i < bodyPages.length; i++) {
      let selected = "";
      if (pageNumber == i) selected = "selectedTab";

      output += `
                      <div onclick="performChangePage(${i})" class="tab ${selected}">${bodyPages[i]}</div>`;
    }
    output += `
                  </div>
                  <div class="body"></div>`;

    $("section.pageBody").html(output);
  }
}

function addProject() {
  changeHeaderLocation("Add Project");
  addProjectSelectedMembers = [];

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

  // console.log("project Added");
  // console.log("projectName: ", projectName);
  // console.log("description: ", description);
  // console.log("addProjectStartDate: ", addProjectStartDate);
  // console.log("addProjectEndDate: ", addProjectEndDate);
  // console.log("addProjectFileUpload: ", addProjectFileUpload);
  // console.log("addProjectSelectedMembers:", addProjectSelectedMembers);
  // console.log("progress:", progress);
  // console.log("state:", state);
  // console.log("members", addProjectSelectedMembers);

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
  let userId = session.id;
  let departmentName = session.department;
  let departmentId = session.department_id;

  let userProjectCount = 0;
  let totalProjectCount = 0;

  let userTaskCount = 0;
  let totalTaskCount = 0;

  // count user and total project
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].department_id == departmentId) {
      totalProjectCount++;
    }
  }

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

  let output = "";

  output += `
    <div id="dashBoardContainer">
      <div class="header">${departmentName} Department</div>

      <div class="content">
        <div class="left">
          <div class="projectPart">
            <div class="header">Total <span class="total">${totalProjectCount}</span> project, you took part in <span class="member">${userProjectCount}</span>.</div>
            <div class="projectContainer">`;

  projectStates.forEach((project_state) => {
    let specificTotalCount = 0;
    let specificUserCount = 0;
    projects.forEach((project) => {
      if (
        project.department_id == departmentId &&
        project.state_id == project_state.id
      ) {
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

function getSession() {
  removeFromArray(loadedTables, "session");

  $.get(url, { opt: "getSession" }).then(function (data) {
    session = data;
    loadedTables.push("session");
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
  removeFromArray(loadedTables, "user");

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
        <div class="right">`;
  if (session.user_type == "owner")
    output += `
          <div class="icon" onclick="displayCompanyEditPage()"></div>`;
  output += `
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
        <span class="header">Company name</span> <input type="text" id="editCompanyName" maxlength="75" />
      </div>

      <div class="middle">
        <span class="header">Company icon</span>
        <div class="imageContainer">
          <span class="header">Upload</br>Company Icon</span>
          <input type="file" id="editCompanyIcon" onchange="editCompanyFileUpload(event)"/>
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

function assignCompanyInHeader() {
  getCompany();
  let interval = setInterval(() => {
    if (loadedTables.includes("company")) {
      clearInterval(interval);

      // main body of the function
      $("#companyName").html(company.name);

      $("#companyIcon").css("background-image", `none`);

      $("#companyIcon").css(
        "background-image",
        `url(../images/company/${company.icon})`
      );
      // main body of the function
    }
  }, 10);
}

function companyInformation_setDefault() {
  $("#editCompanyName").val("Computer Technologies Company");

  $(
    "#companyInformationsContainer .bottom .container .middle .imageContainer"
  ).css({
    "background-image": "url(../images/company/default_icon.png)",
    border: "5px dashed rgb(71,121,171)",
  });

  $(
    "#companyInformationsContainer .bottom .container .middle .imageContainer span"
  ).html("");
}

function companyInformation_save() {
  let error = [];

  let companyName = $("#editCompanyName").val().trim(" ");

  // check errors
  if (companyName == "") error.push("empty name");
  if (
    $(
      "#companyInformationsContainer .bottom .container .middle .imageContainer"
    ).css("background-image") == "none"
  )
    error.push("empty image");

  // if has error
  if (error.length != 0) {
    if (error.includes("empty image")) {
      alertt("No company image!", "red");

      $(
        "#companyInformationsContainer .bottom .container .middle .imageContainer"
      ).removeClass("invalidInput");
      setTimeout(() => {
        $(
          "#companyInformationsContainer .bottom .container .middle .imageContainer"
        ).addClass("invalidInput");
      }, 1);
    }

    if (error.includes("empty name")) {
      alertt("Enter company name!", "red");

      $("#editCompanyName").removeClass("invalidInput");
      setTimeout(() => {
        $("#editCompanyName").addClass("invalidInput");
      }, 1);
    }
  } else {
    let file = $("#editCompanyIcon")[0].files[0];
    var ajaxData = new FormData();
    ajaxData.append("opt", "updateCompanyInformation");
    ajaxData.append("companyName", companyName);
    ajaxData.append("companyIcon", file);

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
          // update display
          $(
            "#companyInformationsContainer .top .middle .companyBox .companyName"
          ).html(companyName);
          $(
            "#companyInformationsContainer .top .middle .companyBox .companyIcon"
          ).css("background-image", "none");
          $("#companyName").html(companyName);

          // return dashboard
          assignCompanyInHeader();
          prepare_DisplayCompanyInformation();
          alertt("Company informations successfully updated.", "green");
        } else if (data == "false") {
          alertt("Company informations NOT updated!", "red");
        }
      },
    });
  }
}

function editCompanyFileUpload(event) {
  let fileObject = $(
    "#companyInformationsContainer .bottom .container .middle .imageContainer input"
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
      "#companyInformationsContainer .bottom .container .middle .imageContainer"
    ).css("background-image", `url(${fileObject})`);

    $(
      "#companyInformationsContainer .bottom .container .middle .imageContainer"
    ).css("border", "5px dashed rgb(71,121,171)");
    $(
      "#companyInformationsContainer .bottom .container .middle .imageContainer span"
    ).html("");
  } else {
    $(
      "#companyInformationsContainer .bottom .container .middle .imageContainer span"
    ).html("Extension should be </br> png or jpg.");
    $(
      "#companyInformationsContainer .bottom .container .middle .imageContainer"
    ).css("background-image", `none`);
  }
}

function displayProjectInformation(project_id) {
  let departmentId = session.department_id;

  // get specific project
  $.get(url, { opt: "getSpecificProject", id: project_id }).then(function (
    data
  ) {
    let project = data[0];
    let members = data[1];

    // calculate tasks
    let totalTask = 0;
    let completedTask = 0;

    for (let i = 0; i < tasks.length; i++) {
      if (
        tasks[i].department_id == departmentId &&
        tasks[i].project_id == project.id
      ) {
        totalTask++;
        if (tasks[i].state == "Completed") {
          completedTask++;
        }
      }
    }
    // console.log("tot", totalTask);
    // console.log("complete", completedTask);

    let output = "";

    output += `
    <section id="projectDetails">
      <div class="left">
        <div class="projectPhotoContainer">
          <div class="projectPhoto" style="background-image:url(../images/project/${project.photo})"></div>
        </div>

        <div class="memberContainer">
          <div class="header">Members</div>
          <div class="iconContainer">`;

    // add members
    let totalMember = 0;
    for (let i = 0; i < members.length; i++) {
      if (
        members[i].department_id == departmentId &&
        members[i].project_id == project.id
      ) {
        output += `
                  <div class="icon" style="background-image:url(../images/users/${
                    users[members[i].user_id].photo
                  })"></div>`;
        totalMember++;
      }
    }

    if (totalMember == 0)
      output += `
                   <div class="noMember">No Member</div>`;

    output += `
          </div>
        </div>

        <div class="stateContainer">
          <div class="header">State</div>
          <div class="state">
            <div class="icon" style="background-image:url(../images/main/project/${project.state_id}.png)"></div>
            <div class="value">${project.state}</div>
          </div>
        </div>

        <div class="progressContainer">
          <div class="header">Progress</div>
          <div class="progressBarContainer">
          <div class="value">${project.progress}%</div>
            <div class="bar">
              <div class="progress" style="width:${project.progress}%"></div>
            </div>
          </div>
        </div>

        <div class="taskContainer">
          <div class="header">Tasks</div>
          <div class="container">
            <div class="icon"></div>
            <div class="value">`;
    if (totalTask != 0)
      output += `
              ${completedTask} completed, ${totalTask} total.
              `;
    else
      output += `
              No task.
              `;
    output += `
            </div>
          </div>
        </div>

      </div>

      <div class="middle">
        <div class="projectNameContainer">${project.name}</div>

        <div class="descriptionContainer">
          <div class="header">Description</div>
          <div class="description">${project.description}</div>
        </div>

        <div class="datesContainer">
          <div class="dateContainer">
            <div class="header">Due</div>`;
    let startDate = new Date(project.start_date);
    let endDate = new Date(project.end_date);
    let due = getDateDifferenceMeaningfull(project.due);

    if (project.end_date != null)
      endDate =
        endDate.getDate() +
        "/" +
        endDate.getMonth() +
        1 +
        "/" +
        endDate.getFullYear();
    else endDate = "-";

    if (due != "-") due = due.substring(4);

    startDate =
      startDate.getDate() +
      "/" +
      startDate.getMonth() +
      1 +
      "/" +
      startDate.getFullYear();

    output += `
            <div class="date">${due}</div>
          </div>
          <div class="dateContainer">
            <div class="header">Start Date</div>
            <div class="date">${startDate}</div>
          </div>
          <div class="dateContainer">
            <div class="header">End Date</div>
            <div class="date">${endDate}</div>
          </div>
        </div>
        
        <div class="buttonContainer">
        <div class="button" onclick="displayUpdateProject(${project.id})">Update Project</div>
        <div class="button delete" onclick="displayDeleteProject(${project.id}, '${project.name}')">Delete Project</div>
        </div>

      </div>
      </section>
      `;

    $("section.pageBody").html(output);

    changeHeaderLocation(0, data[0].name, data[0].id);
  });
}

function closeModal() {
  console.log("Modal closed!");
  $("#modalContainer").css("opacity", "0");
  setTimeout(() => {
    $("#modalContainer").css("display", "none");
  }, 500);
}

function clickOnModal(event) {
  event.stopPropagation();
}

function prepareDisplayUserInformationPage() {
  getDepartments();
  getUsers();

  let interval = setInterval(() => {
    // console.log(loadedTables);
    if (
      loadedTables.includes("project") &&
      loadedTables.includes("project_state") &&
      loadedTables.includes("project_member") &&
      loadedTables.includes("user") &&
      loadedTables.includes("task") &&
      loadedTables.includes("department")
    ) {
      clearInterval(interval);

      // create required parts
      displayUserInformationPage();
    }
  }, 100);
}

function displayUserInformationPage() {
  let userId = session.id;
  let departmentId = session.department_id;

  console.log("page content changed to User Informations");

  // count project and task count of the user
  let userProjectCount = 0;
  let userTaskCount = 0;

  for (let i = 0; i < projectMembers.length; i++) {
    if (
      projectMembers[i].department_id == departmentId &&
      projectMembers[i].user_id == userId
    )
      userProjectCount++;
  }

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].department_id == departmentId && tasks[i].user_id == userId)
      userTaskCount++;
  }
  // console.log(userProjectCount);
  // console.log(userTaskCount);

  let desc = `${users[userId].name} works as an ${users[userId].type} in ${users[userId].department} Department.</br> Area of expertise is ${users[userId].expertise}.</br>
  `;

  // project and task counts
  if (userProjectCount != 0) {
    desc += `Participated in total ${userProjectCount} projects`;

    if (userTaskCount != 0) desc += ` and ${userTaskCount} tasks.`;
    else desc += `.`;
  } else {
    if (userTaskCount != 0) desc += `Participated in ${userTaskCount} tasks.`;
  }

  if (session.user_type == "owner")
    desc = `${users[userId].name} is the owner of "${company.name}".`;

  // projects
  let projectOutput = "";

  for (let i = 0; i < projectMembers.length; i++) {
    if (
      projectMembers[i].department_id == departmentId &&
      projectMembers[i].user_id == userId
    ) {
      for (let j = 0; j < projects.length; j++) {
        if (projectMembers[i].project_id == projects[j].id) {
          projectOutput += `
                                <div class="projectContainer">

                                  <div class="top">
                                    <div class="header">${projects[j].name}</div>
                                    <div class="info" onclick="displayProjectInformation(${projects[j].id}, '${projects[j].name}')" ></div>
                                  </div>

                                  <div class="bottom">
                                    <div class="number">${projects[j].progress}%</div>
                                    <div class="progressBarContainer">
                                      <div class="bar">
                                        <div class="progress" style="width:${projects[j].progress}%"></div>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                            `;
        }
      }
    }
  }

  changeHeaderLocation("User Informations");
  $("section.pageBody").html(`
   <div id="userInfoPage">
      <div class="user">
        <div class="left">
          <div class="photoContainer" style="background-image: url(../images/users/${users[userId].photo})"></div>
        </div>
        <div class="right">
          <div class="top">
            <div class="name">${users[userId].name} ${users[userId].surname}</div>
            <div class="edit" onclick="openUserEditPage()"></div>
          </div>
          <div class="bottom">
            <div class="description">${desc}</br></div>
          </div>
        </div>
      </div>

      <div class="project">
        <div class="header">Projects</div>
        <div class="projects">
          ${projectOutput}
        </div>
      </div>
      
    </div>
  `);
}

function openUserEditPage() {
  $("section.pageBody").html("");
}

function logOut() {
  $.get(url, { opt: "logOut" }).then(function () {
    window.location.replace(
      "http://localhost/AhmetOguzErgin/Web/project_manager/"
    );
  });
}

function assignUserInHeader() {
  // $("#headerRight > .dropdownContainer > .dropdownHeader > img").attr(
  //   "src",
  //   `../images/users/${session.photo}`
  // );
  $("#headerRight > .dropdownContainer > .dropdownHeader").html(
    `<img src="../images/users/${session.photo}"> ${session.name} ${session.surname}`
  );
}

function displayUpdateProject(project_id) {
  // cannot pass project itself so that I pass project id
  // console.log(id);
  addProjectSelectedMembers = [];

  // get projectInformation first
  $.get(url, { opt: "getSpecificProject", id: project_id }).then(function (
    data
  ) {
    let project = data[0];
    let members = data[1];

    let out = `
    <div class="body">
      <div class="addProjectContainer">
      <form action="" id="addProjectForm" method="post" enctype="multipart/form-data">
        <div class="up">
            <h3>Update ${project.name}</h3>
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

    addProjectSelectedMembers = [];
    for (let i = 0; i < members.length; i++) {
      addProjectSelectedMembers.push(parseFloat(members[i].user_id));
    }

    users.forEach((user, id) => {
      let checked = "";
      if (addProjectSelectedMembers.includes(id)) checked = "checked";

      out += `
                            <div onclick="AddProjectSelectMembers(this,${user.id})" class="memberContainer"><input onclick="addProjectCheckBoxOperation(event,${user.id})" type="checkbox" ${checked}> <img src="../images/users/${user.photo}" alt=""> <div class="memberName">${user.name} ${user.surname}</div></div>
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
                      <input onclick="updateProjectInDatabase(${project.id})" type="submit" value="Update">
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </form>
      </div>
    </div>
  `;

    $(".pageBody").html(out);
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

    // ************************************************************

    // set inputs as current information.

    // project name
    $("#addProjectName").val(project.name);
    // project description
    $("#addProjectDescription").val(project.description);
    //start date
    let sDate = new Date(project.start_date);
    sDate = new Date(
      sDate.getFullYear() + "-" + (sDate.getMonth() + 1) + "-" + sDate.getDate()
    );

    sDate = sDate.toLocaleString("tr");
    sDate = sDate.split(" ")[0];
    sDate = sDate.split(".");
    sDate = sDate[2] + "-" + sDate[1] + "-" + sDate[0];

    $("#addProjectStartDate").val(sDate);

    // end date
    if (project.end_date != null) {
      let eDate = new Date(project.end_date);
      eDate = new Date(
        eDate.getFullYear() +
          "-" +
          (eDate.getMonth() + 1) +
          "-" +
          eDate.getDate()
      );

      eDate = eDate.toLocaleString("tr");
      eDate = eDate.split(" ")[0];
      eDate = eDate.split(".");
      eDate = eDate[2] + "-" + eDate[1] + "-" + eDate[0];
      $("#addProjectEndDate").val(eDate);
    }

    //photo
    // {
    $(
      " .addProjectContainer .down>.right>.top>.photoUploadContainer .labelContainer"
    ).css("background-image", `url(../images/project/${project.photo})`);

    $(" .addProjectContainer .down>.right>.top>.photoUploadContainer").css(
      "border",
      "5px dashed #1DE9B6"
    );
    $(
      ".addProjectContainer .down>.right>.top>.photoUploadContainer .labelContainer label"
    ).html("");
    // }

    //members
    displaySelectedMembers();

    //progress
    $(".pageBody .body .addProjectContainer .progressCount").html(
      project.progress
    );
    $(`input[type="range"]`).val(project.progress);

    //select
    $("#selectProjectStateInput").val(project.state_id);
  });
}

function updateProjectInDatabase(pro_id) {
  // update project

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

  // update te kaldım.
  let addProjectFileUpload = $("#addProjectFileUpload")[0].files[0];
  let hasPhoto = null;
  if (addProjectFileUpload == undefined) {
    console.log("Project file is not entered.");
    hasPhoto = "false";
  } else hasPhoto = "true";

  // console.log("project Update Informations");
  // console.log("projectName: ", projectName);
  // console.log("description: ", description);
  // console.log("addProjectStartDate: ", addProjectStartDate);
  // console.log("addProjectEndDate: ", addProjectEndDate);
  // console.log("addProjectFileUpload: ", addProjectFileUpload);
  // console.log("addProjectSelectedMembers:", addProjectSelectedMembers);
  // console.log("progress:", progress);
  // console.log("state:", state);
  // console.log("members", addProjectSelectedMembers);

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
        opt: "updateProject",
        projectId: pro_id,
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
          ajaxData.append("targetFileName", "projectId_" + pro_id + ".png");
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
              // console.log(data);
              if (data == "true") {
                // update and display projects
                getProjects();
                getProjectMembers();
                performChangePage(0);
                alertt("Project Successfully Updated.", "green");
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
          alertt("Project Successfully Updated.", "green");
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

    console.log("Update Project Errors: ", errors.join(", "));
  }
}

function displayDeleteProject(id, name) {
  // cannot pass project itself so that I pass project id
  // console.log(id);

  openModal(
    "! Warning !",
    `Project "${name}" will be deleted!`,
    "deleteProject",
    id
  );
}

function openModal(header, content, operation, specificData = null) {
  // change header and content
  $("#modalContainer .modal .header .text").html(header);
  $("#modalContainer .modal .content").html(content);
  $("#modalContainer .modal .buttonContainer .accept").addClass(operation);
  $("#modalContainer .modal .buttonContainer .accept").addClass(
    `id-` + specificData
  );

  $("#modalContainer").css("display", "flex");
  setTimeout(() => {
    $("#modalContainer").css("opacity", "1");
  }, 1);
}

function acceptModalOperation(element) {
  element = $(element);
  let classes = element.attr("class").split(/\s+/);
  // console.log(classes);

  if (classes.includes("deleteProject")) {
    element.removeClass("deleteProject");

    // get id
    let index = getIdClassFromModal(classes);
    let idClass = classes[index];
    let id = classes[index].split("-")[1];

    deleteProjectFromDatabase(id);

    element.removeClass(idClass);
    element.removeClass("deleteProject");
  }

  // to see when if is deleted
  // classes = element.attr("class").split(/\s+/);
  // console.log(classes);

  // close modal
  closeModal();
}

function getIdClassFromModal(classes) {
  // console.log(classes);

  for (let i = 0; i < classes.length; i++) {
    if (classes[i].indexOf("id") == 0) {
      return i;
    }
  }
  return false;
}

function deleteProjectFromDatabase(id) {
  $.get(url, { opt: "deleteProject", id: id }).then(function (data) {
    if (data == true) {
      //turn back to projects page by updating
      alertt("Project deleted.", "yellow");
      performChangePage(0);
    } else {
      alertt("Project cannot deleted.", "red");
    }
  });
}

function displayUsersInMain() {
  alertt(1, "green");
  let output = `
  <div id="membersInMain">
      <header>10 Member of the IT Department.</header>
      <div class="membersContainer">`;

  for (const key in users) {
    console.log(users[key]);
    output += `
          <div class="memberContainer">
            <div class="top">
              <img src="../images/users/${users[key].photo}" />
            </div>
            <div class="bottom">
              <div class="name">${users[key].name} ${users[key].surname}</div>
              <div class="expertise">${users[key].expertise}</div>
              <div class="title">${users[key].type}</div>
            </div>
          </div>`;
  }

  output += `
      </div>
  </div>
  `;

  $("#main .pageBody .body").html(output);
}
