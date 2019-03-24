/**

 _    _ _           _   _____ _             _                   
| |  | | |         | | /  ___| |           | |                  
| |  | | |__   __ _| |_\ `--.| |_ _   _  __| |_   _             
| |/\| | '_ \ / _` | __|`--. \ __| | | |/ _` | | | |            
\  /\  / | | | (_| | |_/\__/ / |_| |_| | (_| | |_| |            
 \/  \/|_| |_|\__,_|\__\____/ \__|\__,_|\__,_|\__, |            
                                               __/ |            
                                              |___/             
 _                 _                      _            _        
| |               | |                    | |          | |       
| |_ ___ __ _ _ __| |__   ___  _ __   ___| | ___   ___| | _____ 
| __/ __/ _` | '__| '_ \ / _ \| '_ \ / __| |/ _ \ / __| |/ / __|
| || (_| (_| | |  | |_) | (_) | | | | (__| | (_) | (__|   <\__ \
 \__\___\__,_|_|  |_.__/ \___/|_| |_|\___|_|\___/ \___|_|\_\___/
                                                                


 */
/*jshint esversion: 6 */
"use strict";

/**
 * This is the template for the welcome page, which is the page a logged in user will see if they're not on any room
 */
const welcomePage = {
    template: `
        <div>
            <p>Welkom bij WhatStudy - door Avinash Badloe.</p>
        </div>
        `,
    // This function checks if the user is logged in and if not, sends the user to the gatekeeper page.
    beforeRouteEnter: (to, from, next) => {
        if (rooms === undefined) {
            router.push("/gatekeeper");
            redirect = "/";
        } else {
            next();
            console.log("Welcome to WhatStudy");
        }
    }
};


/**
 * This is the template for the gatekeeper page. 
 * It's made to warn people that they can't access this page without logging in.
 */
const gatekeeperPage = {
    template: `
    <div>
        <h2>U bent nog niet ingelogd.</h2>
        <p>U kunt deze site niet gebruiken zonder (als student of docent van Windesheim Flevoland) ingelogd te zijn.</p>
    </div>
    `
};

/**
 * This is the template for the room page.
 * This page is used for displaying chat messages and letting the user chat.
 */
const roomPage = {
    template: `
        <div>
        <ul class="list-group" id="chat-container">
            <li class="list-group-item sticky-top sticky-offset chat-header d-flex p-2" id="chat-header">
                <h2 >Room {{ $route.params.id }}: {{ this.$parent.rooms[$route.params.id - 1].name }}</h2>
                <button v-on:click="this.fetchMessages(this.userToken, this.roomNumber, 1)" type="button" class="btn btn-primary ml-auto" id="refresh-button"><i class="fas fa-sync-alt"></i></button>
            </li>
            <message v-for='message in this.$parent.messages' v-bind:message='message' v-bind:key='message.id'></message>
            <li class="list-group-item fixed-bottom fixed-bottom-600px"><textarea @keydown.enter.exact.prevent @keyup.enter.exact="this.getMessageInput" @keydown.enter.shift.exact="newline" rows="2" class="form-control" type="text" placeholder="Druk op Enter om te sturen." id="send-input"></textarea></li>
        </ul>
    </div>
    `,
    // Before changing rooms and entering the page, a function is ran to check if the user is logged in, locating to a correct page and refreshes the messages.
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
    methods: {
        newline() {
          this.value = `${this.value}\n`;
        },
      },
};

// This page appears when an incorrect room number is entered.
const roomErrorPage = {
    template: `
    <div>
        <p>Deze room kan niet geladen worden. Waarschijnlijk bestaat deze kamer niet.</p>
    </div>
    `
};

const statisticsPage = {
    template: `
    <div>
        <canvas id="messages-chart"></canvas>
    </div>
    `,
    beforeRouteEnter: (to, from, next) => {
        console.log("Loading statistics...");
        getStatistics(userToken);

        if (rooms === undefined) {
            router.push("/gatekeeper");
            redirect = "/statistics";
        } else {
            getStatistics(userToken);
            next();
        }
        next();
    }
}


