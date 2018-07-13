<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 sm6 class="text-sm-right text-xs-center"></a>
        <v-btn large to="/picnics" class="info"></a>Join Picnic</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-sm-left text-xs-center">
        <v-btn large to="/picnic/new" class="info"></a>Create Picnic</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item 
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
    <v-layout row wrap class="mt-3">
      <v-flex xs12 class="text-xs-center"></a>
        <p>Join now!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        picnics: [
          {
            imageUrl: 'https://timedotcom.files.wordpress.com/2014/09/201410_bpl_24rockville.jpg',
            id: 'agwebvwebaweba',
            title: 'Rockville, MD'
          },
          {
            imageUrl: 'http://52.24.98.51/wp-content/uploads/2017/06/berkeley-california-san-francisco.jpg',
            id: '23fn23lknlkn23lkn',
            title: 'Berkeley, CA'
          },
          {
            imageUrl: 'https://static.parade.com/wp-content/uploads/2017/09/washington-dc-travel-cars-ftr.jpg',
            id: 'absbsdasfasdfasdf',
            title: 'Washington, DC'
          }
        ]
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