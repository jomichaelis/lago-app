<template>
  <div class="murdergame">
    <h1 class="subheading grey--text">Mörderspiel</h1>

    <v-container class="my-5">

      <v-card flat v-for="murder in murders" :key="murder.name">
        <v-layout row wrap :class="`pa-3 murder ${murder.name}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Name</div>
            <div>{{ murder.name }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Datum</div>
            <div>{{ murder.date }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Tathergang</div>
            <div>{{ murder.how }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="caption grey--text">Bewertung</div>
            <div>{{ murder.rate }}</div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>

    </v-container>

  </div>
</template>

<script>
export default {
  data() {
    return {
      murders: [
        { name: 'Johannes', date: '30.04.2019', how: 'bliblablub1', rate: '5'},
        { name: 'Katha', date: '26.04.2019', how: 'bliblablub2', rate: '1'},
        { name: 'Boris', date: '12.01.2019', how: 'bliblablub3', rate: '4'},
        { name: 'Liesl', date: '26.11.2018', how: 'bliblablub4', rate: '3'},
      ]
    }
  }
}
</script>

<style>
.murder.Johannes{
  border-left: 4px solid #3CD1C2;
}
.murder.Katha{
  border-left: 4px solid orange
}
.murder.Boris{
  border-left: 4px solid tomato;
}
.murder.Liesl{
  border-left: 4px solid yellow;
}
</style>
