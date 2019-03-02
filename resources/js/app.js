import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'

// import navBar from './components/navbar'
import App from './components/App'
import welcomePage from './components/welcomePage'
import gatekeeperPage from './components/gatekeeperPage'
import roomPage from './components/roomPage'
import roomErrorPage from './components/roomErrorPage'


/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


window.Vue = require('vue');
window.axios = require('axios');
Vue.use(VueRouter)
Vue.use(BootstrapVue);
Vue.prototype.$http = axios;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const router = new VueRouter({
    routes: [
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
    ],
})

const app = new Vue({
    el: '#app',
    template: '<App :rooms=rooms :userToken=userToken :currentRoom=currentRoom :messages=messages />',
    components: { App },
    data: {
        rooms: false,
        userToken: undefined,
        currentRoom: undefined,
        messages: false
    },
    methods: {
        fetchRooms() {
            axios.get(process.env.MIX_APP_URL + '/api/rooms/check/' + this.userToken.token).then((response)=>{
                this.rooms = response.data;
            })
        }
    },
    router
});

window.getToken = function () {
    var s = document.createElement("script");
    s.src = "https://epic.clow.nl/token?callback=tokenReceived";
    document.body.appendChild(s)
}

window.tokenReceived = function (token) {
    console.log('Token received:', token);
    if (token.error) {
        tokenError(token.error.message);
    } else {
        tokenSuccess(token);
    }
}

window.tokenError = function (message) {
    // Do something with the message
    console.log("Token error:" + message);
}

window.tokenSuccess = function (token) {
    // Do something with the token
    app.userToken = token;
    app.fetchRooms();
}

window.getToken();