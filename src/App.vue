<template>
  <v-app>
    <v-navigation-drawer absolute temporary v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Picnic</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view>
        
      </router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      menuItems: [
        { icon: 'group', title: 'View Picnics', link: '/picnics' },
        { icon: 'group_add', title: 'Create Picnic', link: '/picnic/new' },
        { icon: 'person', title: 'Your Profile', link: '/profile' },
        { icon: 'person_add', title: 'Register', link: '/signup' },
        { icon: 'person_pin', title: 'Log In', link: '/signin' }
      ]
    }
  },
  name: 'App'
}
</script>

<style lang="stylus">
  @import './stylus/main';
</style>