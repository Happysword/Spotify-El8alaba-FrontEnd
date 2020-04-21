// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import SongsBar from '@/components/SongsBar.vue';
import Requests from '../../src/store/modules/MusicPlayer/Requests';
import * as currentSongMock from '../../src/api/mock/data/MusicPlayer/currentSong.json';
import * as currentPlaybackMock from '../../src/api/mock/data/MusicPlayer/currentPlayback.json';
import EventBus from '../../src/EventBus';

// Components

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);
localVue.use(Vuex);

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
      AudioPlayer: new Audio('https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_5MG.mp3'),
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

describe('SongsBar.vue Component', () => {
  // Mount the component

  const wrapper = mount(SongsBar, {
    localVue,
    vuetify,
    router,
    store,
    Requests,
  });
  const data = wrapper.vm.$data;

  test('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  test('Check Event Bus', () => {
    EventBus.$emit('changePlay');
    expect(data.showIcon).toEqual('mdi-music-note-outline');
    expect(data.songIcon).toEqual('mdi-music-note-outline');
    expect(data.dotsIcon).toEqual('');
    expect(data.color).toEqual('grey');
    expect(data.color2).toEqual('white');
    expect(data.play).toEqual(false);

    EventBus.$emit('pause', true);
    expect(data.showIcon).toEqual('mdi-volume-high');
    expect(data.dotsIcon).toEqual('');
    expect(data.songIcon).toEqual('mdi-volume-high');
    expect(data.color).toEqual('#1ED760');
    expect(data.color2).toEqual('#1ED760');
    expect(data.play).toEqual(true);
    expect(wrapper.vm.$store.state.MusicPlayer.isPlaying).toBe(false);
    EventBus.$emit('pause', false);
  });

  test('All components are loaded', () => {
    expect(wrapper.find('#songBar').exists()).toEqual(true);
    expect(wrapper.find('#showIcon').exists()).toEqual(true);
    expect(wrapper.find('#songName').exists()).toEqual(true);
    expect(wrapper.find('#songInfo').exists()).toEqual(true);
    expect(wrapper.find('#dotsIcon').exists()).toEqual(true);
    expect(wrapper.find('#duration').exists()).toEqual(true);
  });

  test('All default data are correct', () => {
    expect(data.showIcon).toEqual('mdi-music-note-outline');
    expect(data.songIcon).toEqual('mdi-music-note-outline');
    expect(data.dotsIcon).toEqual('');
    expect(data.color).toEqual('grey');
    expect(data.color2).toEqual('white');
    expect(data.play).toEqual(false);
    const song = {
      track: {
        name: '',
        album: { name: '' },
        artists: [{ name: '' }],
        duration_ms: 0,
      },
    };
    expect(wrapper.vm.$props.song).toEqual(song);
  });

  test('Check for change icon at mouse over', async () => {
    // move mouse over the button and wait
    wrapper.find('#songBar').trigger('mouseover');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();

    expect(data.showIcon).toEqual('mdi-play');
    expect(data.dotsIcon).toEqual('mdi-dots-horizontal');
  });

  // test('Check for change icon at click', async () => {
  //   // Click the button and wait
  //   wrapper.find('#showIcon').trigger('click');
  //   await new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve('done');
  //     }, 50);
  //   });
  //   await wrapper.vm.$nextTick();

  //   wrapper.vm.changeicon(0);
  //   expect(data.play).toEqual(true);
  //   expect(data.showIcon).toEqual('mdi-pause');
  //   expect(data.dotsIcon).toEqual('mdi-dots-horizontal');
  //   expect(data.songIcon).toEqual('mdi-volume-high');
  //   expect(data.color).toEqual('#1ED760');
  //   expect(data.color2).toEqual('#1ED760');
  //   expect(wrapper.vm.$store.state.MusicPlayer.isPlaying).toBe(true);

  //   // Click the button and wait
  //   wrapper.find('#showIcon').trigger('click');
  //   await new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve('done');
  //     }, 50);
  //   });
  //   await wrapper.vm.$nextTick();
  //   wrapper.vm.changeicon(2);
  //   expect(data.showIcon).toEqual('mdi-play');
  //   expect(data.songIcon).toEqual('mdi-music-note-outline');
  //   expect(data.dotsIcon).toEqual('mdi-dots-horizontal');
  //   expect(data.color).toEqual('grey');
  //   expect(data.color2).toEqual('white');
  //   expect(data.play).toEqual(false);
  //   expect(wrapper.vm.$store.state.MusicPlayer.isPlaying).toBe(false);
  // });

  test('Check for change icon at mouse leave', async () => {
    wrapper.find('#songBar').trigger('mouseleave');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();

    expect(data.showIcon).toEqual('mdi-music-note-outline');
    expect(data.dotsIcon).toEqual('');
  });

  test('Check that dropdown list is existed after click at dots icon', async () => {
    expect(wrapper.find('#menu').exists()).toEqual(true);
    // Click the button and wait
    wrapper.find('#dotsIcon').trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('#menu').exists()).toEqual(true);
  });
});
