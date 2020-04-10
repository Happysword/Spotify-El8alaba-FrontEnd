import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import NavBar from '../../src/components/NavBar.vue';

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
      navBarImage: '',
    },
  },
});


describe('NavBar.vue', () => {
  test('Data to be correct on mounted', () => {
    const wrapper = mount(NavBar, {
      localVue,
      vuetify,
      router,
      store,
    });

    const { createdPlaylistName } = wrapper.vm.$data;
    const { drawer } = wrapper.vm.$data;

    expect(createdPlaylistName).toEqual('');
    expect(drawer).toEqual(true);
  });

  test('All main items in Navbar exists on mounted', () => {
    const wrapper = mount(NavBar, {
      localVue,
      vuetify,
      router,
      store,
    });

    expect(wrapper.find('#logo').exists()).toEqual(true);
    expect(wrapper.find('#mainLinks').exists()).toEqual(true);
    expect(wrapper.find('#createPlaylist').exists()).toEqual(true);
    expect(wrapper.find('#likedSongs').exists()).toEqual(true);
  });

  test('Create new playlist works', async () => {
    const wrapper = mount(NavBar, {
      localVue,
      vuetify,
      router,
      store,
    });

    const createPlaylist = wrapper.find('#createPlaylist');
    expect(createPlaylist.exists()).toEqual(true);

    const createNewPlaylist = wrapper.find('#createNewPlaylist');
    expect(createNewPlaylist.exists()).toEqual(false);
  });

  test('Fetch userplaylist works', () => {
    const wrapper = mount(NavBar, {
      localVue,
      vuetify,
      router,
      store,
    });

    const playlistsJson = wrapper.vm.$data.playlists;
    expect(playlistsJson).toMatchObject({});

    wrapper.vm.fetchUserPlaylists();

    wrapper.vm.$nextTick(() => {
      expect(playlistsJson).toMatchObject({});
    });
  });

  test('Create playlist works', () => {
    const wrapper = mount(NavBar, {
      localVue,
      vuetify,
      router,
      store,
    });

    const playlistsJson = wrapper.vm.$data.playlists;
    expect(playlistsJson).toMatchObject({});

    wrapper.vm.createNewPlaylist();

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.createdPlaylistName).toEqual('');
    });
  });
});
