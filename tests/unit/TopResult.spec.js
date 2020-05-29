import vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import TopResult from '../../src/components/TopResult.vue';
import * as currentSongMock from '../../src/api/mock/data/MusicPlayer/currentSong.json';
import * as currentPlaybackMock from '../../src/api/mock/data/MusicPlayer/currentPlayback.json';

describe('TopResult.vue', () => {
  Vue.use(vuetify);
  Vue.use(Vuex);
  const localVue = createLocalVue();
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

  test('Checks the default data', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        type: '',
      },
      store,
      router,
    });
    expect(wrapper.vm.showActionButton).toBe(false);
    expect(wrapper.vm.showPlayButton).toBe(true);
  });
  test('not showing the play/pause button when type is profile', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        type: 'profile',
      },
      store,
    });
    wrapper.vm.showActionButton = true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('#btn').exists()).toBe(false);
    });
  });
  test('test artist link', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        artistName: 'Spotify',
      },
      localVue,
      router,
      store,
    });
    wrapper.vm.artistLink();
    expect(wrapper.vm.$route.path).toBe('/home');
  });
  test('test artist link', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        artistName: 'Test',
      },
      localVue,
      router,
      store,
    });
    wrapper.vm.artistLink();
    expect(wrapper.vm.$route.path).toBe('/artist/Test');
  });
  test('test artist link', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        IDP: 'test',
        type: 'artist',
      },
      localVue,
      router,
      store,
    });
    wrapper.vm.CardClickLink();
    expect(wrapper.vm.$route.path).toBe('/home/artist/test');
  });
  test('test artist link', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        IDP: 'test',
        type: 'test',
      },
      localVue,
      router,
      store,
    });
    wrapper.vm.CardClickLink();
    expect(wrapper.vm.$route.path).toBe('/home/artist/test');
  });
  test('test album link', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        IDP: 'test',
        type: 'album',
      },
      localVue,
      router,
      store,
    });
    wrapper.vm.CardClickLink();
    expect(wrapper.vm.$route.path).toBe('/album/test');
  });
  test('test track link', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        IDP: 'test',
        type: 'track',
        albumID: 'test',
      },
      localVue,
      router,
      store,
    });
    wrapper.vm.CardClickLink();
    expect(wrapper.vm.$route.path).toBe('/album/test');
  });
  test('test playlist link', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        IDP: 'test',
        type: 'playlist',
      },
      localVue,
      router,
      store,
    });
    wrapper.vm.CardClickLink();
    expect(wrapper.vm.$route.path).toBe('/playlist/test');
  });
  test('test user link', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        IDP: 'test',
        type: 'user',
      },
      localVue,
      router,
      store,
    });
    wrapper.vm.CardClickLink();
    expect(wrapper.vm.$route.path).toBe('/home/user/test');
  });
  test('test playsong fn', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        IDP: currentSongMock[0].track.id,
        type: 'user',
      },
      localVue,
      router,
      store,
    });
    wrapper.vm.playSong();
    expect(wrapper.vm.showActionButton).toBe(false);
    wrapper.vm.showActionButton = true;
  });
  test('test checkSong', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        IDP: currentSongMock[0].track.id,
        type: 'user',
      },
      localVue,
      router,
      store,
    });
    expect(wrapper.vm.showPlayButton).toBe(true);
    wrapper.vm.playSong();
    wrapper.vm.$store.state.MusicPlayer.isPlaying = true;
  });
  test('test checkSong 2 ', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        IDP: currentSongMock[0].track.id,
        type: 'album',
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
});
