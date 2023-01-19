$(function () {
  // check if page is not loaded and display animation
  if (document.readyState !== "complete") {
    console.log("Page is not loaded yet, displaying animation!");
    $("#main").css("visibility", "hidden");
    $("#loadingPage").css("visibility", "visible");

  } else {
    // display main if it is loaded
    console.log("Page is already loaded!");
    $("#main").css("visibility", "visible");
  }
  // when loaded display main page
  document.onreadystatechange = function () {
    if (document.readyState === "complete") {
      console.log("Page is completely loaded, displaying main!");
      $("#main").css("visibility", "visible");
      $("#loadingPage").css("visibility", "hidden");
      $("#loadingPage").html(``);     
    }
  };

  // login operation
  $("#loginContainer").click(function () {
    let username = $("#username").val();
    let password = $("#password").val();
    let remember = $("#checkbox input").prop("checked");

    // request from php
    let url =
      "http://localhost/AhmetOguzErgin/Web/project_manager/assets/controller/controller.php";
    $.post(
      url,
      {
        opt: "login",
        username: username,
        password: password,
        remember: remember,
      },
      function (data) {
        if (data == false) {
          $("#lockIcon").css("color", "#ff6242");
          $("#lockIcon").effect(
            "bounce",
            {
              times: 5,
              distance: 20,
              color: "red",
            },
            500
          );
        } else {
          // direct to main page
          let url =
            "http://localhost/AhmetOguzErgin/Web/project_manager/assets/view/main.php";
          window.location.replace(url);
        }
      }
    );
  });
  // remember me text check checkbox
  $("#checkbox span").click(function () {
    if ($("#checkbox input").prop("checked") == true)
      $("#checkbox input").prop("checked", false);
    else $("#checkbox input").prop("checked", true);
  });
});
