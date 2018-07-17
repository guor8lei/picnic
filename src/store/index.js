import Vue from 'vue'
import Vuex from 'vuex'

import picnic from './picnic'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    picnic: picnic,
    user: user,
    shared: shared
  }
})
