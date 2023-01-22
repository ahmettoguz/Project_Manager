let url =
  "http://localhost/AhmetOguzErgin/Web/project_manager/assets/controller/controller.php";
const bodyPages = ["Projects", "Tasks", "Members"];
let currentBodyPage = 0;
let projectStates = null;
let projects = null;
let projectMembers = null;
let users = [];
let loadedTables = [];
let tasks = [];
let leftProjectTab = 99; //all
let addProjectSelectedMembers = [];

$(function () {
  constructPageBody();
  getProjects();
  getProjectMembers();
  getUsers();
  getTasks();
  getProjectStates();

  performChangePage();
  performChangePage(0);
});

function changeBodyPage(pageNumber) {
  if (pageNumber == null) console.log("page content removed");
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
  } else {
    let pageName = bodyPages[pageNumber];

    $("section.pageBody .body").html("");

    // change content to projects
    if (pageName == "Projects") {
      let interval = setInterval(() => {
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

function getProjectStates() {
  $.get(url, { opt: "getProjectStates" }, function (data) {
    projectStates = data;
  }).then(function () {
    loadedTables.push("project_state");
  });
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
  removeFromArray(loadedTables, "getTasks");
  $.get(url, { opt: "getTasks" }).then(function (data) {
    let temp = data;

    temp.forEach((element) => {
      if (tasks[element.project_id] == undefined)
        tasks[element.project_id] = [element];
      else tasks[element.project_id].push(element);
    });

    // console.log(tasks);

    loadedTables.push("task");
  });
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
  // console.log(projects);
  projects.forEach((project) => {
    // filter according to states
    // console.log(project.state_id);
    // console.log(tabNumber);
    if (project.state_id == leftProjectTab || leftProjectTab == 99) {
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
      if (tasks[project.id] != undefined) {
        totalTask = tasks[project.id].length;
        for (let i = 0; i < tasks[project.id].length; i++) {
          if (tasks[project.id][i].state == "Completed") completedTotalTask++;
        }
      }

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

  if (pageNumber == "User Informations") {
    output += ` 
     <div class="locationNode">
        <div class="rightArrow"></div>
        <div class="targetLocation">User Informations</div>
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
  let day = today.getDay();
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
                alertt("Project Successfully Uploaded.");

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
          alertt("Project Successfully Uploaded.");

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
  alertt("helloooo");
}

// function displayLayout() {
//   $(".layoutContainer").removeClass("displayNone");
// }

function clickMessage() {
  alert("clicked");
  $("#pageMessage").addClass("disapperMessage");
  setTimeout(() => {
    $("#pageMessage").removeClass("disapperMessage");
  }, 10);
}

function alertt(msg) {
  $("#pageMessage").html(msg);

  $("#pageMessage").addClass("disapperMessage");
  setTimeout(() => {
    $("#pageMessage").removeClass("disapperMessage");
  }, 4000);
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
