<template>
  <div>
    <v-dialog v-model="$store.state.submitPhotoForm" max-width="600px">
      <template>
        <v-card>
          <v-card-title>
            <span class="headline">Photo Submit</span>
          </v-card-title>

          <v-card-actions>
            <v-file-input accept="image/*" label="File input" multiple></v-file-input>
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
              @click="$store.state.submitPhotoForm = false"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({}),
};
</script>
