<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 class="text-xs-center"></a>
        <h1 class="primary--text">Joined Picnics</h1>
      </v-flex>
    </v-layout>
    <v-layout>
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
    <v-layout row wrap  v-for="picnic in picnics" :key="picnic.id" class="mb-3" v-if="!loading">
      <v-flex xs12 sm10 offset-sm1>
        <v-card class="accent">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  :src="picnic.imageUrl"
                  height="200px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9 class="mb-4">
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0 white--text"> {{ picnic.title }}</h3>
                    <div> {{ picnic.date | date }} </div>
                    <div> {{ picnic.description }} </div>
                  </div>
                </v-card-title>
                <v-card-actions style="bottom: 5px; position: absolute; right: 5px">
                  <v-btn depressed round :to="'/picnics/' + picnic.id" class="primary"><v-icon left> arrow_forward</v-icon>Details</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      picnics () {
        const picnicIds = this.$store.getters.getUserPicnics
        let userPicnics = []
        for (let id in picnicIds) {
          userPicnics.push(this.$store.getters.getPicnic(picnicIds[id]))
        }
        return userPicnics
      },
      loading () {
        return this.$store.getters.getLoading
      }
    }
  }
</script>