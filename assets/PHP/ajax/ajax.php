<?php
// Need of the ajax is getting required data .
// There will be one page to send data and another which request that data.

// **************************************************************************
// SEND DATA

<?php
header("Content-Type: application/json");

$data = ["name" => "ahmo", "age" => 24];
// $data = getGames();

echo json_encode($data);
// -----------------------------------------------------------

// **************************************************************************
// GET DATA

$("button").click(function() {
    // let url = "sendData.php";
    let url = "http://localhost/AhmetOguzErgin/Web/mySolutions/11/1/dataSend.php";

    // $.get(url, {name: "ahmet", age: 24} function(data) {
    $.get(url, function(data) {
        console.log(data);

        console.log(data[0].name);
        $("#result").html(data[0].name);
    }).then(function() {

    })
});

// or
// -----------------------------------------------------------

$("button").click(function() {
    // let url = "sendData.php";
    let url = "http://localhost/AhmetOguzErgin/Web/mySolutions/11/1/dataSend.php";

    $.ajax({
        type: "GET",
        url: url,
        async: false,
        data: {
            name: "ahmet",
            age: 24
        },
        success: function(data) {
            console.log("Data recieved.");
            console.log("Data : " + data);
            console.log(JSON.stringify(data));
        },

        cache: false,
        beforeSend: function() {
            console.log("loading...");
        },
        error: function(xhr, status, error) {
            console.log("Error in ajax request : " + error);
        }
    });
});

// -----------------------------------------------------------



