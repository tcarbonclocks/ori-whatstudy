<template>
  <b-list-group>
    <b-list-group-item>
      <h2>Room {{ $route.params.id }}: {{ this.rooms[$route.params.id - 1].name }}</h2>
      <button
        v-on:click="this.fetchMessages(this.userToken, this.roomNumber, 1)"
        type="button"
        class="btn btn-primary ml-auto"
      >Vernieuwen</button>
    </b-list-group-item>
    <message v-for="message in messages" v-bind:message="message" v-bind:key="message.id"></message>
    <!-- <li class="list-group-item fixed-bottom fixed-bottom-600px">
      <input
        v-on:keyup.enter="this.getMessageInput"
        class="form-control"
        type="text"
        placeholder="Druk op Enter om te sturen."
        id="send-input"
      >
    </li> -->
    <b-list-group-item>Vestibulum at eros</b-list-group-item>
  </b-list-group>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        methods: {
            fetchMessages: function() {
                currentRoom = $route.params.id;
                axios.get(process.env.MIX_APP_URL + '/api/messages/check/' + this.userToken.token + "/" + this.currentRoom).then((response)=>{
                messages = response.data;
            })
            }
    }}
</script>
