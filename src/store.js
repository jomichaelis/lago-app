import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import db from '@/fb'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    loading: false,
    chatmessages: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    addChatMessage(state, payload) {
      state.chatmessages.push(payload)
    },
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
    addChatMessage({
      commit
    }, payload) {
      const message = {
        user: payload.user,
        date: payload.date,
        message: payload.message
      }
      const id = message.date + "_" + message.user
      // Add a new document with a generated id.
      db.collection('chat').doc(id).set(message)
        .then(() => {
          commit('addChatMessage', {
            ...message,
            id: id
          });
        })
        .catch((error) => {
          console.error(error);
        })
    },

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
    }
  }
})
