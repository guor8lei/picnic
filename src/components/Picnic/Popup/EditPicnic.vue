<template>
  <v-dialog persistent width="350px" v-model="showDialog">
    <v-btn depressed fab slot="activator" color="accent">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="headline primary--text">Edit Picnic</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="newTitle"
                :rules="[rules.required]"
                required>
              </v-text-field>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="newLocation"
                :rules="[rules.required]"
                required>
              </v-text-field>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="newDescription"
                :rules="[rules.required]"
                required>
              </v-textarea>
              <v-text-field
              label="DateTime"
              readonly
              single-line
              value="Date and Time"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="mb-3">
          <v-flex xs12>
            <v-date-picker v-model="newDate" style="width: 100%"></v-date-picker>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="newTime" style="width: 100%"></v-time-picker>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn color="red darken-1" flat round style="width: 100%" @click.native="onClose">Cancel</v-btn>
              <v-btn color="red darken-1" flat round style="width: 100%" :disabled="!formIsValid" @click.native="onEdit">Save</v-btn>
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
        rules: {
          required: value => !!value || 'Required.'
        },
        newTitle: this.picnic.title,
        newDescription: this.picnic.description,
        newLocation: this.picnic.location,
        showDialog: false,
        newDate: this.picnic.date.substring(0, this.picnic.date.indexOf('T')),
        newTime: new Date(this.picnic.date)
      }
    },
    methods: {
      onEdit () {
        if (this.newTitle.trim() === '' || this.newTitle.trim() === '' || this.newLocation.trim() === '') {
          return
        }
        this.showDialog = false
        const newDate = new Date(this.picnic.date)
        const newDay = new Date(this.newDate).getUTCDate()
        const newMonth = new Date(this.newDate).getUTCMonth()
        const newYear = new Date(this.newDate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        if (typeof this.newTime === 'string') {
          const hours = this.newTime.match(/^(\d+)/)[1]
          const minutes = this.newTime.match(/:(\d+)/)[1]
          newDate.setHours(hours)
          newDate.setMinutes(minutes)
        } else {
          newDate.setHours(this.newTime.getHours())
          newDate.setMinutes(this.newTime.getMinutes())
        }
        this.$store.dispatch('updatePicnic', {
          id: this.picnic.id,
          title: this.newTitle,
          description: this.newDescription,
          location: this.newLocation,
          date: newDate.toISOString()
        })
      },
      onClose () {
        this.showDialog = false
        this.newDate = this.picnic.date.substring(0, this.picnic.date.indexOf('T'))
        this.newTitle = this.picnic.title
        this.newDescription = this.picnic.description
        this.newLocation = this.picnic.location
        this.newTime = new Date(this.picnic.date)
      }
    },
    computed: {
      formIsValid () {
        return this.newTitle.trim() !== '' &&
          this.newDescription.trim() !== '' &&
          this.newLocation.trim() !== ''
      }
    }
  }
</script>