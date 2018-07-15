<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h1 class="primary--text"> {{ picnic.title }} </h1>
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
        }
      }
    }
</script>