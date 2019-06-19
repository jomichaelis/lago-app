<template>
  <div class="team">

    <v-layout row wrap align-center>
      <v-flex class="text-xs-center">
        <h1 class="heading blue--text">Chat</h1>
      </v-flex>
    </v-layout>

    <v-container class="my-5">
      <v-layout row wrap v-for="n in 5">
        <v-flex>
          <v-card color="grey lighten-2" flat style="border-radius: 25px; margin-bottom: 10px">
            <v-card-title class="font-weight-bold" primary-title style="padding: 15px; padding-bottom: 3px">
              User
            </v-card-title>
            <v-card-text style="padding: 15px; padding-top: 3px">
              message
            </v-card-text>
          </v-card>
          <v-spacer></v-spacer>
        </v-flex>
      </v-layout>

    </v-container>

  </div>
</template>

<script>

export default {
  data() {
    return {
      messages: []
    }
  }
}
</script>
