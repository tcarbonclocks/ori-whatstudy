<template>
  <div>
    <!-- <nav class="navbar fixed-top navbar-expand-sm navbar-light bg-light" id="navbar">
      <router-link class="navbar-brand" v-bind:to="{ name: 'welcomePage'}">
        <img src="img/windesheimflevoland-logo.png" class="d-inline-block align-top" id="logo-picture" alt="">
        WhatStudy van Avinash
      </router-link>
      <button
        class="navbar-toggler d-lg-none"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              v-if="rooms"
            >Rooms</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="navbarDropdownMenu">
              <dropdown-item v-for="room in rooms" v-bind:room="room" v-bind:key="room.id"></dropdown-item>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav mt-2 mt-lg-0">
          <li class="nav-item">
            <button class="btn btn-dark" id="btn-login">Inloggen</button>
          </li>
          <li class="nav-item">
            <div class="spinner-border d-none" role="status" id="login-loading">
              <span class="sr-only">Proberen in te loggen...</span>
            </div>
          </li>
          <li class="nav-item">
            <span class="navbar-text" id="loggedin-text"></span>
          </li>
        </ul>
      </div>
    </nav>-->
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand v-bind:to="{ name: 'welcomePage'}">WhatStudy - Avinash</b-navbar-brand>

      <b-navbar-toggle target="nav_collapse"/>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item-dropdown text="Rooms">
            <b-dropdown-item
              v-for="room in this.rooms"
              v-bind:to='"/room/" + room.id'
              v-bind:room="room"
              v-bind:key="room.id"
            >{{ room.name }}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-text v-if='userToken' right>Ingelogd als {{ userToken.name.first }} {{ userToken.name.last }}</b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  props: ["rooms", "userToken"],
};
</script>
