<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  src="https://timedotcom.files.wordpress.com/2014/09/201410_bpl_24rockville.jpg"
                  height="200px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0 white--text">My Picnic</h3>
                    <div>July 6, 1999</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat to="/picnics/1"><v-icon left> arrow_forward</v-icon>View Picnic</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
