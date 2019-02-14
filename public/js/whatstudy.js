"use strict";

Vue.component('dropdown-item', {
    props: ['room'],
    template: "<router-link class='dropdown-item' v-bind:to='\"/room/\" + room.id'>{{ room.name }}</router-link>"
    // template: "<a class='dropdown-item'>{{ room.name }}</a>"
})

const gatekeeperPage = { template: "<div>" +
                                    "<h2>U bent nog niet ingelogd. I AM THE GATEKEEPER</h2>" +
                                    "<p>U kunt deze site niet gebruiken zonder (als student of docent van Windesheim Flevoland) ingelogd te zijn.</p>" +
                                    "</div>" }

const roomPage = { template:  "<div>" +
                              "<p>Welkom bij room {{ $route.params.id }}</p>" +
                              "</div>",
                    beforeRouteEnter: (to, from, next) => {
                        var roomNumber = to.params.id;
                        console.log("Connecting to room " + roomNumber);
                        if (rooms === undefined) {
                            router.push("/gatekeeper");
                            redirectRoom = roomNumber;
                        } else if (roomNumber >= (rooms.length + 1) || roomNumber <= 0) {
                            router.push("/roomerror");
                        } else {
                            next();
                        }
                    },
                    beforeRouteUpdate: (to, from, next) => {
                        var roomNumber = to.params.id;
                        console.log("Connecting to room " + roomNumber);
                        if (rooms === undefined) {
                            router.push("/gatekeeper?roomcallback=" + roomNumber);
                        } else if (roomNumber >= (rooms.length + 1) || roomNumber <= 0) {
                            router.push("/roomerror");
                        } else {
                            next();
                        }
                    },
                }

const roomErrorPage = { template:  "<div>" +
                              "<p>Deze room kan niet geladen worden. Waarschijnlijk bestaat deze kamer niet.</p>" +
                              "</div>"
                        }
                        
const routes = [
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
    router
}).$mount('#app')


var navBar = new Vue({
    data: {rooms: false},
    router
}).$mount('#navbar')

var userToken;
var rooms;
var redirectRoom;

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

    if (redirectRoom !== undefined) {
        router.push("/room/" + redirectRoom);
        redirectRoom = undefined;
    }

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
    $("#login-loading").hide();    
    $("#btn-login").hide();
    $("#loggedin-text").html("Ingelogd als " + token.name.first + " " + token.name.last + " (" + token.id + ")");
    fetchRooms(userToken);
}


// initialize
addButtonActions();