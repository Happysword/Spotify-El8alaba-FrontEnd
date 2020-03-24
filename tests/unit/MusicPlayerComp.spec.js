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
// import RMPlayer from '../../src/components/musicplayer/RightPartMPlayer.vue';

// TODO[@Seif] complete the unit tests
describe('Testing the player components', () => {
  // Setting up The Vue instances configs
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
        AudioPlayer: Audio,
      },
    },
    mutations: {
      setCurrentUser() {},
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

    it('Change Heart Method test', () => {
      expect(data.heartcolor).toBe(false);
      wrapper.vm.changeHeart();
      expect(data.heartcolor).toBe(true);
      wrapper.vm.changeHeart();
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

    it('Toggle Shuffle tests', async () => {
      expect(data.shuffleState).toBe(false);
      await wrapper.vm.toggleShuffle;
      // expect(data.shuffleState).toBe(true);
    });
  });

  describe('Testing RightPartMPlayer component', () => {
    it('', () => {});
  });
});
