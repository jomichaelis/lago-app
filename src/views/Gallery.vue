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
              <v-flex v-for="n in posts" :key="n.id" xs4 d-flex>
                <v-card flat tile class="d-flex">
                  <v-img :src="n.imageUrl" aspect-ratio="1">
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
          <span class="headline">Neuer Post</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row justify-center>
              <v-flex xs4>
                <v-btn raised dark class="red" @click="onClickAvatarUpload">Bild hochladen</v-btn>
                <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onAvatarPicked">
              </v-flex>
            </v-layout>
            <v-layout row justify-center>
              <v-flex justify-center
                <img :src="imageUrl" width="120px">
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="title" label="Titel"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="descr" label="Beschreibung"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="hashtags" label="Hashtags"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="red darken-1" flat @click="onCreatePost">Save</v-btn>
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
    imageUrl: '',
    title: '',
    descr: '',
    user: 'thisuser',
    hashtags: '',
    likes: 0,
    image: null
  }),
  computed: {
    posts() {
      return this.$store.getters.getAllPosts.reverse()
    }
  },
  methods: {
    onCreatePost() {
      if (!this.image) {
        return
      }
      const postData = {
        title: this.title,
        descr: this.descr,
        user: this.user,
        hashtags: this.hashtags,
        likes: this.likes,
        image: this.image
      }
      this.$store.dispatch('createPost', postData)
      this.dialog = false
    },
    onClickAvatarUpload() {
      this.$refs.fileInput.click()
    },
    onAvatarPicked(event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
