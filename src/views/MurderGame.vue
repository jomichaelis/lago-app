<template>
<div class="murdergame">

  <v-container class="my-5">

    <v-btn @click="sortBy('date')">sort by date</v-btn>

    <v-flex xs12>
      <v-card color="grey darken-2" class="white--text" v-for="murder in murders" :key="murder.name">
        <v-layout mt-2>
          <v-flex my-2 xs3>
            <v-img src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1" height="125px" contain></v-img>
          </v-flex>
          <v-flex xs9>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{murder.name}} († {{murder.date}})</div>
                <div>{{murder.how}}</div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider dark></v-divider>
        <v-card-actions class="pa-3">
          Bewerte den Tod von {{murder.name}}
          <v-spacer></v-spacer>
          <v-icon>star_border</v-icon>
          <v-icon>star_border</v-icon>
          <v-icon>star_border</v-icon>
          <v-icon>star_border</v-icon>
          <v-icon>star_border</v-icon>
        </v-card-actions>
      </v-card>
    </v-flex>

  </v-container>


</div>
</template>

<script>
export default {
  data() {
    return {
      murders: [{
          name: 'Johannes',
          date: '30.04.2019',
          how: 'Vom Messer erstochen',
          rate: 'five'
        },
        {
          name: 'Katha',
          date: '26.04.2019',
          how: 'Mit dem Wasserglas erschlagen',
          rate: '1'
        },
        {
          name: 'Boris',
          date: '12.01.2019',
          how: 'Jumping like a Gans',
          rate: '4'
        },
        {
          name: 'Liesl',
          date: '26.11.2018',
          how: 'In Sonnernmilch ertränkt',
          rate: '3'
        },
        {
          name: 'Tobi',
          date: '16.01.2019',
          how: 'Jumping like a Gans',
          rate: '4'
        },
      ]
    }
  }
}
</script>

<style>
.murder {
  border-left: 4px solid black;
}

.v-chip.five {
  background: black;
}
</style>
