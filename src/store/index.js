import Vue from 'vue';
import Vuex from 'vuex';
import * as currentSongMock from '../api/mock/data/MusicPlayer/currentSong.json';
import * as currentPlaybackMock from '../api/mock/data/MusicPlayer/currentPlayback.json';
import PlayerActions from './modules/MusicPlayer/StoreActions';

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
      isFirstPlay: true,
      isMute: false,
      currentBufferPerc: 0,
      lastVolrecord: 100,
      isPlaying: false,
      currentSongTime: '0:00',
      currentSong: currentSongMock[0],
      currentPlayback: currentPlaybackMock[0],
      AudioPlayer: Audio,
      navBarImage: false,
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

  actions: { ...PlayerActions },
  modules: {},
});
