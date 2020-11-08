import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPhotoGrid: [
  ],
    submitPhotoForm: false,
    login: false,
    signup: false
  },
  mutations: {
    updateCurrentPhotoGrid(state, newPhotoGrid){
      state.currentPhotoGrid = newPhotoGrid;
    }
  },
  actions: {
    loadPhotoSearch({commit}, searchTerm){
      //this will be updated later to make an actual api call
      searchTerm
      let photos = [];

      for (let i = 0; i < 10; i++){
        photos.push('https://source.unsplash.com/random');
      }

      commit('updateCurrentPhotoGrid', photos);
    }
  },
  modules: {
  }
})
