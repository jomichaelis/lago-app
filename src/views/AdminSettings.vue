<template>
<div class="calendar" v-if="loggedIn">
  <v-flex xs12 text-xs-center mt-5>
    <h1 class="orange--text">Admin-Einstellungen</h1>
  </v-flex>

  <v-container>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onSaveAdminSettings">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-switch v-model="adminsettings.calendar" color="orange" label="Kalender"></v-switch>
              <v-switch v-model="adminsettings.contacts" color="orange" label="Kontaktbuch"></v-switch>
              <v-switch v-model="adminsettings.gallery" color="orange" label="Dokumente"></v-switch>
              <v-switch v-model="adminsettings.murdergame" color="orange" label="Gottesdienste"></v-switch>
              <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="adminsettings.firstday" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="adminsettings.firstday" label="Picker in menu" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="adminsettings.firstday" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(adminsettings.firstday)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs1>
              <v-btn color="orange" type="submit" flat>Speichern</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
    <v-fab-transition>
      <v-btn color="red" dark fab fixed bottom right @click="dialog = !dialog">
        <v-icon>add</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</div>
</template>

<script>
export default {
  data() {
    return {
      adminsettings: {
        calendar: true,
        contacts: true,
        gallery: true,
        murdergame: true,
        firstday: null,
        lastday: null
      },
      menu: false
    }
  },
  computed: {
    loggedIn() {
      return true
      //return (this.$store.getters.user === true)
    }
  },
  created: function() {
    this.adminsettings = this.$store.getters.getAdminSettings
  },
  methods: {
    onSaveAdminSettings() {
      const settingsData = {
        calendar: this.adminsettings.calendar,
        contacts: this.adminsettings.contacts,
        gallery: this.adminsettings.gallery,
        murdergame: this.adminsettings.murdergame,
        firstday: this.adminsettings.firstday,
        lastday: this.adminsettings.lastday
      }
      this.$store.dispatch('updateAdminSettings', settingsData)
    }
  }
}
</script>
