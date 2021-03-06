import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './stylus/main.styl'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertComponent from './components/Shared/Alert.vue'
import EditPicnicComponent from './components/Picnic/Popup/EditPicnic.vue'
import JoinPicnicComponent from './components/Picnic/Popup/Register.vue'
import DeletePicnicComponent from './components/Picnic/Popup/DeletePicnic.vue'

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
Vue.component('app-alert', AlertComponent)
Vue.component('app-edit-picnic', EditPicnicComponent)
Vue.component('app-join-picnic', JoinPicnicComponent)
Vue.component('app-delete-picnic', DeletePicnicComponent)

var config = {
  apiKey: 'AIzaSyBeTFltPF-Fc_GvDCZOaePVZc2lWXDkW_g',
  authDomain: 'join-picnic.firebaseapp.com',
  databaseURL: 'https://join-picnic.firebaseio.com',
  projectId: 'join-picnic',
  storageBucket: 'gs://join-picnic.appspot.com'
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.$store.dispatch('autoLogin', user)
          this.$store.dispatch('fetchUserPicnics')
        }
      }
    )
    this.$store.dispatch('loadPicnics')
  }
})
