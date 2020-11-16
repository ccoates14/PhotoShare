<template>
  <div>
    <v-dialog v-model="$store.state.submitPhotoForm" max-width="600px">
      <template>
        <v-card>
          <v-card-title>
            <span class="headline">Photo Submit</span>
          </v-card-title>

          <v-card-actions>
            <v-file-input
              accept="image/*"
              label="File input"
              multiple
              v-model="files"
            ></v-file-input>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="$store.state.submitPhotoForm = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              :disabled="!files"
              @click="submitPhotos"
            >
              Submit
            </v-btn>
          </v-card-actions>
          <v-progress-linear
            v-if="loading"
            indeterminate
            color="red darken-2"
          ></v-progress-linear>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({
    files: null,
    loading: false,
  }),
  methods: {
    submitPhotos() {
      if (this.files) {
        this.loading = true;
        this.$store
          .dispatch('submitPhotos', this.files)
          .then(() => {
            this.$store.state.submitPhotoForm = false;
            alert('Success');
          })
          .catch(err => {
            console.log(err);
            alert('Pardon but there was an error with this upload!');
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
