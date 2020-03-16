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
    playListName: 'Liked Songs',
    liked: false,
    numberOfLikedSongs: '10',
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
    ],
  },

  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    changeLiked() {
      this.state.liked = !this.state.liked;
    },
  },

  actions: {},
  modules: {},
});
