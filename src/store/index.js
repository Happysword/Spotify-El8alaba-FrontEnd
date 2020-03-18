import Vue from 'vue';
import Vuex from 'vuex';
import * as currentSongMock from '../api/mock/data/MusicPlayer/currentSong.json';
import * as currentPlaybackMock from '../api/mock/data/MusicPlayer/currentPlayback.json';
import PlayerRequests from './modules/MusicPlayer/Requests';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {},
    searching: false,
    InputSearch: '',
    styling: ['rgba(66,17,121,1)', 'rgba(143,0,0,1)'],
    // styling: ['rgba(66,17,121,1)', 'rgba(143,0,0,1)'],
    // playlistImg: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
    // playlistImg:
    // 'https://i.scdn.co/image/ab67706f00000002aa93fe4e8c2d24fc62556cba',
    // playListName: 'Liked Songs',
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
    },
    currentSong: {},
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
