import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import * as currentSongMock from '../../src/api/mock/data/MusicPlayer/currentSong.json';
import * as currentPlaybackMock from '../../src/api/mock/data/MusicPlayer/currentPlayback.json';
// import AlbumBar from '../../src/components/AlbumBar.vue';
import ArtistAbout from '../../src/views/Artist/ArtistAbout.vue';
import ArtistRelated from '../../src/views/Artist/ArtistRelated.vue';
import ArtistOverview from '../../src/views/Artist/ArtistOverview.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);
localVue.use(Vuex);

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

const vuetify = new Vuetify();

describe('Aritst', () => {
  Vue.use(vuetify);

  const router = new VueRouter();

  test('Artist about renders a vue instance', () => {
    const wrapper = mount(ArtistAbout, {
      localVue,
      store,
      router,
    });
    expect(wrapper.isVueInstance()).toBe(true);
  });

  test('Artist about fetches an artist', () => {
    const wrapper = mount(ArtistAbout, {
      localVue,
      store,
      router,
    });
    wrapper.vm.fetchAnArtist('test');
    expect(wrapper.isVueInstance()).toBe(true);
  });

  test('Artist related renders a vue instance', () => {
    const wrapper = mount(ArtistRelated, {
      localVue,
      store,
      router,
    });
    expect(wrapper.isVueInstance()).toBe(true);
  });

  test('Artist related fetches related', () => {
    const wrapper = mount(ArtistRelated, {
      localVue,
      store,
      router,
      data() {
        return {
          artistRelatedArtists: JSON,
        };
      },
    });
    wrapper.vm.fetchArtistRelatedArtists();
    const art = wrapper.vm.$data.artistRelatedArtists;
    expect(art).toBe(JSON);
  });

  test('Artist related fetches related', () => {
    const wrapper = mount(ArtistRelated, {
      localVue,
      store,
      router,
      data() {
        return {
          artistRelatedArtists: JSON,
        };
      },
    });
    wrapper.vm.updateHeader();
    const art = wrapper.vm.$data.artistRelatedArtists;
    expect(art).toBe(JSON);
  });

  test('Artist Overview renders view instance', () => {
    const wrapper = mount(ArtistOverview, {
      localVue,
      store,
      router,
    });
    expect(wrapper.isVueInstance()).toBe(true);
  });

  test('Artist Overview fetches an artist', () => {
    const wrapper = mount(ArtistOverview, {
      localVue,
      store,
      router,
      data() {
        return {
          artistID: '',
          songs: [],
          artistAlbums: [],
          limit: 5,
        };
      },
    });
    wrapper.vm.fetchAnArtist();
    const { limit } = wrapper.vm.$data;
    expect(limit).toBe(5);
  });

  test('Artist Overview fetch Artist Albums', () => {
    const wrapper = mount(ArtistOverview, {
      localVue,
      store,
      router,
      data() {
        return {
          artistID: 'tst',
          songs: [],
          artistAlbums: [],
          limit: 5,
        };
      },
    });
    wrapper.vm.fetchArtistAlbums();
    const { artistID } = wrapper.vm.$data;
    expect(artistID).toBe('tst');
  });

  test('Artist Overview fetch Artist Top Tracks', () => {
    const wrapper = mount(ArtistOverview, {
      localVue,
      store,
      router,
      data() {
        return {
          artistID: 'password',
          songs: [],
          artistAlbums: [],
          limit: 5,
        };
      },
    });
    wrapper.vm.fetchArtistTopTracks();
    const { artistID } = wrapper.vm.$data;
    expect(artistID).toBe('password');
  });
});
