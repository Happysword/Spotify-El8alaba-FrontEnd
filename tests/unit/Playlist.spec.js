// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

// Components
// import LikedTracks from '@/views/PlayLists/LikedTracks.vue';
import PlaylistCard from '@/components/playlistCard.vue';

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);

const vuetify = new Vuetify();
const router = new VueRouter();

describe('PlaylistCard.vue Component', () => {
  const wrapper = mount(PlaylistCard, {
    localVue,
    vuetify,
    router,
  });

  const data = wrapper.vm.$data;

  test('renders a vue instance', () => {
    expect(mount(PlaylistCard).isVueInstance()).toBe(true);
  });

  test('All components are loaded', () => {
    expect(wrapper.find('#playlistCard').exists()).toEqual(true);
    expect(wrapper.find('#image').exists()).toEqual(true);
    expect(wrapper.find('#playIcon').exists()).toEqual(true);
    expect(wrapper.find('#pauseIcon').exists()).toEqual(false);
    expect(wrapper.find('#listName').exists()).toEqual(true);
    expect(wrapper.find('#owner').exists()).toEqual(true);
    expect(wrapper.find('#playBtn').exists()).toEqual(true);
    expect(wrapper.find('#save').exists()).toEqual(true);
    expect(wrapper.find('#remove').exists()).toEqual(true);
    expect(wrapper.find('#snackbar').exists()).toEqual(false);
    expect(wrapper.find('#more').exists()).toEqual(true);
    expect(wrapper.find('#tooltip').exists()).toEqual(true);
    expect(wrapper.find('#songNum').exists()).toEqual(true);
  });

  test('All default data are correct', () => {
    expect(data.overlay).toEqual(false);
    expect(data.playSong).toEqual('Play');
    expect(data.snackbar).toEqual(false);
    expect(data.text).toEqual('');
    expect(data.timeout).toEqual(2000);
    expect(data.tooltip).toEqual(false);
    expect(data.play).toEqual(false);
  });

  test('Change status of the current song', () => {
    wrapper.vm.changeStatus();
    expect(data.play).toEqual(true);
    expect(data.overlay).toEqual(true);
  });

  // test('Add or remove list icons changed', () => {
  //   wrapper.vm.changeLiked();
  //   expect(data.play).toEqual(true);
  //   expect(data.overlay).toEqual(true);
  //  });
});
