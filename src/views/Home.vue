<template>
<div class="home">

  <v-layout row wrap align-center>
    <v-flex class="text-xs-center">
      <h1 class="heading blue--text">Home</h1>
    </v-flex>
  </v-layout>

  <v-container class="my-5">
    <v-parallax height="750" :src="require('@/assets/lago.jpeg')">
      <v-layout column align-center justify-center class="white--text">
        <img src="@/assets/logo.png" alt="Vuetify.js" height="200">
        <h1 class="white--text mb-2 text-xs-center">lago.app</h1>
        <div class="subheading mb-3 text-xs-center">Dein Begleiter</div>
        <v-btn class="orange mt-5" dark large router to="/login">
          Anmelden
        </v-btn>
      </v-layout>
    </v-parallax>
  </v-container>
</div>
</template>

<script>
export default {

}
</script>