/**
 * Routes for Vue-Router
 */
const routes = [
    {
        path: "/",
        component: welcomePage,
        name: "welcomePage"
    },
    {
        path: "/gatekeeper",
        component: gatekeeperPage,
        name: "gatekeeperPage"
    },
    {
        path: "/room/:id",
        component: roomPage,
        name: "roomPage"
    },
    {
        path: "/roomerror",
        component: roomErrorPage,
        name: "roomErrorPage"
    },
    {
        path: "/statistics",
        component: statisticsPage,
        name: "statisticsPage"
    }
];

/**
 * Initializing vue-router with routes
 */
const router = new VueRouter({
    routes // short for `routes: routes`
});

/**
 * Template for the Bootstrap dropdown for the room list.
 */
Vue.component('dropdown-item', {
    props: ['room'],
    template: `
    <router-link class='dropdown-item' v-bind:to='"/room/" + room.id'>{{ room.name }}</router-link>
    `
    // template: "<a class='dropdown-item'>{{ room.name }}</a>"
});

/**
 * Template for a message on the room page.
 */
Vue.component('message', {
    props: ['message'],
    template: `
    <li class="list-group-item message"><b>{{ message.user.name }} ({{ message.user_id }}, {{ message.user.usertype.name }}), {{ convertTime(message.created_at) }} </b></br>{{ message.description }}</li>
    `,
    methods: {
        /**
         * Converts SQL time (which is UTC) to JS time and returns the local time
         * @param {string} time SQL datetime
         */
        convertTime(time) {
            let dateTimeParts = time.split(/[- :]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
            dateTimeParts[1]--; // monthIndex begins with 0 for January and ends with 11 for December so we need to decrement by one

            var date = new Date(Date.UTC(...dateTimeParts)); // our Date object
            return date.toLocaleString('nl-nl', { timeZone: 'Europe/Amsterdam' });
        }
    }
});

/**
 * Core initialisation for Vue.js. It's linked to the entire page.
 */
var app = new Vue({
    data: {
        messages: false,
        rooms: false,
    },
    router
}).$mount('#app');

// Global variables. Not sure whether to turn them into Vue data or not.
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
    });
}


/**
 * Wrapper around the getToken function.
 * Uses jQuery, but can probably use Vue
 */
function login() {
    getToken();
    $("#btn-login").hide();
    $("#login-loading").show();
}

/**
 * Function that calls the API to get a list of rooms.
 * @param {string} token the user token, which is needed for authentication for the API.
 */
function fetchRooms(token) {
    var myApi = new Api('GET', 'rooms/check/' + token.token, null);
    myApi.execute(showRooms, errorRooms);
}

/**
 * Assigns the rooms to a variable and a Vue data value.
 * Also sends the user back to the welcome page or room page, if the variable 'redirect' is defined.
 * Technically, the term 'show' is misleading, since Vue does all the showing.
 * @param {*} response response from the API
 */
function showRooms(response) {
    rooms = response;
    app.rooms = rooms;
    console.log(response);

    if (redirect !== undefined) {
        router.push(redirect);
        redirect = undefined;
    } else {
        router.push("/");
    }
}

/**
 * Function that runs if the rooms can't be fetched.
 * @param {*} statusCode status code, like 401 or 404.
 * @param {*} errorMessage error message, like 'Unauthorized'.
 */
function errorRooms(statusCode, errorMessage) {
    console.log(statusCode);
    console.log(errorMessage);
}

/**
 * Function that calls the API to fetch a list of messages.
 * @param {*} token User token, needed for authentication with the API.
 * @param {*} roomID Room ID
 * @param {*} page Page number, defaults to 1. Can be used later for loading more messages.
 */
function fetchMessages(token, roomID, page = 1) {
    var myApi = new Api('GET', 'rooms/checkMessages/' + token.token + '/' + roomID + '?page=' + page, null);
    myApi.execute(showMessages, errorMessages);
}

