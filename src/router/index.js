import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Picnics from '@/components/Picnic/Picnics'
import CreatePicnic from '@/components/Picnic/CreatePicnic'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/picnics',
      name: 'Picnics',
      component: Picnics
    },
    {
      path: '/picnic/new',
      name: 'CreatePicnic',
      component: CreatePicnic
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
})
