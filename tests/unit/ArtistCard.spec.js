import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as currentSongMock from '../../src/api/mock/data/MusicPlayer/currentSong.json';
import * as currentPlaybackMock from '../../src/api/mock/data/MusicPlayer/currentPlayback.json';

import ArtistCard from '../../src/components/ArtistCard.vue';
// import G from '@/api/mock/data/genres.json';
// import Client from '@/api/mock';
Vue.use(Vuex);

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

describe('ArtistCard.vue', () => {
  Vue.use(Vuetify);
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(VueRouter);
  localVue.use(Vuex);
  const router = new VueRouter();


  test('All default data are correct', () => {
    const wrapper = shallowMount(ArtistCard, {
      localVue,
      router,
      store,
    });
    const { showActionButton } = wrapper.vm.$data;
    const { showPlayButton } = wrapper.vm.$data;
    const { snackbar } = wrapper.vm.$data;
    const item0 = wrapper.vm.$data.items[0].title;
    const item2 = wrapper.vm.$data.items[2].title;

    expect(showActionButton).toEqual(false);
    expect(showPlayButton).toEqual(true);
    expect(snackbar).toEqual(false);
    expect(item0).toEqual('Start Radio');
    expect(item2).toEqual('Copy link');
  });

  test('Test menu logic artist not following', () => {
    const wrapper = shallowMount(ArtistCard, {
      propsData: {
        type: 'playlist',
      },
      store,
      data() {
        return {
          isFollowing: false,
        };
      },
    });

    wrapper.vm.menuLogic(1);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.$data.isFollowing).toEqual(true);
    });
  });

  test('Test menu logic artist following', () => {
    const wrapper = shallowMount(ArtistCard, {
      propsData: {
        type: 'playlist',
      },
      store,
      data() {
        return {
          isFollowing: true,
        };
      },
    });

    wrapper.vm.menuLogic(1);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.$data.isFollowing).toEqual(false);
    });
  });

  test('Test fetch follow status', () => {
    const wrapper = shallowMount(ArtistCard, {
      propsData: {
        type: 'playlist',
      },
      store,
      data() {
        return {
          isFollowing: true,
        };
      },
    });

    wrapper.vm.fetchFollowStatus();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.$data.isFollowing).toEqual(true);
    });
  });
});
