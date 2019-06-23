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
        <v-timeline-item v-for="event in events(today)" v-bind:color="event.color" small>
          <v-layout wrap pt-3>
            <v-flex xs3>
              <strong>{{timeoutput(event.time)}}</strong>
            </v-flex>
            <v-flex>
              <strong>{{event.title}}</strong>
              <div class="caption mb-2">
                <v-icon small>info</v-icon>
                {{event.descr}}
              </div>
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
    <v-fab-transition>
      <v-btn color="red" dark fab fixed bottom right @click="dialog = !dialog">
        <v-icon>add</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>

  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Neuer Kalender-Eintrag</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="title" label="Titel" prepend-icon="edit"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="descr" label="Beschreibung" prepend-icon="info"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="location" label="Ort" prepend-icon="location_on" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select v-model="day" :items="items" label="Tag" prepend-icon="calendar_today" data-vv-name="day" required></v-select>
              </v-flex>
              <v-flex xs12>
                <v-menu ref="menu" v-model="timepicker" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="time" label="Uhrzeit" prepend-icon="access_time" readonly v-on="on"></v-text-field>
                  </template>
                  <v-time-picker v-if="timepicker" v-model="time" full-width @click:minute="$refs.menu.save(time)" format="24hr"></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-select item-text="dispname" item-value="color" name="color" :items="colors" label="Farbe" required v-model="color" prepend-icon="color_lens"></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="red darken-1" flat @click="onCreateEvent">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    timepicker: false,
    title: '',
    descr: '',
    time: null,
    location: '',
    hosts: [],
    day: 0,
    color: '',
    items: [
      "Tag 1", "Tag 2", "Tag 3", "Tag 4"
    ]
  }),
  computed: {
    today() {
      return this.$store.getters.getDay
    },
    date() {
      return this.$store.getters.getDate
    },
    colors() {
      return this.$store.getters.getColors
    },
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
    },
    events(today) {
      return this.$store.getters.getEventsByDay(today)
    },
    onCreateEvent() {
      const eventData = {
        title: this.title,
        descr: this.descr,
        time: this.time,
        location: this.location,
        hosts: this.hosts,
        day: this.day,
        color: this.color
      }
      this.$store.dispatch('createEvent', eventData)
      this.dialog = false
    },
    timeoutput(time) {
      let hr = time.toDate().getHours();
      let min = time.toDate().getMinutes();
      (hr < 10) ? (hr = "0" + hr) : (hr = hr);
      (min < 10) ? (min = "0" + min) : (min = min);
      return hr + ":" + min
    }
  }
}
</script>
