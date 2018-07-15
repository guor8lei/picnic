<template>
  <v-container>
    <v-layout row wrap  v-for="picnic in picnics" :key="picnic.id" class="mb-3">
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
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0 white--text"> {{ picnic.title }}</h3>
                    <div> {{ picnic.date | date }} </div>
                    <div> {{ picnic.description }} </div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn depressed round :to="'/picnics/' + picnic.id" class="primary"><v-icon left> arrow_forward</v-icon>View Picnic</v-btn>
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
        return this.$store.getters.getPicnics
      }
    }
  }
</script>