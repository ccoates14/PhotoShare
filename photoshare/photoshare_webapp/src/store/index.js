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
    currentSearchTerm: null,
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
    logout(state) {
      state.login = state.signup = false;
      state.user.username = state.user.accessToken = null;
    },
  },
  actions: {
    loadPhotoSearch({ commit, state }, searchTerm) {
      //this will be updated later to make an actual api call
      state.currentSearchTerm = searchTerm;
      let photos = [];
      let limit = 20;
      let offset = 0; 

      axios.get(state.baseApiUrl + 'photos/?limit=' + limit + '&offset=' + offset + '&query=' + searchTerm).then(r => {
        console.log(r);
        r.data.forEach(i => {
          photos.push(i);
          commit('updateCurrentPhotoGrid', photos);
        });
      }).catch(err => {
        console.log(err);
      });

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
            dispatch('login', signUpData)
              .then(() => {
                resolve();
              })
              .catch(() => {
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
    logout({ commit }) {
      commit('logout');
    },
    async searchUsersPhotos({state}){
      const username = state.user.username;

      if (username){
        axios.get(state.baseApiUrl + 'photos/username/' + username).then(r => {
          state.currentPhotoGrid = r.data;
        }).catch(err => {
          console.log(err);
        });
      }
    },

    async submitPhotos({ state }, files) {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        files.forEach(f => {
          formData.append('images', f);
        });

        axios.post(state.baseApiUrl + 'users/submitPhotos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${state.user.accessToken}`,
          },
        }).then(r => {
          resolve(r);
        }).catch(e => {
          reject(e);
        })
      });
    },
  },
  modules: {},
});
