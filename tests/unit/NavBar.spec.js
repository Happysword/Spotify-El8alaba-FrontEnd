import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import * as currentSongMock from '../../src/api/mock/data/MusicPlayer/currentSong.json';
import * as currentPlaybackMock from '../../src/api/mock/data/MusicPlayer/currentPlayback.json';
import NavBar from '../../src/components/NavBar.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);
localVue.use(Vuex);

const user = { data: { id: '123456', type: 'artist' } };
localStorage.setItem('currentUser', JSON.stringify(user));

const vuetify = new Vuetify();
const router = new VueRouter();
const store = new Vuex.Store({
  state: {
    MusicPlayer: {
      isMute: false,
      currentBufferPerc: 0,
      lastVolrecord: 50,
      isPlaying: false,
      currentSongTime: '0:00',
      currentSong: currentSongMock[0],
      currentPlayback: currentPlaybackMock[0],
      currentList: [currentSongMock[0], currentSongMock[0]],
      currentSongIndexinList: 0,
      AudioPlayer: Audio,
      adTime: false,
      currentQueue: [],
    },
    userPlaylists: {},
  },
  mutations: {
    setCurrentUser() {},
  },
  actions: {
    toggleSound({ state }) {
      state.MusicPlayer.isMute = !state.MusicPlayer.isMute;
    },
    togglePlayact({ state }) {
      state.MusicPlayer.isPlaying = !state.MusicPlayer.isPlaying;
    },
    playNewSong() {},
  },
});


describe('NavBar.vue', () => {
  test('Data to be correct on mounted', () => {
    const wrapper = mount(NavBar, {
      localVue,
      vuetify,
      router,
      store,
    });

    const { createdPlaylistName } = wrapper.vm.$data;
    const { drawer } = wrapper.vm.$data;

    expect(createdPlaylistName).toEqual('');
    expect(drawer).toEqual(true);
  });

  test('All main items in Navbar exists on mounted', () => {
    const wrapper = mount(NavBar, {
      localVue,
      vuetify,
      router,
      store,
    });

    expect(wrapper.find('#logo').exists()).toEqual(true);
    expect(wrapper.find('#mainLinks').exists()).toEqual(true);
    expect(wrapper.find('#createPlaylist').exists()).toEqual(true);
    expect(wrapper.find('#likedSongs').exists()).toEqual(true);
  });

  test('Create new playlist works', async () => {
    const wrapper = mount(NavBar, {
      localVue,
      vuetify,
      router,
      store,
    });

    const createPlaylist = wrapper.find('#createPlaylist');
    expect(createPlaylist.exists()).toEqual(true);

    const createNewPlaylist = wrapper.find('#createNewPlaylist');
    expect(createNewPlaylist.exists()).toEqual(false);
  });

  test('Fetch userplaylist works', () => {
    const wrapper = mount(NavBar, {
      localVue,
      vuetify,
      router,
      store,
    });

    const playlistsJson = wrapper.vm.$data.playlists;
    expect(playlistsJson).toMatchObject({});

    wrapper.vm.fetchUserPlaylists();

    wrapper.vm.$nextTick(() => {
      expect(playlistsJson).toMatchObject({});
    });
  });

  /* test('Create playlist works', () => {
    const wrapper = mount(NavBar, {
      localVue,
      vuetify,
      router,
      store,
    });

    const playlistsJson = wrapper.vm.$data.playlists;
    expect(playlistsJson).toMatchObject({});

    wrapper.vm.createNewPlaylist();

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.createdPlaylistName).toEqual('');
    });
  }); */
});
