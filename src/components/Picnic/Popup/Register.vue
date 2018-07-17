<template>
  <v-dialog persistent v-model="showDialog" max-width="500px">
    <v-btn depressed slot="activator" class="accent" round>
      {{ isJoined ? 'Leave' : 'Join' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="headline primary--text" v-if="isJoined">Leave Picnic</v-card-title>
            <v-card-title class="headline primary--text" v-else>Join Picnic</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              Are you sure? You can revert your changes later.
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
    props: ['picnicId'],
    data () {
      return {
        showDialog: false
      }
    },
    methods: {
      onConfirm () {
        this.showDialog = false
        if (this.isJoined) {
          this.$store.dispatch('removeAttendee', this.picnicId)
          this.$store.dispatch('leavePicnic', this.picnicId)
        } else {
          this.$store.dispatch('addAttendee', this.picnicId)
          this.$store.dispatch('joinPicnic', this.picnicId)
        }
      }
    },
    computed: {
      isJoined () {
        return this.$store.getters.getUser.joinedPicnics.findIndex((picnicId) => {
          return picnicId === this.picnicId
        }) >= 0
      }
    }
  }
</script>