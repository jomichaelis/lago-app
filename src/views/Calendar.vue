<template>
<div class="calendar">

  <v-layout row wrap align-center>
    <v-flex class="text-xs-center">
      <h1 class="heading blue--text">Kalender</h1>
    </v-flex>
  </v-layout>

  <v-container class="my-5">
    <v-img :src="require('@/assets/lago.jpeg')" gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)" height="200px">
      <v-container fill-height>
        <v-layout align-center>
          <strong class="display-3 font-weight-regular mr-4 white--text">Tag {{today}}</strong>
          <v-layout column justify-end>
            <div class="headline font-weight-light white--text">{{getWeekday(date.getDay())}}</div>
            <div class="text-uppercase font-weight-light white--text">{{date.getDate()}}. {{getMonth(date.getUTCMonth())}} {{date.getUTCFullYear()}}</div>
          </v-layout>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-text class="py-0 mt-3">
      <v-timeline align-top dense>
        <v-timeline-item v-for="event in events" v-bind:color="event.color" small>
          <v-layout wrap pt-3>
            <v-flex xs3>
              <strong>{{event.time.toDate().getHours()}}:{{event.time.toDate().getMinutes()}}</strong>
            </v-flex>
            <v-flex>
              <strong>{{event.title}}</strong>
              <div class="caption mb-2">{{event.descr}}</div>
              <div class="caption mb-2">
                <v-icon small>location_on</v-icon>
                {{event.location}}
              </div>
              <v-avatar v-for="host in event.hosts">
                <img :src="getPersonByID(host.id).avatar" />
              </v-avatar>
            </v-flex>
          </v-layout>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-container>
</div>
</template>

<script>
export default {
  computed: {
    events() {
      return this.$store.getters.getAllEvents
    },
    today() {
      return this.$store.getters.getDay
    },
    date() {
      return this.$store.getters.getDate
    }
  },
  methods: {
    getPersonByID(id) {
      return this.$store.getters.getPersonByID(id)
    },
    getWeekday(day) {
      return this.$store.state.weekday[day]
    },
    getMonth(month) {
      return this.$store.state.month[month]
    }
  }
}
</script>
