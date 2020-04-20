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
      volumePercent: 100,
      isPlaying: false,
      currentSongTime: '0:00',
      ID: '',
      currentSong: currentSongMock[0],
      currentPlayback: currentPlaybackMock[0],
      AudioPlayer: new Audio('http://soundbible.com/grab.php?id=2108&type=wav'),
      navBarImage: false,
      currentList: [currentSongMock[0]],
      currentQueue: [],
      currentSongIndexinList: 0,
    },
    prevRoute: '',
  },

  mutations: {
    /**
     * Sets the Current user to the Store
     * @param {*} state the State of the Store
     * @param {*} user The User Object to be Set
     */
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    /**
     * Toggles the Liked State
     */
    changeLiked() {
      this.state.liked = !this.state.liked;
    },
    /**
     * Toggles the Sound of the Player On or Off
     * @param {*} state The State of the Store
     */
    toggleSound(state) {
      state.MusicPlayer.isMute = !state.MusicPlayer.isMute;
    },
    /**
     * Toggles the Playback State of the Player
     * @param {*} state The State of the Store
     */
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
