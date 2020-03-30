import { shallowMount } from '@vue/test-utils';
import vuetify from 'vuetify';
import Vue from 'vue';
import TopResult from '../../src/components/TopResult.vue';

describe('TopResult.vue', () => {
  Vue.use(vuetify);

  test('renders a vue instance', () => {
    expect(shallowMount(TopResult).isVueInstance()).toBe(true);
  });

  test('Checks the default data', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        type: '',
      },
    });
    expect(wrapper.vm.showActionButton).toBe(false);
    expect(wrapper.vm.showPlayButton).toBe(true);
  });

  test('showing only the play button', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        type: 'artist',
      },
    });
    wrapper.vm.$data.showActionButton = true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('#btn').exists()).toBe(true);
      expect(wrapper.find('#play').exists()).toBe(true);
      expect(wrapper.find('#pause').exists()).toBe(false);
    });
  });

  test('showing only the pause button', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        type: 'artist',
      },
    });
    wrapper.vm.showActionButton = true;
    wrapper.vm.showPlayButton = false;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('#btn').exists()).toBe(true);
      expect(wrapper.find('#pause').exists()).toBe(true);
      expect(wrapper.find('#play').exists()).toBe(false);
    });
  });

  test('not showing the play/pause button when type is profile', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        type: 'profile',
      },
    });
    wrapper.vm.showActionButton = true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('#btn').exists()).toBe(false);
    });
  });
});
