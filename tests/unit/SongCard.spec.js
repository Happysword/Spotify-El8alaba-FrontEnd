import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import * as currentSongMock from '../../src/api/mock/data/MusicPlayer/currentSong.json';
import * as currentPlaybackMock from '../../src/api/mock/data/MusicPlayer/currentPlayback.json';
import SongCard from '../../src/components/SongCard.vue';


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

describe('SongCard.vue', () => {
  Vue.use(vuetify);

  test('renders a vue instance', () => {
    const wrapper = mount(SongCard, {
      localVue,
      store,
    });
    expect(wrapper.isVueInstance()).toBe(true);
  });

  test('All default data are correct', () => {
    const wrapper = mount(SongCard, {
      localVue,
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

  test('All components are loaded correct', () => {
    const wrapper = mount(SongCard, {
      localVue,
      store,
    });

    // expect(wrapper.find('#snackbarID').exists()).toEqual(true);
    expect(wrapper.find('#cardID').exists()).toEqual(true);
    // expect(wrapper.find('#imageID').exists()).toEqual(true);
    expect(wrapper.find('#nameID').exists()).toEqual(true);
  });

  test('Description exists if it is playlist', () => {
    const wrapper = mount(SongCard, {
      localVue,
      store,
      propsData: {
        type: 'playlist',
      },
      data() {
        return {
          showActionButton: false,
        };
      },
    });

    expect(wrapper.find('#descriptionID').exists()).toEqual(true);
  });

  test('Artist name exists if it is album', () => {
    const wrapper = mount(SongCard, {
      localVue,
      store,
      propsData: {
        type: 'album',
      },
      data() {
        return {
          showActionButton: false,
        };
      },
    });

    expect(wrapper.find('#artistNameID').exists()).toEqual(true);
  });

  test('Test menu logic playlist not following', () => {
    const wrapper = mount(SongCard, {
      localVue,
      store,
      propsData: {
        type: 'playlist',
      },
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

  test('Test menu logic playlist following', () => {
    const wrapper = mount(SongCard, {
      localVue,
      store,
      propsData: {
        type: 'playlist',
      },
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

  test('Test menu logic album following', () => {
    const wrapper = mount(SongCard, {
      localVue,
      store,
      propsData: {
        type: 'album',
      },
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

  test('Test menu logic album not following', () => {
    const wrapper = mount(SongCard, {
      localVue,
      store,
      propsData: {
        type: 'album',
      },
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
});
