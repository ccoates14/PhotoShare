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
    imageLoadingLimit: 10
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
    loadPhotoSearch({ commit, dispatch, state }, searchTerm) {
      if (searchTerm){
        if (searchTerm != state.currentSearchTerm){
          state.currentPhotoGrid = [];
        }

        state.currentSearchTerm = searchTerm;
      }

      if (state.currentSearchTerm == 'loadAll') {
        dispatch(state.currentSearchTerm);
        return;
      }

      let photos = [];
      let limit = state.imageLoadingLimit;
      let offset = state.currentPhotoGrid.length;

      axios.get(state.baseApiUrl + 'photos/?limit=' + limit + '&offset=' + offset + '&query=' + searchTerm).then(r => {
        console.log(r);
        r.data.forEach(i => {
          photos.push(i);
        });

        if ((photos.length == 0 && searchTerm != state.searchTerm) || photos.length > 0){
          commit('updateCurrentPhotoGrid', photos);
        }
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

    async loadAll({state}){
      state.currentSearchTerm = 'loadAll';
      const offset = state.currentPhotoGrid.length;
      const limit = state.imageLoadingLimit;

      return new Promise((resolve, reject) => {
        axios.get(state.baseApiUrl + 'photos/all/' + offset + "/" + limit).then(r => {
      
          r.data.forEach(l => {
            state.currentPhotoGrid.push(l);
          });

          resolve();
        }).catch(err => {
          console.log(err);
          reject();
        });
      });
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
