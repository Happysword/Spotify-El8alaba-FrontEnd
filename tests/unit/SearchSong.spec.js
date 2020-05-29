import { shallowMount, createLocalVue } from '@vue/test-utils';
import vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import SearchSong from '../../src/components/SearchSong.vue';
import * as currentSongMock from '../../src/api/mock/data/MusicPlayer/currentSong.json';
import * as currentPlaybackMock from '../../src/api/mock/data/MusicPlayer/currentPlayback.json';

describe('SearchSong.vue', () => {
  Vue.use(vuetify);
  const localVue = createLocalVue();
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
  test('renders a vue instance', () => {
    const wrapper = shallowMount(SearchSong, {
      propsData: {
        track: currentSongMock[0].track,
      },
      localVue,
      store,
      router,
    });
    expect(wrapper.isVueInstance()).toBe(true);
  });
  test('test album routing', () => {
    const wrapper = shallowMount(SearchSong, {
      propsData: {
        track: currentSongMock[0],
      },
      localVue,
      store,
      router,
    });
    wrapper.vm.clickSong();
    expect(wrapper.vm.$route.path).toBe('/album/test');
  });
  test('test checkSong', () => {
    const wrapper = shallowMount(SearchSong, {
      propsData: {
        track: currentSongMock[0].track,
      },
      localVue,
      store,
      router,
    });
    expect(wrapper.vm.showPlayButton).toBe(true);
    wrapper.vm.playSong();
    wrapper.vm.$store.state.MusicPlayer.isPlaying = true;
  });
  test('test checkSong 2 ', () => {
    const wrapper = shallowMount(SearchSong, {
      propsData: {
        track: currentSongMock[0].track,
      },
      localVue,
      router,
      store: {
        state: {
          MusicPlayer: {
            isPlaying: true,
            ID: '123',
            currentSong: currentSongMock[0],
          },
        },
      },
    });
    wrapper.vm.showPlayButton = false;
    wrapper.vm.playSong();
    expect(wrapper.vm.showPlayButton).toBe(true);
  });
  test('test musicPlayerSongID', () => {
    const wrapper = shallowMount(SearchSong, {
      propsData: {
        track: currentSongMock[0].track,
      },
      localVue,
      router,
      store: {
        state: {
          MusicPlayer: {
            isPlaying: true,
            ID: '123',
            currentSong: null,
          },
        },
      },
    });
    wrapper.vm.$watch('musicPlayerSongID', () => {
      console.log(wrapper.vm.$store.state.MusicPlayer.ID);
    });
  });
});
