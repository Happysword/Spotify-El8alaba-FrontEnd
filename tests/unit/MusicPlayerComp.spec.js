import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vue from 'vue';
import Requests from '../../src/store/modules/MusicPlayer/Requests';
import * as currentSongMock from '../../src/api/mock/data/MusicPlayer/currentSong.json';
import * as currentPlaybackMock from '../../src/api/mock/data/MusicPlayer/currentPlayback.json';
import MMPlayer from '../../src/components/musicplayer/MiddlePartMPlayer.vue';
import LMPlayer from '../../src/components/musicplayer/LeftPartMPlayer.vue';
import RMPlayer from '../../src/components/musicplayer/RightPartMPlayer.vue';

describe('Testing the player components', () => {
  // Setting up The Vue instances configs
  Vue.use(Vuetify);
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(Vuex);
  localVue.use(VueRouter);
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

  // Test suites

  describe('Testing LeftPartMPlayer component', () => {
    // Adding the store mock for the instance

    const wrapper = shallowMount(LMPlayer, {
      localVue,
      store,
    });
    const data = wrapper.vm.$data;

    // check that data is correct at begin
    expect(data.heartcolor).toBe(false);
    expect(data.hoverPic).toBe(false);
    expect(data.imageButton).toBe(false);
    expect(data.isLinkDisabled).toBe(false);

    it('Checks for Loading of Page Components', async () => {
      expect(wrapper.find('#image-album').exists()).toBe(true);
      expect(wrapper.find('#song-name').exists()).toBe(true);
      expect(wrapper.find('#artist-name').exists()).toBe(true);
      expect(wrapper.find('#heart-outline').exists()).toBe(true);
      expect(wrapper.find('#pipButton').exists()).toBe(true);
    });

    it('Change Heart Method test', async () => {
      expect(data.heartcolor).toBe(false);
      await wrapper.vm.changeHeart();
      expect(data.heartcolor).toBe(true);
      await wrapper.vm.changeHeart();
      expect(data.heartcolor).toBe(false);
    });
    it('ChangeHoverPic Method test', () => {
      expect(data.hoverPic).toBe(false);
      wrapper.vm.changeHoverPic();
      expect(data.hoverPic).toBe(true);
      wrapper.vm.changeHoverPic();
      expect(data.hoverPic).toBe(false);
    });
  });

  describe('Testing MiddlePartMPlayer component', () => {
    const wrapper = shallowMount(MMPlayer, {
      localVue,
      store,
      Requests,
    });
    const data = wrapper.vm.$data;

    // Check that data is correct at start

    expect(data.shuffleState).toBe(false);
    expect(data.repeatState).toBe('off');
    expect(data.barHover).toBe(false);
    expect(data.valueFalseBuffer).toBe(0);
    expect(typeof wrapper.vm.currentSongTime).toBe('string');

    it('Checks for Loading of Page Components', async () => {
      expect(wrapper.find('#shuffle-btn').exists()).toBe(true);
      expect(wrapper.find('#repeat-btn').exists()).toBe(true);
      expect(wrapper.find('#skip-previous-btn').exists()).toBe(true);
      expect(wrapper.find('#skip-next-btn').exists()).toBe(true);
      expect(wrapper.find('#play-btn').exists()).toBe(true);
      expect(wrapper.find('#seek-bar').exists()).toBe(true);
    });
    it('checks skip next and skip previous', async () => {
      expect(wrapper.vm.$store.state.MusicPlayer.currentSongIndexinList).toBe(0);
      wrapper.vm.skipNext();
      expect(wrapper.vm.$store.state.MusicPlayer.currentSongIndexinList).toBe(1);
      wrapper.vm.skipPrevious();
      expect(wrapper.vm.$store.state.MusicPlayer.currentSongIndexinList).toBe(0);
    });

    it('Toggle Shuffle tests', async () => {
      expect(data.shuffleState).toBe(false);
      await wrapper.vm.toggleShuffle();
      expect(data.shuffleState).toBe(true);
      await wrapper.vm.toggleShuffle();
      expect(data.shuffleState).toBe(false);
    });

    it('Toggle Repeat tests', async () => {
      expect(data.repeatState).toBe('off');
      await wrapper.vm.toggleRepeat();
      expect(data.repeatState).toBe('track');
      await wrapper.vm.toggleRepeat();
      expect(data.repeatState).toBe('off');
    });

    it('checks toggle play and pause', async () => {
      expect(wrapper.find('#play-btn').exists()).toBe(true);
      await wrapper.vm.togglePlayact();
      expect(wrapper.find('#pause-btn').exists()).toBe(true);
    });

    it('checks seek to position', async () => {
      expect(wrapper.vm.$data.valueFalseBuffer).toBe(0);
      wrapper.vm.seekPosition();
      expect(wrapper.vm.$data.valueFalseBuffer).toBe(0);
    });
  });

  describe('Testing RightPartMPlayer component', () => {
    const wrapper = shallowMount(RMPlayer, {
      localVue,
      store,
      router,
    });
    const data = wrapper.vm.$data;

    // check that data is correct at begin
    expect(data.isInQueue).toBe(false);
    expect(data.barHover).toBe(false);

    it('Checks for Loading of Page Components', async () => {
      wrapper.vm.queueChange();
      expect(wrapper.find('#queue-btn').exists()).toBe(true);
      expect(wrapper.find('#not-mute-btn').exists()).toBe(true);
      expect(wrapper.find('#volume-bar').exists()).toBe(true);
    });

    it('Checks that toggle sound changes button', async () => {
      expect(wrapper.find('#not-mute-btn').exists()).toBe(true);
      await wrapper.vm.toggleSound();
      expect(wrapper.find('#not-mute-btn').exists()).toBe(false);
    });
  });
});
