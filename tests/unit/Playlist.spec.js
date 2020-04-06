// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

// Components
// import LikedTracks from '@/views/PlayLists/LikedTracks.vue';
// import PlaylistCard from '@/components/PlaylistCard.vue';
import SongsBar from '@/components/SongsBar.vue';

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);

const vuetify = new Vuetify();
const router = new VueRouter();

describe('SongsBar.vue', () => {
  test('All components are loaded', () => {
    // Mount the component
    const wrapper = mount(SongsBar, {
      localVue,
      vuetify,
      router,
    });

    expect(wrapper.find('#songBar').exists()).toEqual(true);
    expect(wrapper.find('#showIcon').exists()).toEqual(true);
    expect(wrapper.find('#songName').exists()).toEqual(true);
    expect(wrapper.find('#songInfo').exists()).toEqual(true);
    expect(wrapper.find('#dotsIcon').exists()).toEqual(true);
    expect(wrapper.find('#duration').exists()).toEqual(true);
  });
});
