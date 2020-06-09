// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueClipboard from 'vue-clipboard2';
import { mount, createLocalVue } from '@vue/test-utils';
import Dropdown from '@/components/mockDropdown.vue';
import * as currentSongMock from '../../src/api/mock/data/MusicPlayer/currentSong.json';
import * as currentPlaybackMock from '../../src/api/mock/data/MusicPlayer/currentPlayback.json';


Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueClipboard);

const vuetify = new Vuetify();
const router = new VueRouter();
const store = new Vuex.Store({
  state: {
    liked: false,
    MusicPlayer: {
      isMute: false,
      currentBufferPerc: 0,
      lastVolrecord: 50,
      isPlaying: false,
      currentSongTime: '0:00',
      currentSong: currentSongMock[0],
      currentPlayback: currentPlaybackMock[0],
      currentList: [currentSongMock[0], currentSongMock[0]],
      currentQueue: [],
      currentSongIndexinList: 0,
      AudioPlayer: new Audio('https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_5MG.mp3'),
    },
  },
  mutations: {
    changeLiked() {
      this.state.liked = !this.state.liked;
    },
  },
});
localStorage.setItem('currentUser', JSON.stringify({ data: { _id: '3' } }));

describe('Track dropdown', () => {
  // Mount the component

  const wrapper = mount(Dropdown, {
    localVue,
    vuetify,
    router,
    store,
    propsData: {
      id: '1',
      type: 'track',
      track: { id: '1' },
      ownerID: '3',
      listID: '2',
      position: 1,
    },
  });

  test('All data is correct', async () => {
    expect(wrapper.vm.$data.songList)
      .toEqual(['Save To Your Liked Songs', 'Add to Queue', 'Add to Playlist', 'Remove from this Playlist']);
  });

  test('Click actions', async () => {
    await wrapper.vm.click('Save To Your Liked Songs');
    expect(wrapper.vm.$data.songList[0]).toEqual('Remove From Your Liked Songs');
    await wrapper.vm.click('Remove From Your Liked Songs');
    expect(wrapper.vm.$data.songList[0]).toEqual('Save To Your Liked Songs');
    await wrapper.vm.click('Add to Queue');
    expect(wrapper.vm.$store.state.MusicPlayer.currentQueue[0]).toEqual({ id: '1' });
    await wrapper.vm.click('Add to Playlist');
    await wrapper.vm.click('Remove from this Playlist');
    expect(wrapper.vm.$data.SnackBar.show).toEqual(true);
    expect(wrapper.vm.$data.SnackBar.content).toEqual('Track is Removed from This Playlist');
  });
});

describe('User Playlist Dropdown', () => {
  // Mount the component

  const wrapper = mount(Dropdown, {
    localVue,
    vuetify,
    router,
    store,
    propsData: {
      id: '241',
      type: 'playlist',
      track: {},
      ownerID: '3',
      public: true,
      card: 'card',
    },
  });

  test('All data is correct', async () => {
    expect(wrapper.vm.$data.myPlaylist)
      .toEqual(['Make Secret', 'Delete', 'Copy Link', 'Upload Cover Image']);
    expect(wrapper.vm.$data.showList)
      .toEqual(['Make Secret', 'Delete', 'Copy Link', 'Upload Cover Image']);
  });

  test('Click', async () => {
    await wrapper.vm.click('Make Secret');
    expect(wrapper.vm.$data.myPlaylist[0]).toEqual('Make Public');
    await wrapper.vm.click('Make Public');
    expect(wrapper.vm.$data.myPlaylist[0]).toEqual('Make Secret');
    await wrapper.vm.click('Delete');
    expect(wrapper.vm.$data.overlay).toEqual(true);
    await wrapper.vm.click('Copy Link');
    await wrapper.vm.click('Upload Cover Image');
  });
});

describe('Album dropdown', () => {
  // Mount the component

  const wrapper = mount(Dropdown, {
    localVue,
    vuetify,
    router,
    store,
    propsData: {
      id: '22',
      type: 'album',
      track: {},
      card: 'card',
    },
  });
  test('All data is correct', async () => {
    expect(wrapper.vm.$data.albumList)
      .toEqual(['Save To Your Library', 'Copy Link']);
    expect(wrapper.vm.$data.showList)
      .toEqual(['Save To Your Library', 'Copy Link']);
  });

  test('Click actions', async () => {
    await wrapper.vm.click('Save To Your Library');
    expect(wrapper.vm.$data.albumList[0]).toEqual('Remove From Your Library');
    await wrapper.vm.click('Remove From Your Library');
    expect(wrapper.vm.$data.albumList[0]).toEqual('Save To Your Library');
    await wrapper.vm.click('Copy Link');
  });
});
describe('Playlist Dropdown', () => {
  // Mount the component

  const wrapper = mount(Dropdown, {
    localVue,
    vuetify,
    router,
    store,
    propsData: {
      id: '153',
      type: 'playlist',
      track: {},
      ownerID: '0',
      card: 'card',
    },
  });
  test('All data is correct', async () => {
    expect(wrapper.vm.$data.albumList)
      .toEqual(['Save To Your Library', 'Copy Link']);
    expect(wrapper.vm.$data.showList)
      .toEqual(['Save To Your Library', 'Copy Link']);
  });

  test('Click actions', async () => {
    await wrapper.vm.click('Save To Your Library');
    expect(wrapper.vm.$data.albumList[0]).toEqual('Remove From Your Library');
    await wrapper.vm.click('Remove From Your Library');
    expect(wrapper.vm.$data.albumList[0]).toEqual('Save To Your Library');
    await wrapper.vm.click('Copy Link');
  });
});
