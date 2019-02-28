"use strict";

Vue.component('dropdown-item', {
    props: ['room'],
    template: "<router-link class='dropdown-item' v-bind:to='\"/room/\" + room.id'>{{ room.name }}</router-link>"
    // template: "<a class='dropdown-item'>{{ room.name }}</a>"
})

Vue.component('message', {
    props: ['message'],
    template: "<div><p>{{ message.user_id }} : {{ message.description }}</p></div>"
})

const welcomePage = {
    template: "<div>" +
        "<p>Welkom bij WhatStudy.</p>" +
        "</div>",
    beforeRouteEnter: (to, from, next) => {
        console.log("Welcome to WhatStudy");
        if (rooms === undefined) {
            router.push("/gatekeeper");
            redirect = "/";
        } else {
            next();
        }
    }
}

const gatekeeperPage = {
    template: "<div>" +
        "<h2>U bent nog niet ingelogd. I AM THE GATEKEEPER</h2>" +
        "<p>U kunt deze site niet gebruiken zonder (als student of docent van Windesheim Flevoland) ingelogd te zijn.</p>" +
        "</div>"
}

const roomPage = {
    template: "<div>" +
    "<message v-for='message in this.$parent.messages' v-bind:message='message' v-bind:key='message.id'></message>" + 
    "</div>",
    beforeRouteEnter: (to, from, next) => {
        var roomNumber = to.params.id;
        console.log("Connecting to room " + roomNumber);
        if (rooms === undefined) {
            router.push("/gatekeeper");
            redirect = "/room/" + roomNumber;
        } else if (roomNumber >= (rooms.length + 1) || roomNumber <= 0) {
            router.push("/roomerror");
        } else {
            next();
            fetchMessages(userToken, roomNumber, 1);
        }
    },
    beforeRouteUpdate: (to, from, next) => {
        var roomNumber = to.params.id;
        console.log("Connecting to room " + roomNumber);
        if (rooms === undefined) {
            router.push("/gatekeeper");
            redirect = "/room/" + roomNumber;
        } else if (roomNumber >= (rooms.length + 1) || roomNumber <= 0) {
            router.push("/roomerror");
        } else {
            next();
            fetchMessages(userToken, roomNumber, 1);
        }
    },
}

const roomErrorPage = {
    template: "<div>" +
        "<p>Deze room kan niet geladen worden. Waarschijnlijk bestaat deze kamer niet.</p>" +
        "</div>"
}

const routes = [
    {
        path: "/",
        component: welcomePage
    },
    {
        path: "/gatekeeper",
        component: gatekeeperPage
    },
    {
        path: "/room/:id",
        component: roomPage
    },
    {
        path: "/roomerror",
        component: roomErrorPage
    }
]

const router = new VueRouter({
    routes // short for `routes: routes`
})

var app = new Vue({
    data: { messages: false },
    router
}).$mount('#app')


var navBar = new Vue({
    data: { rooms: false },
    router
}).$mount('#navbar')

var userToken;
var rooms;
var redirect;

/**
 * Add actions to page buttons 
 */
function addButtonActions() {
    $(document).ready(function () {
        $("#btn-login").on("click", function () {
            login();
        });
    });
}

function login() {
    getToken();
    $("#btn-login").hide();
    $("#login-loading").show();
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
    navBar.roomsFetched = true;
    navBar.rooms = rooms;
    console.log(response);

    if (redirect !== undefined) {
        router.push(redirect);
        redirect = undefined;
    }

}

/*
 * error fetching Rooms
 */
function errorRooms(statusCode, errorMessage) {
    console.log(statusCode);
    console.log(errorMessage);
}

function fetchMessages(token, roomID, page = 1) {
    var myApi = new Api('GET', 'rooms/checkMessages/' + token.token + '/' + roomID + '?page=' + page, null);
    myApi.execute(showMessages, errorMessages);
}

function showMessages(response) {
    console.log(response);
    app.messages = Array.from(response);
}

/*
 * error fetching Messages
 */
function errorMessages(statusCode, errorMessage) {
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
    $("#login-loading").hide();
    $("#btn-login").hide();
    $("#loggedin-text").html("Ingelogd als " + token.name.first + " " + token.name.last + " (" + token.id + ")");
    fetchRooms(userToken);
}


// initialize
login();
addButtonActions();