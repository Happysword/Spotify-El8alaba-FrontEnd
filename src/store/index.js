import Vue from 'vue';
import Vuex from 'vuex';
import * as currentSongMock from '../api/mock/data/MusicPlayer/currentSong.json';
import * as currentPlaybackMock from '../api/mock/data/MusicPlayer/currentPlayback.json';
import PlayerRequests from './modules/MusicPlayer/Requests';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: { username: 'Spotify user' },
    searching: false,
    InputSearch: '',
    liked: false,
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
    ],
    MusicPlayer: {
      isMute: false,
      isPlaying: false,
      currentSong: currentSongMock[0],
      currentPlayback: currentPlaybackMock[0],
      currentList: {},
    },
  },

  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    changeLiked() {
      this.state.liked = !this.state.liked;
    },
    toggleSound(state) {
      state.MusicPlayer.isMute = !state.MusicPlayer.isMute;
    },
    togglePlay(state) {
      state.MusicPlayer.isPlaying = !state.MusicPlayer.isPlaying;
    },
  },

  getters: {
    getisPlaying: (state) => state.MusicPlayer.isPlaying,
  },

  actions: {
    async togglePlayact({ commit, getters }) {
      if (getters.getisPlaying) {
        const requestAnswer = await PlayerRequests.pausePlayback();
        if (requestAnswer) {
          commit('togglePlay');
        }
      } else {
        const requestAnswer = await PlayerRequests.startPlayback();
        if (requestAnswer) {
          commit('togglePlay');
        }
      }
    },
  },
  modules: {},
});
