<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="primary--text">Create a Picnic</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="createPicnic">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                :rules="[rules.required]"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                :rules="[rules.required]"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="description"
                :rules="[rules.required]"
                required>
              </v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              label="Image"
              readonly
              single-line
              value="Image"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn depressed round class="primary" @click="onUploadFile">Upload Image</v-btn>
              <input type="file" style="display: none" ref="inputFile" accept="image/*" @change="onPickImage">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="200px">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              label="DateTime"
              readonly
              single-line
              value="Date and Time"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="mb-2">
            <v-flex xs12 sm6 offset-sm3 style="text-align: center">
              <v-date-picker v-model="date" class="mb-3"></v-date-picker>
              <v-time-picker v-model="time"></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn round depressed class="primary" :disabled="!formIsValid" type="submit">Create Picnic</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      const currDate = new Date()
      return {
        rules: {
          required: value => !!value || 'Required.'
        },
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        date: currDate.toISOString().substring(0, currDate.toISOString().indexOf('T')),
        time: currDate,
        image: null
      }
    },
    computed: {
      formIsValid () {
        return this.title.trim() !== '' &&
          this.location.trim() !== '' &&
          this.imageUrl.trim() !== '' &&
          this.description.trim() !== ''
      },
      formatDateTime () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          const hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      }
    },
    methods: {
      createPicnic () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        const picnicData = {
          title: this.title,
          location: this.location,
          image: this.image,
          description: this.description,
          date: this.formatDateTime
        }
        this.$store.dispatch('createPicnic', picnicData)
        this.$router.push('/picnics')
      },
      onUploadFile () {
        this.$refs.inputFile.click()
      },
      onPickImage (event) {
        const imgs = event.target.files
        let img = imgs[0]
        let imgname = img.name
        if (imgname.lastIndexOf('.') <= 0) {
          return alert('Invalid image file.')
        }
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          this.imageUrl = reader.result
        })
        reader.readAsDataURL(img)
        this.image = img
      }
    }
  }
</script>