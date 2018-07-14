import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    picnics: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    createPicnic (state, payload) {
      state.picnics.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setPicnics (state, payload) {
      state.picnics = payload
    }
  },
  actions: {
    loadPicnics ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('picnics').once('value').then(
        (data) => {
          const picnics = []
          const object = data.val()
          for (let i in object) {
            picnics.push({
              id: i,
              title: object[i].title,
              description: object[i].description,
              date: object[i].date,
              imageUrl: object[i].imageUrl,
              creatorId: object[i].creatorId
            })
          }
          commit('setPicnics', picnics)
          commit('setLoading', false)
        }
      ).catch(
        (error) => {
          console.log(error)
          commit('setLoading', false)
        }
      )
    },
    createPicnic ({commit, getters}, payload) {
      const picnic = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.getUser.id
      }
      firebase.database().ref('picnics').push(picnic).then(
        (data) => {
          const key = data.key
          commit('createPicnic', {
            ...picnic,
            id: key
          })
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
    },
    registerUser ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              joinedPicnics: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    loginUser ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              joinedPicnics: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    clearError ({commit}) {
      commit('clearError')
    },
    autoLogin ({commit}, payload) {
      commit('setUser', {id: payload.uid, joinedPicnics: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    getPicnics (state) {
      return state.picnics.sort((picnic1, picnic2) => {
        return picnic1.date > picnic2.date
      })
    },
    getPicnic (state) {
      return (picnicId) => {
        return state.picnics.find((picnic) => {
          return picnic.id === picnicId
        })
      }
    },
    getFeaturedPicnics (state, getters) {
      return getters.getPicnics.slice(0, 5)
    },
    getUser (state) {
      return state.user
    },
    getError (state) {
      return state.error
    },
    getLoading (state) {
      return state.loading
    }
  }
})
