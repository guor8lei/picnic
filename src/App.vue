<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" class="hidden-sm-and-up">
      <v-list>
        <v-list-tile>
          <vi-list-tile-action>
            <v-icon>group</v-icon>
          </vi-list-tile-action>
          <v-list-tile-content>View Picnics</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed dark class="primary">
      <v-toolbar-side-icon @click.native.stop="sideNav = ! sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>Picnic</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat>
          <v-icon left>group</v-icon>
          View Picnics
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  name: 'App'
}
</script>
