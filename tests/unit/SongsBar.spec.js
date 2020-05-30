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
    propsData: {
      song: currentSongMock[0],
    },
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
    wrapper.vm.$data.play = true;
    EventBus.$emit('pause', false);
    wrapper.vm.$data.play = false;
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
    expect(wrapper.vm.$props.song).toEqual(currentSongMock[0]);
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

  test('Check for change icon at click', async () => {
    wrapper.vm.$store.state.MusicPlayer.isPlaying = true;
    // Click the button and wait
    wrapper.find('#showIcon').trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();
    console.log(wrapper.vm.$store.state.MusicPlayer.currentSong.track.id);
    console.log(wrapper.vm.$store.state.MusicPlayer.isPlaying);
    console.log(wrapper.vm.$props.song.track.id);
    wrapper.vm.changeicon(2);
    expect(wrapper.vm.$data.play).toEqual(true);
    expect(wrapper.vm.$data.showIcon).toEqual('mdi-pause');
    expect(wrapper.vm.$data.dotsIcon).toEqual('mdi-dots-horizontal');
    expect(wrapper.vm.$data.songIcon).toEqual('mdi-volume-high');
    expect(wrapper.vm.$data.color).toEqual('#1ED760');
    expect(wrapper.vm.$data.color2).toEqual('#1ED760');
    expect(wrapper.vm.$store.state.MusicPlayer.isPlaying).toBe(true);

    wrapper.vm.$store.state.MusicPlayer.isPlaying = false;
    // Click the button and wait
    wrapper.find('#showIcon').trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.changeicon(2);
    expect(wrapper.vm.$data.showIcon).toEqual('mdi-play');
    expect(wrapper.vm.$data.songIcon).toEqual('mdi-music-note-outline');
    expect(wrapper.vm.$data.dotsIcon).toEqual('mdi-dots-horizontal');
    expect(wrapper.vm.$data.color).toEqual('grey');
    expect(wrapper.vm.$data.color2).toEqual('white');
    expect(wrapper.vm.$data.play).toEqual(false);
    expect(wrapper.vm.$store.state.MusicPlayer.isPlaying).toBe(false);
    wrapper.vm.click();
  });

  test('Check for change icon at mouse leave', async () => {
    wrapper.find('#songBar').trigger('mouseleave');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.showIcon).toEqual('mdi-music-note-outline');
    expect(wrapper.vm.$data.dotsIcon).toEqual('');
  });

  test('Check that dropdown list is existed after click at dots icon', async () => {
    localStorage.setItem('currentUser', JSON.stringify({ data: { _id: '' } }));
    // console.log(localStorage);
    expect(wrapper.find('#menu').exists()).toEqual(false);
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

  test('Add track to playlist Button', async () => {
    expect(wrapper.find('#Add').exists()).toEqual(false);
    wrapper.vm.Add();
  });
});
