<template>
<div class="murdergame">

  <v-layout row wrap align-center>
    <v-flex class="text-xs-center">
      <h1 class="heading blue--text">Mörderspiel</h1>
    </v-flex>
  </v-layout>

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
        <v-btn small flat color="grey" @click="sortByDown('rate')" slot="activator">
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
            <img src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BlondeGolden&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Blue03&eyeType=Default&eyebrowType=UpDown&mouthType=Default&skinColor=Light' height="125px" contain />
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
          <v-rating v-model="murder.rate" background-color="yellow lighten-2" color="yellow darken-1" dense half-increments hover size="25"></v-rating>
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

  <v-btn v-if="!isDead" dark fab fixed bottom right @click="dialog = !dialog">
    <v-icon>add</v-icon>
  </v-btn>

  <v-flex class="mt-4 mb-3">
    <PopupAddDeath/>
  </v-flex>

  <v-btn @click="addDeath('user', 'date', 'how')">add to database</v-btn>

</div>
</template>

<script>
import db from '@/fb'
import PopupAddDeath from '@/components/PopupAddDeath'
export default {
  components: { PopupAddDeath },
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
      const project = {
          user: this.user,
          date: this.date,
          how: this.how,
          rate: 0
        }
        db.collection('deaths').add(project).then(() => {
          console.log('added to db')
        })

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
