"use strict";

var userToken;
var rooms;

/**
 * Add actions to page buttons 
 */
function addButtonActions() {
    $(document).ready(function () { 
        $("#btn-login").on("click", function () {
            getToken();
            $("#btn-login").hide();
            $("#login-loading").show();
        });
    });
}

function showPage(pageId) {
    $(".page").hide();
    $("#" + pageId).show();
}

/*
 * fetch Rooms throught Api
 */
function fetchRooms(token) {
    var myApi = new Api('GET', 'rooms/check/' + token.token, null);
    myApi.execute(showRooms, errorRooms);
}
/*
 * show recieved Rooms
 */
function showRooms(response) {
    rooms = response;
    navbarDropdownMenu.rooms = response;
    navbarDropdown.fetched = true;
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

    $('#login-fail-modal').modal('show');

    $("#login-loading").hide();    
    $("#btn-login").show();
}

function tokenSuccess(token) {
    // Do something with the token
    userToken = token;
    showPage("page-welcome");
    $("#login-loading").hide();    
    $("#btn-login").hide();
    $("#loggedin-text").html("Ingelogd als " + token.name.first + " " + token.name.last + " (" + token.id + ")");
    fetchRooms(userToken);
}

Vue.component('dropdown-item', {
    props: ['room'],
    template: "<a class='dropdown-item' href='#'>{{ room.name }}</a>"
})

var navbarDropdownMenu = new Vue({
    el: "#navbarDropdownMenu",
    data: {rooms: []}
})

var navbarDropdown = new Vue({
    el: "#navbarDropdown",
    data: {
        fetched: false
    }
})

// initialize
addButtonActions();
showPage("page-gatekeeper");