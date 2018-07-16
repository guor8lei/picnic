<template>
    <v-container>
        <v-layout row wrap>
          <v-flex xs12 class="text-xs-center">
            <v-progress-circular
              indeterminate
              color="primary"
              :size="100"
              :width="8"
              v-if="loading"
            ></v-progress-circular>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-if="!loading">
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h1 class="primary--text"> {{ picnic.title }} </h1>
                        <template v-if="isCreator">
                            <v-spacer></v-spacer>
                            <app-edit-picnic :picnic="picnic"></app-edit-picnic>
                        </template>
                    </v-card-title>
                    <v-card-media
                        :src="picnic.imageUrl"
                        height="400px"
                    ></v-card-media>
                    <v-card-text>
                        <div class="info--text"> {{ picnic.date | date }} - {{ picnic.location }}</div>
                        <div> {{ picnic.description }} </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat round class="accent">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
      props: ['id'],
      computed: {
        picnic () {
          return this.$store.getters.getPicnic(this.id)
        },
        isRegistered () {
          return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
        },
        isCreator () {
          if (!this.isRegistered) {
            return false
          }
          return this.$store.getters.getUser.id === this.picnic.creatorId
        },
        loading () {
          return this.$store.getters.getLoading
        }
      }
    }
</script>