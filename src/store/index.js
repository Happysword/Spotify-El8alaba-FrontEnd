import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {},
    searching: false,
    styling: ['rgba(66,17,121,1)', 'rgba(143,0,0,1)'],
    // playlistImg: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
    playlistImg:
      'https://i.scdn.co/image/ab67706f00000002aa93fe4e8c2d24fc62556cba',
    play: false,
    playListName: 'Liked Songs',
    liked: false,
    numberOfLikedSongs: '95',
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
    ],
    MusicPlayer: {
      isMute: false,
      volume: 70,
      isPlaying: false,
      currentSong: {
        image:
          'https://i.scdn.co/image/ab67706f000000021cb21db1932b5c9139bbf136',
        name: 'Mock Song',
        albumId: '3jdskfn3k3jj3nknk2',
        artist: 'Test Artist',
        artistId: 'jjd3jhjh234ug543hhj',
      },
    },
  },

  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    changePlay() {
      this.state.play = !this.state.play;
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

  actions: {},
  modules: {},
});
