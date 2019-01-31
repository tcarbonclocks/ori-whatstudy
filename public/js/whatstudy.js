"use strict";

function pageInit() {
    getToken();
}

/**
 * Add actions to page buttons 
 */
function addButtonActions() {
    var test = document.getElementById('test');

    test.addEventListener("click", function () {
        fetchRooms();
    });

}

function showPage(pageId) {
    $(".page").hide();
    $("#" + pageId).show();
}

/*
 * fetch Rooms throught Api
 */
function fetchRooms() {
    var token = "259a7abd9185e783b791029864c2be6be6d17f18a1c094ec";
    var myApi = new Api('GET', 'rooms/check/' + token, null);
    myApi.execute(showRooms, errorRooms);
}
/*
 * show recieved Rooms
 */
function showRooms(response) {
    console.log(response);
}

/*
 * error fetching Rooms
 */
function errorRooms(statusCode, errorMessage) {
    console.log(statusCode);
    console.log(errorMessage);
}

function tokenError(message) {
    // Do something with the message
    console.log("Token error:" + message);

}

function tokenSuccess(token, callback) {
    // Do something with the token

}

// initialize
addButtonActions();
