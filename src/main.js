import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './stylus/main.styl'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'

Vue.use(Vuetify, {
  theme: {
    primary: '#B71C1C',
    secondary: '#D50000',
    accent: '#EF9A9A',
    error: '#F44336',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#4caf50'
  }
})

Vue.config.productionTip = false

Vue.filter('date', DateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBeTFltPF-Fc_GvDCZOaePVZc2lWXDkW_g',
      authDomain: 'join-picnic.firebaseapp.com',
      databaseURL: 'https://join-picnic.firebaseio.com',
      projectId: 'join-picnic',
      storageBucket: 'join-picnic.appspot.com'
    })
  }
})
