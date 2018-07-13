import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    picnics: [{
      imageUrl: 'https://timedotcom.files.wordpress.com/2014/09/201410_bpl_24rockville.jpg',
      id: '1',
      title: 'Rockville, MD',
      date: '2017-07-17',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
      imageUrl: 'http://52.24.98.51/wp-content/uploads/2017/06/berkeley-california-san-francisco.jpg',
      id: '23fn23lknlkn23lkn',
      title: 'Berkeley, CA',
      date: '2017-07-18',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    },
    {
      imageUrl: 'https://static.parade.com/wp-content/uploads/2017/09/washington-dc-travel-cars-ftr.jpg',
      id: 'absbsdasfasdfasdf',
      title: 'Washington, DC',
      date: '2017-07-19',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    }
    ],
    user: {
      id: '12412412',
      joinedPicnics: ['1']
    }
  },
  mutations: {},
  actions: {},
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
})
