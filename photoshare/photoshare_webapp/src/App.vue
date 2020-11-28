<template>
  <v-app v-scroll="scroll">
    <v-app-bar app color="white" height="125">
      <v-col>
        <v-row> <h4 v-if="$store.state.user.username">Welcome {{$store.state.user.username}}</h4></v-row>
        <v-row>
          <div class="d-flex align-center">
           
            <br> 
            <h1 @click="searchPhotos('loadAll')">PhotoShare</h1>
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
            <v-btn color="blue" class="ml-3" @click="!(searchTerm) ? searchPhotos('loadAll') : searchPhotos()">Search</v-btn>
            <v-btn color="grey" class="ml-3" :disabled="($store.state.user.accessToken)" @click="$store.state.login=true">Login</v-btn>
            <v-btn color="grey" class="ml-3" :disabled="!($store.state.user.accessToken)" @click="$store.dispatch('logout')">Log out</v-btn>
            <v-btn color="grey" class="ml-3" :disabled="!($store.state.user.accessToken)" @click="$store.dispatch('searchUsersPhotos')">My Photos</v-btn>
            <v-btn color="grey" class="ml-3" :disabled="!($store.state.user.accessToken)" @click="$store.state.submitPhotoForm=true">Submit Photo</v-btn>

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
  computed: {
    
  },
  methods:{
    searchPhotos(search=null){
      this.$store.dispatch('loadPhotoSearch', search == null ? this.searchTerm : search);
    },
     getDocHeight() {
      var D = document;
      return Math.max(
        D.body.scrollHeight,
        D.documentElement.scrollHeight,
        D.body.offsetHeight,
        D.documentElement.offsetHeight,
        D.body.clientHeight,
        D.documentElement.clientHeight
      );
    },
    amountScrolled() {
      var winheight =
        window.innerHeight ||
        (document.documentElement || document.body).clientHeight;
      var docheight = this.getDocHeight();
      var scrollTop =
        window.pageYOffset ||
        (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
      var trackLength = docheight - winheight;
      var pctScrolled = Math.floor((scrollTop / trackLength) * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
      return pctScrolled;
    },
    scroll(){
  
      const percentageScrolledBeforeLoad = 65;
      if (this.amountScrolled() > percentageScrolledBeforeLoad){
        this.$store.dispatch('loadPhotoSearch');
      }
    },
   
  },
  created(){
    this.$store.dispatch('loadAll');
  }

};
</script>
