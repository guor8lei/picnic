<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 sm6 class="text-sm-right text-xs-center"></a>
        <v-btn large to="/picnics" class="info"></a>View Picnics</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-sm-left text-xs-center">
        <v-btn large to="/picnic/new" class="info"></a>Create Picnic</v-btn>
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
    <v-layout row wrap v-if="!loading">
      <v-flex xs12>
        <v-carousel></a>
          <v-carousel-item 
          @click.native="loadPicnic(picnic.id)"
          style="cursor: pointer;"
          v-for="picnic in picnics"
          :key="picnic.id"
          :src="picnic.imageUrl">
            <div class="title">
              {{ picnic.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-3" v-if="!loading">
      <v-flex xs12 class="text-xs-center"></a>
        <p>Join now!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      picnics () {
        return this.$store.getters.getFeaturedPicnics
      },
      loading () {
        return this.$store.getters.getLoading
      }
    },
    methods: {
      loadPicnic (id) {
        this.$router.push('/picnics/' + id)
      }
    }
  }
</script>

<style scoped>
  .title {
    bottom: 50px;
    background-color: rgb(0,0,0,.5);
    color: white;
    font-size: 3em;
    padding: 10px;
    text-align: center;
  }
</style>