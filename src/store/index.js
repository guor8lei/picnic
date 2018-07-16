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
    },
    updatePicnic (state, payload) {
      const picnic = state.picnics.find((picnic) => {
        return picnic.id === payload.id
      })
      if (payload.title) {
        picnic.title = payload.title
      }
      if (payload.description) {
        picnic.description = payload.description
      }
      if (payload.date) {
        picnic.date = payload.date
      }
      if (payload.location) {
        picnic.location = payload.location
      }
    },
    joinPicnic (state, payload) {
      const id = payload.id
      // eslint-disable-next-line
      if (state.user.joinedPicnics.findIndex((picnic) => { picnic.id === id }) >= 0) {
        return
      }
      state.user.joinedPicnics.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    leavePicnic (state, payload) {
      const joinedPicnics = state.user.joinedPicnics
      // eslint-disable-next-line
      joinedPicnics.splice(joinedPicnics.findIndex((picnic) => { picnic.id === payload }), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    }
  },
  actions: {
    joinPicnic ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.getUser
      firebase.database().ref('/users/' + user.id).child('/joins/').push(payload).then(
        (data) => {
          commit('setLoading', false)
          commit('joinPicnic', {id: payload, fbKey: data.key})
        }
      ).catch(
        (error) => {
          commit('setLoading', false)
          console.log(error)
        }
      )
    },
    leavePicnic ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.getUser
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/joins/').child(fbKey).remove().then(
        (data) => {
          commit('setLoading', false)
          commit('leavePicnic', payload)
        }
      ).catch(
        (error) => {
          commit('setLoading', false)
          console.log(error)
        }
      )
    },
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
              location: object[i].location,
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
      commit('setLoading', true)
      const picnic = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.getUser.id
      }
      let imageUrl = ''
      let key
      const imgname = payload.image.name
      const imgext = imgname.slice(imgname.lastIndexOf('.'))
      firebase.database().ref('picnics').push(picnic).then(
        (data) => {
          key = data.key
          return key
        }
      ).then(
        (key) => {
          return firebase.storage().ref('picnics/' + key + '.' + imgext).put(payload.image)
        }
      ).then(
        () => {
          return firebase.storage().ref('picnics/' + key + '.' + imgext).getDownloadURL()
        }
      ).then(
        (url) => {
          imageUrl = url
          return firebase.database().ref('picnics').child(key).update({imageUrl: imageUrl})
        }
      ).then(
        () => {
          commit('setLoading', false)
          commit('createPicnic', {
            ...picnic,
            imageUrl: imageUrl,
            id: key
          })
        }
      ).catch(
        (error) => {
          commit('setLoading', false)
          console.log(error)
        }
      )
    },
    updatePicnic ({commit}, payload) {
      commit('setLoading', true)
      const newPicnic = {}
      if (payload.title) {
        newPicnic.title = payload.title
      }
      if (payload.description) {
        newPicnic.description = payload.description
      }
      if (payload.date) {
        newPicnic.date = payload.date
      }
      if (payload.location) {
        newPicnic.location = payload.location
      }
      firebase.database().ref('picnics').child(payload.id).update(newPicnic).then(
        () => {
          commit('setLoading', false)
          commit('updatePicnic', payload)
        }
      ).catch(
        (error) => {
          commit('setLoading', false)
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
              joinedPicnics: [],
              fbKeys: {}
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
              joinedPicnics: [],
              fbKeys: {}
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
      commit('setUser', {id: payload.uid, joinedPicnics: [], fbKeys: {}})
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
