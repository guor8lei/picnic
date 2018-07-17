<template>
  <v-dialog persistent v-model="showDialog" max-width="500px">
    <v-btn depressed slot="activator" class="accent" fab>
      <v-icon>delete_forever</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="headline primary--text">Delete Picnic</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              Are you sure? You cannot undo this.
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn color="red darken-1" flat round style="width: 100%" @click.native="showDialog = false">Cancel</v-btn>
              <v-btn color="green darken-1" flat round style="width: 100%" @click.native="onConfirm">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['picnic'],
    data () {
      return {
        showDialog: false
      }
    },
    methods: {
      onConfirm () {
        this.showDialog = false
        this.$store.dispatch('deleteJoin', {
          attendIds: this.$store.getters.getPicnic(this.picnic.id).attendIds,
          picnicId: this.picnic.id
        })
        this.$store.dispatch('deletePicnic', {
          id: this.picnic.id
        })
        this.$router.push('/picnics')
      }
    }
  }
</script>