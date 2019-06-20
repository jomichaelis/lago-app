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
    loadedPosts: []
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
      let idTime = time.getUTCFullYear() + "." + (time.getUTCMonth() + 1) + "." + time.getUTCDate() + "_" + time.getUTCHours() + "." + time.getUTCMinutes() + "." + time.getUTCSeconds()
      let key
      let filename
      let ext
      const id = idTime + "_" + post.user + "_" + post.title
      db.collection("posts").doc(id).set(post)
        .then(() => {
          filename = payload.image.name
          ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('gallery/' + id + ext).put(payload.image)
        })
        .then(() => {
          firebase.storage().ref('gallery/' + id + ext).getDownloadURL().then(function(downloadURL) {
            db.collection('posts').doc(id).update({
                imageUrl: downloadURL,
                id: id
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
      //return true
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
    }
  }
})
