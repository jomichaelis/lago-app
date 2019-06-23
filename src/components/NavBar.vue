<template>
<nav>
  <v-toolbar flat app>
    <v-toolbar-side-icon @click="drawer = !drawer" class="orange--text" v-if="loggedIn"></v-toolbar-side-icon>
    <v-toolbar-title class="text-lowercase orange--text">
      <span class="font-weight-light">lago.</span>
      <span>app</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn flat color="orange" router to='/login' v-if="!loggedIn">
      <span>Anmelden</span>
      <v-icon right>lock_open</v-icon>
    </v-btn>
    <v-btn flat color="orange" v-if="loggedIn" @click="onSignout">
      <span>Abmelden</span>
      <v-icon right>exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>

  <v-navigation-drawer id="app-drawer" v-model="drawer" app dark v-if="loggedIn">
    <v-img :src="require('@/assets/lago.jpeg')" height="100%" gradient="to top, rgba(100,115,201,.33), rgba(25,32,72,.7)">
      <v-layout fill-height tag="v-list" column>
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route" class="list-item v-list__tile">
            <v-list-tile-action>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="white--text body-2">{{ link.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-spacer></v-spacer>
        <v-subheader class="mt-3 white--text">Admin</v-subheader>
        <v-list>
          <v-list-tile v-for="link in adminlinks" :key="link.text" router :to="link.route" class="list-item v-list__tile">
            <v-list-tile-action>
              <v-icon color="white">{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="white--text body-2">{{ link.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-layout>
    </v-img>
  </v-navigation-drawer>

</nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [{
          icon: 'home',
          text: 'Home',
          route: '/'
        },
        {
          icon: 'calendar_today',
          text: 'Kalender',
          route: '/calendar'
        },
        {
          icon: 'contacts',
          text: 'Kontakte',
          route: '/contacts'
        },
        {
          icon: 'description',
          text: 'Bilder',
          route: '/gallery'
        },
        {
          icon: 'assistant_photo',
          text: 'Mörderspiel',
          route: '/murdergame'
        }
      ],
      adminlinks: [{
          icon: 'settings',
          text: 'Einstellungen',
          route: '/admin'
        }
      ]
    }
  },
  methods: {
    onSignout() {
      this.$store.dispatch('signUserOut', {})
      this.$router.push('/')
    }
  },
  computed: {
    loggedIn() {
      return (this.$store.getters.user !== null)
      //return true
    },
    username() {
      return this.$store.getters.findUser
    },
    avatar() {
      return this.$store.getters.getAvatar
    }
  }
}
</script>

<style lang="scss">
#app-drawer {
    .v-list__tile {
        width: 100%;
        border-radius: 4px;
        &--buy {
            margin-top: auto;
            margin-bottom: 17px;
        }
    }
    .v-image__image--contain {
        top: 9px;
        height: 60%;
    }
    div.v-responsive.v-image > div.v-responsive__content {
        overflow-y: auto;
    }
}
</style>