/**
 * Assigns the messages to a Vue data value.
 * Technically, the term 'show' is misleading, since Vue does all the showing.
 * @param {*} response Response from the API
 */
function showMessages(response) {
    console.log(response);
    app.messages = Array.from(response).reverse();
    window.scrollTo(0, document.querySelector("#chat-container").scrollHeight);
}

/**
 * Function that runs if the messages can't be fetched.
 * @param {*} statusCode status code, like 401 or 404.
 * @param {*} errorMessage error message, like 'Unauthorized'.
 */
function errorMessages(statusCode, errorMessage) {
    console.log(statusCode);
    console.log(errorMessage);
    $('#load-fail-modal').modal('show');
}

function getStatistics(token) {
    var myApi = new Api('GET', 'statistics/check/' + token.token, null);
    myApi.execute(showStatistics, errorStatistics);
}

function showStatistics(response) {
    console.log(response);

    var ctx = document.getElementById("messages-chart");
    var messagesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [response[6].create_date, response[5].create_date, response[4].create_date, response[3].create_date, response[2].create_date, response[1].create_date, response[0].create_date,],
            datasets: [{
                label: 'Aantal berichten',
                data: [response[6].number, response[5].number, response[4].number, response[3].number, response[2].number, response[1].number, response[0].number,],
                backgroundColor: [
                    '#9a0089',
                    '#9a0089',
                    '#9a0089',
                    '#9a0089',
                    '#9a0089',
                    '#9a0089',
                    '#9a0089',
                ],
                borderColor: [
                    '#9a0089',
                    '#9a0089',
                    '#9a0089',
                    '#9a0089',
                    '#9a0089',
                    '#9a0089',
                    '#9a0089',
                ],
                borderWidth: 9
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            title: {
                display: true,
                text: "Verstuurde berichten van afgelopen 7 dagen",
                fontSize: 30,
            }
        }
    });
}

function errorStatistics(statusCode, errorMessage) {
    console.log(statusCode);
    console.log(errorMessage);
}

/**
 * Gets the value from the message input and sends it to the API function.
 */
function getMessageInput() {
    var messageToSend = document.getElementById("send-input").value;
    console.log("Message to send: " + messageToSend);
    sendMessage(messageToSend, userToken, roomNumber, userToken.id);
}

/**
 * Function that uses the API to send a message.
 * @param {string} message Message to be sent
 * @param {*} token User token, needed for authentication with the API
 * @param {*} roomID Room ID to send the message to
 * @param {*} userID User ID to send the message as
 */
function sendMessage(message, token, roomID, userID) {
    var sendData = {
        user_id: userID,
        room_id: roomID,
        description: message
    };
    console.log(sendData);
    var myApi = new Api('POST', '/messages/send/' + token.token, sendData);
    myApi.execute(sendMessageSuccess, sendMessageError);
}

/**
 * Function that runs when a message has been succesfully sent.
 * Refreshes the room and empties the message input.
 * @param {*} response Response from the API
 */
function sendMessageSuccess(response) {
    var messageInput = document.getElementById("send-input");

    messageInput.setAttribute('style','');
    messageInput.value = "";
    console.log("Message sent: " + response);
    fetchMessages(userToken, roomNumber, 1);
}

/**
 * Function that runs when a message can't be succesfully sent.
 * @param {*} statusCode status code, like 401 or 404.
 * @param {*} errorMessage error message, like 'Unauthorized'.
 */
function sendMessageError(statusCode, errorMessage) {
    console.log(statusCode);
    console.log(errorMessage);
    $('#send-fail-modal').modal('show');
}

/**
 * Function that runs when logging in fails.
 * @param {*} message Error message from the API.
 */
function tokenError(message) {
    // Do something with the message
    console.log("Token error:" + message);

    $('#login-fail-modal').modal('show');

    $("#login-loading").hide();
    $("#btn-login").show();
}

/**
 * If logging in is succesful, the token is stored and the rooms are fetched.
 * Again, I could replace the jQuery with Vue
 * @param {*} token the user token.
 */
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