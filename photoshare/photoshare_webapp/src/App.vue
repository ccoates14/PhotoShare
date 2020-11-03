<template>
  <v-app>
    <v-app-bar app color="white" height="125">
      <v-col>
        <v-row>
          <div class="d-flex align-center">
            <h1>PhotoShare</h1>
            <div class="ml-5">
              <v-text-field
                clearable
                flat
                solo-inverted
                hide-details
                label="Search"
                dense
              ></v-text-field>
            </div>

            <v-btn color="grey" class="ml-3">Login</v-btn>
            <v-btn color="grey" class="ml-3">Log out</v-btn>
            <v-btn color="grey" class="ml-3">My Photos</v-btn>
            <v-btn color="grey" class="ml-3">Submit Photo</v-btn>
          </div>
        </v-row>
        <v-row class="mt-2">
          <v-btn color="blue lighten-2" small>Wallpapers</v-btn>
          <v-btn color="deep-purple lighten-3" class="ml-3" small>Nature</v-btn>
          <v-btn color="indigo accent-1" class="ml-3" small>People</v-btn>
          <v-btn color="cyan lighten-5" class="ml-3" small>Architecture</v-btn>
          <v-btn color="green" class="ml-3" small>Fasion</v-btn>
          <v-btn color="orange lighten-2" class="ml-3" small>Film</v-btn>
        </v-row>
      </v-col>
    </v-app-bar>

    <v-main>
      <photo-grid></photo-grid>  
    </v-main>
  </v-app>
</template>

<script>
import PhotoGrid from '@/components/PhotoGrid'
export default {
  name: 'App',

  components: {PhotoGrid},

  data: () => ({
    //
  }),
};
</script>
