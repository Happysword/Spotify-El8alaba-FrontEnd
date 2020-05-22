import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Landing from '../../src/views/Landing/Landing.vue';

describe('Testing the existence of components', () => {
  Vue.use(Vuetify);
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(VueRouter);

  const vuetify = new Vuetify({
    mocks: {
      $vuetify: {
        breakpoint: {
          xs: false,
        },
      },
    },
  });
  const wrapper = shallowMount(Landing, {
    localVue,
    vuetify,
  });


  test('check the image to exist at start', () => {
    expect(wrapper.find('#logo-img').exists()).toBe(true);
  });

  test('check the topbar buttons to exist at start', () => {
    expect(wrapper.find('#download-btn').exists()).toBe(true);
    expect(wrapper.find('#premium-btn').exists()).toBe(true);
    expect(wrapper.find('#signup-btn').exists()).toBe(true);
    expect(wrapper.find('#login-btn').exists()).toBe(true);
  });

  test('check content in the middle to exist at start', () => {
    expect(wrapper.find('#welcome-text-1').exists()).toBe(true);
    expect(wrapper.find('#welcome-text-2').exists()).toBe(true);
    expect(wrapper.find('#Big-download-btn').exists()).toBe(true);
  });
});
