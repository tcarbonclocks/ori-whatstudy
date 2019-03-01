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
        <ul class="list-group" id="chat-container">
            <li class="list-group-item sticky-top sticky-offset chat-header d-flex p-2" id="chat-header">
                <h2 >Room {{ $route.params.id }}: {{ this.$parent.rooms[$route.params.id - 1].name }}</h2>
                <button v-on:click="this.fetchMessages(this.userToken, this.roomNumber, 1)" type="button" class="btn btn-primary ml-auto"><i class="fas fa-sync-alt"></i></button>
            </li>
            <message v-for='message in this.$parent.messages' v-bind:message='message' v-bind:key='message.id'></message>
            <li class="list-group-item fixed-bottom fixed-bottom-600px"><input v-on:keyup.enter="this.getMessageInput" class="form-control" type="text" placeholder="Druk op Enter om te sturen." id="send-input"></li>
        </ul>
    </div>
    `,
    beforeRouteEnter: (to, from, next) => {
        roomNumber = to.params.id;
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
        roomNumber = to.params.id;
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
    <div>
        <p>Deze room kan niet geladen worden. Waarschijnlijk bestaat deze kamer niet.</p>
    </div>
    `
}

const routes = [
    {
        path: "/",
        component: welcomePage,
        name: "welcomePage"
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
var roomNumber;

/**
 * Add actions to page buttons 
 */
function addButtonActions() {
    var loginButton = document.getElementById("btn-login");

    loginButton.addEventListener("click", function () {
        login();
    })
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
    app.rooms = rooms;
    navBar.rooms = rooms;
    console.log(response);

    if (redirect !== undefined) {
        router.push(redirect);
        redirect = undefined;
    } else {
        this.$router.go();
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

function getMessageInput() {
    var messageToSend = document.getElementById("send-input").value;
    console.log("Message to send: " + messageToSend);
    sendMessage(messageToSend, userToken, roomNumber, userToken.id)
}

function sendMessage(message, token, roomID, userID) {
    var sendData = {
        user_id: userID,
        room_id: roomID,
        description: message
    }
    console.log(sendData);
    var myApi = new Api('POST', '/messages/send/' + token.token, sendData);
    myApi.execute(sendMessageSuccess, sendMessageError);
}

function sendMessageSuccess(response) {
    var messageInput = document.getElementById("send-input");

    messageInput.value = "";
    console.log("Message sent: " + response);
    fetchMessages(userToken, roomNumber, 1);
}

function sendMessageError(statusCode, errorMessage) {
    console.log(statusCode);
    console.log(errorMessage);
    $('#send-fail-modal').modal('show')
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