"use strict";

Vue.component('dropdown-item', {
    props: ['room'],
    template: `
    <router-link class='dropdown-item' v-bind:to='"/room/" + room.id'>{{ room.name }}</router-link>
    `
    // template: "<a class='dropdown-item'>{{ room.name }}</a>"
})

Vue.component('message', {
    props: ['message'],
    template: `
    <li class="list-group-item"><b>{{ message.user.name }} ({{ message.user_id }}) </b></br> {{ message.description }}</li>
    `
})

const welcomePage = {
    template: `
        <div>
            <p>Welkom bij WhatStudy.</p>
        </div>
        `,
    beforeRouteEnter: (to, from, next) => {
        if (rooms === undefined) {
            router.push("/gatekeeper");
            redirect = "/";
        } else {
            next();
            console.log("Welcome to WhatStudy");
        }
    }
}

const gatekeeperPage = {
    template: `
    <div>
        <h2>U bent nog niet ingelogd.</h2>
        <p>U kunt deze site niet gebruiken zonder (als student of docent van Windesheim Flevoland) ingelogd te zijn.</p>
    </div>
    `
}

const roomPage = {
    template: `
        <div>
            <h2>Room {{ $route.params.id }}: {{ this.$parent.rooms[$route.params.id - 1].name }}</h2>

        <ul class="list-group">
            <message v-for='message in this.$parent.messages' v-bind:message='message' v-bind:key='message.id'></message>
        </ul>
    </div>
    `,
    beforeRouteEnter: (to, from, next) => {
        var roomNumber = to.params.id;
        console.log("Connecting to room " + roomNumber);
        if (rooms === undefined) {
            router.push("/gatekeeper");
            redirect = "/room/" + roomNumber;
        } else if (roomNumber >= (rooms.length + 1) || roomNumber <= 0) {
            router.push("/roomerror");
        } else {
            fetchMessages(userToken, roomNumber, 1);
            next();
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
            fetchMessages(userToken, roomNumber, 1);
            next();
        }
    },
}

const roomErrorPage = {
    template: `
    < div >
    <p>Deze room kan niet geladen worden. Waarschijnlijk bestaat deze kamer niet.</p>
        </div >
    `
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
    data: { 
        messages: false,
        rooms: false,
    },
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
    app.rooms = response;
    navBar.rooms = response;
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