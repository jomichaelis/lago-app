import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import db from '@/fb'
import storage from '@/fb'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    loading: false,
    loadedPosts: [],
    loadedEvents: [],
    adminSettings: {},
    loadedPersons: [],
    weekday: [
      "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"
    ],
    month: [
      "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"
    ]
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    createPost(state, payload) {
      state.loadedPosts.push(payload)
    },
    setLoadedPosts(state, payload) {
      state.loadedPosts = payload
    },
    setLoadedEvents(state, payload) {
      state.loadedEvents = payload
    },
    setAdminSettings(state, payload) {
      state.adminSettings = payload
    },
    setLoadedPersons(state, payload) {
      state.loadedPersons = payload
    }
  },
  actions: {
    signUserIn({
      commit
    }, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.id,
              email: payload.email
            }
            commit('setUser', newUser)
          }
        )
      console.log("Logged in")
    },
    signUserOut({
      commit
    }, payload) {
      commit('setLoading', true)
      firebase.auth().signOut()
        .then(
          user => {
            commit('setUser', null)
            commit('setLoading', false)
          }
        )
      console.log("User logged out")
    },

    createPost({
      commit
    }, payload) {
      let post = {
        title: payload.title,
        descr: payload.descr,
        time: new firebase.firestore.Timestamp.now(),
        user: payload.user,
        hashtags: payload.hashtags,
        likes: payload.likes
      }
      let time = post.time.toDate()
      let yr = time.getUTCFullYear()
      let mt = time.getUTCMonth() + 1;
      (mt < 10) ? (mt = "0" + mt) : (mt = mt)
      let dy = time.getUTCDate();
      (dy < 10) ? (dy = "0" + dy) : (dy = dy)
      let hr = time.getUTCHours();
      (hr < 10) ? (hr = "0" + hr) : (hr = hr)
      let mn = time.getUTCMinutes();
      (mn < 10) ? (mn = "0" + mn) : (mn = mn)
      let sc = time.getUTCSeconds();
      (sc < 10) ? (sc = "0" + sc) : (sc = sc)
      let idTime = yr + "." + mt + "." + dy + "_" + hr + "." + mn + "." + sc
      let key
      let filename
      let ext
      let id = idTime + "_" + post.user + "_" + post.title
      id = id.replace(/ /g, '')
      db.collection("posts").doc(id).set(post)
        .then(() => {
          filename = payload.image.name
          ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('gallery/' + id + ext).put(payload.image)
        })
        .then(() => {
          firebase.storage().ref('gallery/' + id + ext).getDownloadURL().then(function(downloadURL) {
            db.collection('posts').doc(id).update({
                imageUrl: downloadURL
              }),
              commit('createPost', {
                ...post,
                imageUrl: downloadURL,
                id: id
              })
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },

    loadPosts({
      commit
    }) {
      db.collection("posts").get()
        .then(function(querySnapshot) {
          const posts = []
          querySnapshot.forEach(function(doc) {
            const obj = doc.data()
            posts.push({
              id: doc.id,
              title: obj.title,
              descr: obj.descr,
              time: obj.time,
              user: obj.user,
              hastags: obj.hashtags,
              likes: obj.likes,
              imageUrl: obj.imageUrl
            })
          });
          commit('setLoadedPosts', posts)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },

    loadCalendar({
      commit
    }) {
      db.collection("calendar").get()
        .then(function(querySnapshot) {
          const events = []
          querySnapshot.forEach(function(doc) {
            const obj = doc.data()
            events.push({
              id: doc.id,
              title: obj.title,
              descr: obj.descr,
              day: obj.day,
              time: obj.time,
              location: obj.location,
              hosts: obj.hosts,
              color: obj.color
            })
          });
          commit('setLoadedEvents', events)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },

    loadAdminSettings({
      commit
    }) {
      db.collection("adminsettings").doc("adminsettings").get()
        .then(function(doc) {
          var adminsettings = doc.data();
          adminsettings.firstday = adminsettings.firstday.toDate();
          adminsettings.lastday = adminsettings.lastday.toDate();
          commit('setAdminSettings', adminsettings)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },

    loadPersons({
      commit
    }) {
      db.collection("users").get()
        .then(function(querySnapshot) {
          const users = []
          querySnapshot.forEach(function(doc) {
            const obj = doc.data()
            users.push({
              id: doc.id,
              firstname: obj.firstname,
              lastname: obj.lastname,
              shortname: obj.shortname,
              age: obj.age,
              avatar: obj.avatar
            })
          });
          commit('setLoadedPersons', users)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },

    updateAdminSettings({
      commit
    }, payload) {
      const adminsettings = {
        calendar: payload.calendar,
        contacts: payload.contacts,
        gallery: payload.gallery,
        murdergame: payload.murdergame,
        firstday: payload.firstday,
        lastday: payload.lastday
      }
      db.collection('adminsettings').doc("adminsettings").update(adminsettings)
        .then(() => {
          commit('setAdminSettings', adminsettings);
        })
        .catch((error) => {
          console.error(error);
        })
    }

  },

  getters: {
    getactive(state) {
      return (link) => {
        return state.loadedAdminSettings[link]
      }
    },
    user(state) {
      //return state.user
      return true
    },
    findUser(state) {
      var value = state.loadedPersons.filter(function(elem) {
        if (elem.email === state.user.email) return elem;
      });
      return value[0]["first_name"]
    },
    getAvatar(state) {
      var value = state.loadedPersons.filter(function(elem) {
        if (elem.email === state.user.email) return elem;
      });
      return value[0]["avatar"]
    },
    loading(state) {
      return state.loading
    },
    getAllPosts(state) {
      return state.loadedPosts
    },
    getAllEvents(state) {
      return state.loadedEvents
    },
    getDay(state) {
      let now = new Date();
      let firstday = state.adminSettings.firstday;
      let diff = now.getTime() - firstday.getTime();
      let negative = false;
      if (diff < 0) {
        diff = -diff;
        negative = true;
      }
      let diffdate = new Date(diff);
      if (negative) {
        return -diffdate.getDate()
      }
      return diffdate.getDate()
    },
    getDate(state) {
      return new Date()
    },
    getLoadedPersons(state) {
      return state.loadedPersons
    },
    getPersonByID: (state) => (id) => {
      return state.loadedPersons.find(loadedPersons => loadedPersons.id === id)
    },
    getAdminSettings(state) {
      return state.adminSettings
    }
  }
})
