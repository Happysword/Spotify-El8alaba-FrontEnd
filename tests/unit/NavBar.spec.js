import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { mount, createLocalVue } from '@vue/test-utils';
import NavBar from '../../src/components/NavBar.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);

const vuetify = new Vuetify();
const router = new VueRouter();

describe('NavBar.vue', () => {
  test('Data to be correct on mounted', () => {
    const wrapper = mount(NavBar, {
      localVue,
      vuetify,
      router,
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
    });

    const createPlaylist = wrapper.find('#createPlaylist');
    expect(createPlaylist.exists()).toEqual(true);

    const createNewPlaylist = wrapper.find('#createNewPlaylist');
    expect(createNewPlaylist.exists()).toEqual(false);
  });
});
