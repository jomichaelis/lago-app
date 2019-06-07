<template>
<v-footer height="auto" color="purple lighten-3">
  <v-layout justify-center row wrap>
    <v-btn color="white" flat round href="http://moehrendorf-evangelisch.de" target="_blank">
      Website
    </v-btn>
    <v-btn color="white" flat round router to="/howto">
      How To
    </v-btn>
    <v-btn color="white" flat round href="http://moehrendorf-evangelisch.de/kontakt" target="_blank">
      Kontakt
    </v-btn>
    <v-flex purple lighten-2 py-1 text-xs-center white--text xs12>
      &copy;2019 — <strong>Johannes Michaelis</strong>
    </v-flex>
  </v-layout>
</v-footer>
</template>

<script>
export default {
  data: () => ({
  })
}
</script>
