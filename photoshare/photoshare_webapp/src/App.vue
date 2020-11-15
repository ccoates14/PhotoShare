<template>
  <v-app>
    <v-app-bar app color="white" height="125">
      <v-col>
        <v-row> <h4 v-if="$store.state.user.username">Welcome {{$store.state.user.username}}</h4></v-row>
        <v-row>
          <div class="d-flex align-center">
           
            <br> 
            <h1>PhotoShare</h1>
            <div class="ml-5">
              <v-text-field
                clearable
                flat
                solo-inverted
                hide-details
                label="Search"
                dense
                v-model="searchTerm"
              ></v-text-field>
            </div>
            <v-btn color="blue" class="ml-3" @click="searchPhotos()">Search</v-btn>
            <v-btn color="grey" class="ml-3" @click="$store.state.login=true">Login</v-btn>
            <v-btn color="grey" class="ml-3" @click="$store.dispatch('logout')">Log out</v-btn>
            <v-btn color="grey" class="ml-3" >My Photos</v-btn>
            <v-btn color="grey" class="ml-3" @click="$store.state.submitPhotoForm=true">Submit Photo</v-btn>

          </div>
        </v-row>
        <v-row class="mt-2">
          <v-btn color="blue lighten-2" small @click="searchTerm='wallpapers';searchPhotos()">Wallpapers</v-btn>
          <v-btn color="deep-purple lighten-3" class="ml-3" small @click="searchTerm='nature';searchPhotos()">Nature</v-btn>
          <v-btn color="indigo accent-1" class="ml-3" small @click="searchTerm='people';searchPhotos()">People</v-btn>
          <v-btn color="cyan lighten-5" class="ml-3" small @click="searchTerm='architecture';searchPhotos()">Architecture</v-btn>
          <v-btn color="green" class="ml-3" small @click="searchTerm='fashion';searchPhotos()">Fasion</v-btn>
          <v-btn color="orange lighten-2" class="ml-3" small @click="searchTerm='film';searchPhotos()">Film</v-btn>
        </v-row>
      </v-col>
    </v-app-bar>

    <v-main>
      <submit-photo-form></submit-photo-form>
      <login></login>
      <signup></signup>
      <photo-grid></photo-grid>  

    </v-main>
  </v-app>
</template>

<script>
import PhotoGrid from '@/components/PhotoGrid';
import SubmitPhotoForm from '@/components/SubmitPhotoForm';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
export default {
  name: 'App',

  components: {PhotoGrid, SubmitPhotoForm, Login, Signup},

  data: () => ({
    searchTerm: ''
  }),
  methods:{
    searchPhotos(){
      this.$store.dispatch('loadPhotoSearch', this.searchTerm);
    }
  }
};
</script>
