import { shallowMount } from '@vue/test-utils';
import vuetify from 'vuetify';
import Vue from 'vue';
import SearchSong from '../../src/components/SearchSong.vue';

describe('TopResult.vue', () => {
  let wrapper;

  beforeEach(() => {
    Vue.use(vuetify);
    wrapper = shallowMount(SearchSong);
  });

  test('renders a vue instance', () => {
    expect(shallowMount(SearchSong).isVueInstance()).toBe(true);
  });

  test('Checks the default data', () => {
    expect(wrapper.vm.overlay).toBe(false);
    expect(wrapper.vm.showPlayButton).toBe(true);
  });

  test('showing only the play button', () => {
    wrapper.vm.$data.overlay = true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.btn').exists()).toBe(true);
      expect(wrapper.find('#play').exists()).toBe(true);
      expect(wrapper.find('#pause').exists()).toBe(false);
    });
  });

  test('showing only the pause button', () => {
    wrapper.vm.$data.overlay = true;
    wrapper.vm.showPlayButton = false;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.btn').exists()).toBe(true);
      expect(wrapper.find('#pause').exists()).toBe(true);
      expect(wrapper.find('#play').exists()).toBe(false);
    });
  });
});
