import * as firebase from 'firebase'

export default {
  state: {
    picnics: []
  },
  mutations: {
    createPicnic (state, payload) {
      state.picnics.push(payload)
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
    removeAttendee (state, payload) {
      const picnic = state.picnics.find((picnic) => {
        return picnic.id === payload.id
      })
      const attendeeIndex = picnic.attendIds.indexOf(payload.userId)
      if (attendeeIndex === -1) {
        return
      }
      picnic.attendIds.splice(attendeeIndex, 1)
    },
    addAttendee (state, payload) {
      const picnic = state.picnics.find((picnic) => {
        return picnic.id === payload.id
      })
      picnic.attendIds.push(payload.userId)
    },
    deletePicnic (state, payload) {
      const picnic = state.picnics.find((picnic) => {
        return picnic.id === payload.id
      })
      const deleteIndex = state.picnics.indexOf(picnic)
      state.picnics.splice(deleteIndex, 1)
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
              location: object[i].location,
              date: object[i].date,
              imageUrl: object[i].imageUrl,
              creatorId: object[i].creatorId,
              attendIds: object[i].attendIds
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
        creatorId: getters.getUser.id,
        attendIds: ['']
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
    addAttendee ({commit, getters}, payload) {
      commit('setLoading', true)
      const newPicnic = {}
      newPicnic.attendIds = getters.getPicnic(payload).attendIds
      newPicnic.attendIds.push(getters.getUser.id)
      firebase.database().ref('picnics').child(payload).update(newPicnic).then(
        () => {
          commit('setLoading', false)
          commit('addAttendee', {
            id: payload,
            userId: getters.getUser.id
          })
        }
      ).catch(
        (error) => {
          commit('setLoading', false)
          console.log(error)
        }
      )
    },
    removeAttendee ({commit, getters}, payload) {
      const newPicnic = {}
      newPicnic.attendIds = getters.getPicnic(payload).attendIds
      const attendeeIndex = newPicnic.attendIds.indexOf(getters.getUser.id)
      if (attendeeIndex === -1) {
        return
      }
      newPicnic.attendIds.splice(attendeeIndex, 1)
      firebase.database().ref('picnics').child(payload).update(newPicnic).then(
        () => {
          commit('setLoading', false)
          commit('removeAttendee', {
            id: payload,
            userId: getters.getUser.id
          })
        }
      ).catch(
        (error) => {
          commit('setLoading', false)
          console.log(error)
        }
      )
    },
    deletePicnic ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('picnics').child(payload.id).remove().then(
        () => {
          commit('setLoading', false)
          commit('deletePicnic', payload)
        }
      ).catch(
        (error) => {
          commit('setLoading', false)
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
    }
  }
}
