import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import LikedTracks from '@/views/PlayLists/LikedTracks.vue';
import { mount, createLocalVue } from '@vue/test-utils';
import albums from '../../src/api/mock/data/albumsInfo.json';
import lists from '../../src/api/mock/data/listsInfo.json';
import songs from '../../src/api/mock/data/playlistSongs.json';
import * as currentSongMock from '../../src/api/mock/data/MusicPlayer/currentSong.json';
import * as currentPlaybackMock from '../../src/api/mock/data/MusicPlayer/currentPlayback.json';

// Components

// Utilities

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

describe('PlaylistCard.vue Component', () => {
  const wrapper = mount(LikedTracks, {
    localVue,
    vuetify,
    router,
    store,
  });
  localStorage.setItem('currentUser', JSON.stringify({ data: { _id: '' } }));
  const data = wrapper.vm.$data;

  test('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  test('All default data are correct', () => {
    expect(data.songs).toEqual([]);
    expect(data.songsNum).toEqual(0);
    expect(data.show).toEqual(true);
    expect(data.ready).toEqual(false);
    expect(data.listInfo).toEqual({});
  });

  test('All components are not loaded', () => {
    expect(wrapper.find('v-container').exists()).toEqual(false);
  });

  const list = {
    id: 'LikedTracks',
    images: [
      {
        height: 640,
        url: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
        width: 640,
      },
    ],
    name: 'Liked Songs',
    type: 'Liked',
  };
  test('Load Liked Songs', async () => {
    data.test = true;
    wrapper.vm.$router.push({
      path: '/home/library/tracks',
      name: 'LikedTracks',
      component: LikedTracks,
    });
    await wrapper.vm.LoadPage();
    expect(data.songs).toEqual(songs[0].items);
    expect(data.songsNum).toEqual(songs[0].items.length);
    expect(data.show).toEqual(false);
    expect(data.ready).toEqual(true);
    expect(data.listInfo).toEqual(list);
  });

  test('Load Playlist', async () => {
    data.test = true;
    wrapper.vm.$router.push({
      path: '/playlist',
      name: 'playlist',
      component: LikedTracks,
      params: {
        id: '5iKYvhddpkuAOzOvrLRznN',
      },
    });
    await wrapper.vm.LoadPage();
    expect(data.songs).toEqual(songs[2].items);
    expect(data.songsNum).toEqual(songs[2].items.length);
    expect(data.show).toEqual(true);
    expect(data.ready).toEqual(true);
    expect(data.listInfo).toEqual(lists[5]);
  });

  test('Load Album', async () => {
    data.test = true;
    wrapper.vm.$router.push({
      path: '/album',
      name: 'album',
      component: LikedTracks,
      params: {
        id: '5m4VYOPoIpkV0XgOiRKkWC',

      },
    });
    await wrapper.vm.LoadPage();
    expect(data.songs[0].track).toEqual(albums.items[0].tracks.items[0]);
    expect(data.songsNum).toEqual(albums.items[0].tracks.items.length);
    expect(data.show).toEqual(true);
    expect(data.ready).toEqual(true);
    expect(data.listInfo).toEqual(albums.items[0]);
  });

  test('Load empty Playlist', async () => {
    data.test = true;
    wrapper.vm.$router.push({
      path: '/playlist',
      name: 'playlist',
      component: LikedTracks,
      params: {
        id: '5iKYvhddpkuAOzOvrLRznF',
      },
    });
    await wrapper.vm.LoadPage();
    expect(data.songs).toEqual([]);
    expect(data.songsNum).toEqual(0);
    expect(data.show).toEqual(true);
    expect(data.ready).toEqual(true);
    expect(data.listInfo).toEqual(lists[6]);
  });
});
