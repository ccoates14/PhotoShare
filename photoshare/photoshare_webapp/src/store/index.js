import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPhotoGrid: [],
    submitPhotoForm: false,
    login: false,
    signup: false,
    baseApiUrl: 'http://localhost:3000/api/',
    user: {
      username: null,
      accessToken: null,
    },
  },
  mutations: {
    updateCurrentPhotoGrid(state, newPhotoGrid) {
      state.currentPhotoGrid = newPhotoGrid;
    },
    login(state, userData) {
      state.user.username = userData.username;
      state.user.accessToken = userData.accessToken;
    },
    logout(state){
      state.login = state.signup = false;
      state.user.username = state.user.accessToken = null;
    }
  },
  actions: {
    loadPhotoSearch({ commit }, searchTerm) {
      //this will be updated later to make an actual api call
      searchTerm;
      let photos = [];

      for (let i = 0; i < 10; i++) {
        photos.push('https://source.unsplash.com/random');
      }

      commit('updateCurrentPhotoGrid', photos);
    },
    login({ commit, state }, loginData) {
      return new Promise((resolve, reject) => {
        axios
          .post(state.baseApiUrl + 'auth/signin', loginData)
          .then(r => {
            commit('login', {
              username: loginData.username,
              accessToken: r.data.accessToken,
            });
            resolve();
            console.log(r);
          })
          .catch(err => {
            console.log(err);
            alert('Bad Login!');
            reject();
          });
      });
    },
    signUp({ state, dispatch }, signUpData) {
      return new Promise((resolve, reject) => {
        axios
          .post(state.baseApiUrl + 'auth/signup', signUpData)
          .then(() => {
            dispatch('login', signUpData).then(() => {
              resolve();
            }).catch(() => {
              reject();
            });
          })
          .catch(err => {
            console.log(err);
            alert('Uh oh! We are having technical difficulties so sorry!');
            reject();
          });
      });
    },
    logout({commit}){
      commit('logout');
    }
  },
  modules: {},
});
