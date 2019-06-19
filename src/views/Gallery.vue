<template>
<div class="gallery">

  <v-layout row wrap align-center>
    <v-flex class="text-xs-center">
      <h1 class="heading blue--text">Bilder</h1>
    </v-flex>
  </v-layout>

  <v-container class="my-5">
    <v-layout row wrap align-center>
      <v-flex xs12 offset-sm0>
        <v-card>
          <v-container grid-list-sm fluid>
            <v-layout row wrap>
              <v-flex v-for="n in 9" :key="n" xs4 d-flex>
                <v-card flat tile class="d-flex">
                  <v-img :src="`https://picsum.photos/500/300?image=${n * 5 + 11}`" :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 11}`" aspect-ratio="1" class="grey lighten-2">
                    <template v-slot:placeholder>
                      <v-layout fill-height align-center justify-center ma-0>
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-layout>
                    </template>
                  </v-img>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>

</script>
