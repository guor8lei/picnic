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
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="newDescription"
                :rules="[rules.required]"
                required>
              </v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat round @click.native="showDialog = false">Cancel</v-btn>
              <v-btn color="red darken-1" flat round :disabled="!formIsValid" @click.native="onEdit">Save</v-btn>
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
        showDialog: false
      }
    },
    methods: {
      onEdit () {
        if (this.newTitle.trim() === '' || this.newTitle.trim() === '') {
          return
        }
        this.showDialog = false
        this.$store.dispatch('updatePicnic', {
          id: this.picnic.id,
          title: this.newTitle,
          description: this.newDescription
        })
      }
    },
    computed: {
      formIsValid () {
        return this.newTitle.trim() !== '' &&
          this.newDescription.trim() !== ''
      }
    }
  }
</script>