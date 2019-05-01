<template>
<div class="calendar">

  <v-layout row wrap align-center>
    <v-flex class="text-xs-center">
      <h1 class="heading blue--text">Kalender</h1>
    </v-flex>
  </v-layout>

  <v-container class="my-5">
    <v-img src="https://cdn.vuetifyjs.com/images/cards/forest.jpg" gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)" height="200px">
      <v-container fill-height>
        <v-layout align-center>
          <strong class="display-3 font-weight-regular mr-4 white--text">Tag {{today}}</strong>
          <v-layout column justify-end>
            <div class="headline font-weight-light white--text">Monday</div>
            <div class="text-uppercase font-weight-light white--text">February 2015</div>
          </v-layout>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-text class="py-0 mt-3">
      <v-timeline align-top dense>
        <v-timeline-item v-for="event in days[today].events" color="blue" small>
          <v-layout wrap pt-3>
            <v-flex xs3>
              <strong>{{event.time}}</strong>
            </v-flex>
            <v-flex>
              <strong>{{event.eventname}}</strong>
              <div class="caption mb-2">{{event.descr}}</div>
              <v-avatar v-for="hosts in event.hosts">
                <img
                  src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BlondeGolden&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Blue03&eyeType=Default&eyebrowType=UpDown&mouthType=Default&skinColor=Light' />
                </img>
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
  data() {
    return {
      today: 0,
      color: 'yellow',
      days: [{
        day: 1,
        events: [{
            time: '09:00',
            eventname: 'Frühstück',
            descr: 'Happa happa',
            color: 'yellow'
          },
          {
            time: '10:00',
            eventname: 'Spielen',
            descr: 'game-time',
            color: 'pink',
            hosts: ['Bärbel', 'Lukas']
          }
        ]
      }]
    }
  },
}
</script>
