import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './stylus/main.styl'

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
