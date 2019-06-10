<template>
  <div class="team">

    <v-layout row wrap align-center>
      <v-flex class="text-xs-center">
        <h1 class="heading blue--text">Chat</h1>
      </v-flex>
    </v-layout>

    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in contacts" :key="person.name">
        </v-flex>
      </v-layout>

    </v-container>

  </div>
</template>

<script>
import db from '@/fb'

export default {
  data() {
    return {
      contacts: []
    }
  }
}
</script>
