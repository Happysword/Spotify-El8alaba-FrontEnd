import vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { shallowMount } from '@vue/test-utils';
import AlbumBox from '../../src/components/AlbumBox.vue';
import * as currentSongMock from '../../src/api/mock/data/MusicPlayer/currentSong.json';
import * as currentPlaybackMock from '../../src/api/mock/data/MusicPlayer/currentPlayback.json';
// import albums from '../../src/api/mock/data/albumsInfo.json';

describe('AlbumBox.vue', () => {
  Vue.use(vuetify);
  Vue.use(Vuex);
  Vue.use(VueRouter);
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
        ID: 'test',
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
      playpauseplaylist() {},
    },
  });

  test('Checks the default data', () => {
    const wrapper = shallowMount(AlbumBox, {
      propsData: {
        albumID: '5m4VYOPoIpkV0XgOiRKkWC',
        albumName: '',
        albumImage: [],
      },
      store,
      router,
    });
    wrapper.vm.getSongsList();
    expect(wrapper.vm.overlay).toBe(false);
    expect(wrapper.vm.showPlayButton).toBe(true);
  });
  test('playAction function', () => {
    const wrapper = shallowMount(AlbumBox, {
      propsData: {
        albumID: 'test',
        albumName: 'testing',
        albumImage: [{
          url: 'TEST',
        }],
      },
      store,
      router,
    });
    wrapper.vm.playAction();
    expect(wrapper.vm.showPlayButton).toBe(false);
  });
  test('playAction function 2', () => {
    const wrapper = shallowMount(AlbumBox, {
      propsData: {
        albumID: '!test',
        albumName: 'testing',
        albumImage: [{
          url: 'TEST',
        }],
      },
      store,
      router,
    });
    wrapper.vm.playAction();
    expect(wrapper.vm.showPlayButton).toBe(false);
  });
  test('pauseAction function', () => {
    const wrapper = shallowMount(AlbumBox, {
      propsData: {
        albumID: 'test',
        albumName: 'testing',
        albumImage: [{
          url: 'TEST',
        }],
      },
      store,
      router,
    });
    wrapper.vm.pauseAction();
    expect(wrapper.vm.showPlayButton).toBe(true);
  });
});
