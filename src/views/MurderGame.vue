<template>
<div class="murdergame">

  <v-container class="my-5">

    <v-btn @click="sortByUp('date')">Datum</v-btn>
    <v-btn @click="sortByUp('name')">Name</v-btn>
    <v-btn @click="sortByDown('rate')">Bewertung</v-btn>

    <v-flex xs12>
      <v-card color="grey darken-2" class="white--text" v-for="murder in murders" :key="murder.name">
        <v-layout mt-2>
          <v-flex my-2 xs2 mdAndUp4>
            <v-img src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1" height="125px" contain></v-img>
          </v-flex>
          <v-flex xs10 mdAndUp8>
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
          <p>{{murder.rate}}</p>
          <v-icon>star_border</v-icon>
          <v-icon>star_border</v-icon>
          <v-icon>star_border</v-icon>
          <v-icon>star_border</v-icon>
          <v-icon>star_border</v-icon>
        </v-card-actions>
      </v-card>
    </v-flex>

  </v-container>

  <v-btn v-if="!isDead" v-model="fab" dark fab fixed bottom right @click="dialog = !dialog">
    <v-icon>add</v-icon>
  </v-btn>

  <v-dialog v-model="dialog" max-width="600px">
      <v-card dark color="black">
        <v-card-title>
          <span class="headline">Du bist tot.</span>
        </v-card-title>
        <v-card-title>
          <span class="subheading">Trage hier deine Daten ein.</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xsAndUp12>
                <v-text-field label="Wie bist du zu Tode gekommen?" required></v-text-field>
              </v-flex>
              <v-flex xsAndUp12>
                <v-select
                  :items="['Tag 01', 'Tag 02', 'Tag 03', 'Tag 04', 'Tag 05', 'Tag 06', 'Tag 07', 'Tag 08', 'Tag 09', 'Tag 10']"
                  label="Todestag"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="blue white--text" @click="dialog = false">Ab in die Gruft</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


</div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      isDead: false,
      murders: [{
          name: 'Johannes',
          date: 'Tag 01',
          how: 'Vom Messer erstochen',
          rate: '5'
        },
        {
          name: 'Katha',
          date: 'Tag 10',
          how: 'Mit dem Wasserglas erschlagen',
          rate: '1'
        },
        {
          name: 'Boris',
          date: 'Tag 03',
          how: 'An Teekrümeln vergiftet',
          rate: '4'
        },
        {
          name: 'Liesl',
          date: 'Tag 05',
          how: 'In Sonnernmilch ertränkt',
          rate: '3'
        },
        {
          name: 'Tobi',
          date: 'Tag 07',
          how: 'Von der Badeschlappe tödlich verwundet',
          rate: '4'
        },
      ]
    }
  },
  methods: {
    sortByUp(prop) {
      this.murders.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
    },
    sortByDown(prop) {
      this.murders.sort((a, b) => a[prop] > b[prop] ? -1 : 1)
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
