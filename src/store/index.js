import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    picnics: [{
      imageUrl: 'https://timedotcom.files.wordpress.com/2014/09/201410_bpl_24rockville.jpg',
      id: '1',
      title: 'Basketball in Rockville',
      date: new Date(),
      location: 'Rockville',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
      imageUrl: 'http://52.24.98.51/wp-content/uploads/2017/06/berkeley-california-san-francisco.jpg',
      id: '23fn23lknlkn23lkn',
      title: 'Shopping in Berkeley',
      date: new Date(),
      location: 'Berkeley',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
      imageUrl: 'https://static.parade.com/wp-content/uploads/2017/09/washington-dc-travel-cars-ftr.jpg',
      id: 'absbsdasfasdfasdf',
      title: 'Swimming in DC',
      location: 'DC',
      date: new Date(),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    }
    ],
    user: null
  },
  mutations: {
    createPicnic (state, payload) {
      state.picnics.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    createPicnic ({commit}, payload) {
      const picnic = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: payload.date.toString()
      }
      commit('createPicnic', picnic)
    },
    registerUser ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
          user => {
            const newUser = {
              id: user.uid,
              joinedPicnics: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    loginUser ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
          user => {
            const newUser = {
              id: user.uid,
              joinedPicnics: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
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
    }
  }
})
