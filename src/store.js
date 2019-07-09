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
    colors: [],
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
    createEvent(state, payload) {
      state.loadedEvents.push(payload)
    },
    setAdminSettings(state, payload) {
      state.adminSettings = payload
    },
    setLoadedPersons(state, payload) {
      state.loadedPersons = payload
    },
    setLoadedColors(state, payload) {
      state.colors = payload
    }
  },
  actions: {
    signUserIn({
      commit
    }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.user.uid,
              email: payload.email
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setError', error)
            console.log(error)
          }
        )
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

    loadColors({
      commit
    }) {
      db.collection("colors").get()
        .then(function(querySnapshot) {
          const colors = []
          querySnapshot.forEach(function(doc) {
            const obj = doc.data()
            colors.push({
              id: doc.id,
              color: obj.color,
              dark: obj.dark,
              dispname: obj.dispname
            })
          });
          commit('setLoadedColors', colors)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
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

    createEvent({
      commit
    }, payload) {
      let event = {
        title: payload.title,
        descr: payload.descr,
        time: payload.time,
        location: payload.location,
        hosts: payload.hosts,
        day: payload.day,
        color: payload.color
      }
      event.day = event.day.substring(4, 100);
      event.day = parseInt(event.day);
      let firstday = this.state.adminSettings.firstday;
      let beginn = firstday.getTime();
      let timestamp = beginn + ((event.day - 1) * 24 * 60 * 60 * 1000);
      let timemillis = (parseInt(event.time.substring(0, 2)) * 60 + parseInt(event.time.substring(3, 6))) * 60 * 1000;
      timestamp = timestamp + timemillis;
      let dayid = event.day;
      (dayid < 10) ? (dayid = "0" + dayid) : (dayid = dayid);
      let id = dayid + "#" + event.time + "_" + event.title;
      id = id.replace(/ /g, '');
      let time = new firebase.firestore.Timestamp(timestamp / 1000);
      event.time = time;
      db.collection("calendar").doc(id).set(event)
        .catch((error) => {
          console.log(error)
        })
      commit('createEvent', event)
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
              avatar: obj.avatar,
              uid: obj.uid
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
      return state.user
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
    getEventsByDay: (state) => (day) => {
      return state.loadedEvents.filter(loadedEvents => loadedEvents.day === day)
    },
    getDay(state) {
      let now = new Date();
      let firstday = state.adminSettings.firstday;
      let diff = now.getTime() - firstday.getTime();
      let negative = false;
      let day = Math.floor((diff / 1000 / 60 / 60) / 24) + 1;
      return day
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
    },
    getColors(state) {
      return state.colors
    },
    getUser(state) {
      var value = state.loadedPersons.filter(function(elem) {
        if (elem.uid === state.user.id) return elem;
      });
      return value[0]
    }
  }
})
