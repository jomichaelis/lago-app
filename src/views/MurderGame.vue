<template>
<div class="murdergame">

  <v-container class="my-5">

    <v-layout row justify-start class="mb-2">
      <v-tooltip top>
        <v-btn small flat color="grey" @click="sortByUp('name')" slot="activator">
          <v-icon small left>person</v-icon>
          <span class="caption text-lowercase">Name</span>
        </v-btn>
        <span>Sortiere nach Namen</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn small flat color="grey" @click="sortByUp('date')" slot="activator">
          <v-icon small left>calendar_today</v-icon>
          <span class="caption text-lowercase">Datum</span>
        </v-btn>
        <span>Sortiere nach Datum</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn small flat color="grey" @click="sortByUp('rate')" slot="activator">
          <v-icon small left>stars</v-icon>
          <span class="caption text-lowercase">Bewertung</span>
        </v-btn>
        <span>Sortiere nach Bewertungen</span>
      </v-tooltip>
    </v-layout>

    <v-flex xs12>
      <v-card color="grey darken-4" class="white--text" v-for="murder,i in murders" :key="murder.name">
        <v-layout mt-2>
          <v-flex my-2 xs2 mdAndUp4>
            <v-img src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1" height="125px" contain></v-img>
          </v-flex>
          <v-flex xs10 mdAndUp8>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{murder.name}}</div>
                <div>{{murder.how}}</div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider dark></v-divider>
        <v-card-actions class="pa-3">
          <div>† gestorben an {{murder.date}}</div>
          <v-spacer></v-spacer>
          <v-icon v-for="a in murder.rate" color="yellow darken-1" @click="rateDeath(i, a)">star</v-icon>
          <v-icon v-for="b in (5-murder.rate)" color="yellow lighten-2" @click="rateDeath(i, murder.rate+b)">star_border</v-icon>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-container>

  <v-dialog v-model="dialog" max-width="600px">
    <v-card dark color="black">
      <v-card-title>
        <span class="headline">Bist wohl gfreckt?.</span>
      </v-card-title>
      <v-card-title>
        <span class="subheading">Dann trag mal hier die Infos ein.</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xsAndUp12>
              <v-text-field label="Wie bist du zu Tode gekommen?" required></v-text-field>
            </v-flex>
            <v-flex xsAndUp12>
              <v-select :items="['Tag 01', 'Tag 02', 'Tag 03', 'Tag 04', 'Tag 05', 'Tag 06', 'Tag 07', 'Tag 08', 'Tag 09', 'Tag 10']" label="Todestag" required></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn dark color="blue white--text" @click="dialog = false, addDeath('hello', 'hello', 'hello')">Ab in die Gruft</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-btn v-if="!isDead" v-model="fab" dark fab fixed bottom right @click="dialog = !dialog">
    <v-icon>add</v-icon>
  </v-btn>

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
          rate: 5
        },
        {
          name: 'Katha',
          date: 'Tag 10',
          how: 'Mit dem Wasserglas erschlagen',
          rate: 1
        },
        {
          name: 'Boris',
          date: 'Tag 03',
          how: 'An Teekrümeln vergiftet',
          rate: 4
        },
        {
          name: 'Liesl',
          date: 'Tag 05',
          how: 'In Sonnernmilch ertränkt',
          rate: 3
        },
        {
          name: 'Tobi',
          date: 'Tag 07',
          how: 'Von der Badeschlappe tödlich verwundet',
          rate: 4
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
    },
    addDeath(user, date, how) {
      this.murders.push({
        name: name,
        date: date,
        how: how,
        rate: 0
      });
    },
    rateDeath(element, rate) {
      this.murders[element].rate = rate
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
