import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
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
    deleteJoin ({commit}, payload) {
      const attendIds = payload.attendIds
      if (attendIds.length === 1) {
        return
      }
      attendIds.splice(0, 1)
      commit('setLoading', true)
      for (let userIdKey in attendIds) {
        firebase.database().ref('/users/' + attendIds[userIdKey] + '/joins/').once('value').then(
          (data) => {
            const values = data.val()
            let newJoin = {}
            for (let key in values) {
              if (values[key] !== payload.picnicId) {
                newJoin[key] = values[key]
              }
            }
            return firebase.database().ref('/users/' + attendIds[userIdKey] + '/joins/').set(newJoin)
          }
        ).then(
          (data) => {
            commit('setLoading', false)
          }
        ).catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
      }
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
    autoLogin ({commit}, payload) {
      commit('setUser', {id: payload.uid, joinedPicnics: [], fbKeys: {}})
    },
    fetchUserPicnics ({commit, getters}, payload) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.getUser.id + '/joins/').once('value').then(
        (data) => {
          const values = data.val()
          let joinedPicnics = []
          let swappedValues = {}
          for (let key in values) {
            joinedPicnics.push(values[key])
            swappedValues[values[key]] = key
          }
          const newUser = {
            id: getters.getUser.id,
            joinedPicnics: joinedPicnics,
            fbKeys: swappedValues
          }
          commit('setLoading', false)
          commit('setUser', newUser)
        }
      ).catch(
        (error) => {
          console.log(error)
          commit('setLoading', false)
        }
      )
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getUserPicnics (state) {
      return state.user.joinedPicnics
    }
  }
}
