<template>
  <v-dialog max-width="600px" dark>
    <v-btn flat slot="activator" class="success">Bist wohl gfreckt?</v-btn>
    <v-card>
      <v-card-title>
        <h2>Bist wohl gfreckt?</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field v-model="user" label="User" prepend-icon="folder"></v-text-field>
          <v-textarea v-model="how" label="Tathergang" prepend-icon="edit"></v-textarea>
          <v-text-field v-model="date" label="date" prepend-icon="folder"></v-text-field>
          <v-spacer></v-spacer>

          <v-btn flat @click="addDeath('Tag2', 'einfach gsturm')" class="success mx-0 mt-3">Add Project</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import db from '@/fb'
export default {
  data() {
    return {
      dialog: false,
      isDead: false,
      user: '',
      date: '',
      how: '',
      rate: 0
    }
  },
  methods: {
    sortByUp(prop) {
      this.murders.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
    },
    sortByDown(prop) {
      this.murders.sort((a, b) => a[prop] > b[prop] ? -1 : 1)
    },
    addDeath(user, date, how, rate) {
      const object = {
        user: this.user,
        date: this.date,
        how: this.how,
        rate: this.rate
      }
      db.collection('deaths').add(object).then(() => {
          console.log('added to db')
        })
      }
    },
}
</script>
