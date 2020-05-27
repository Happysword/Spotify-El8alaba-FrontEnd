import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import topbar from '../../src/components/TopBar.vue';

describe('Testing the existence of components', () => {
  Vue.use(Vuetify);
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(VueRouter);
  const router = new VueRouter();
  localVue.use(Vuex);
  const store = new Vuex.Store({
    state: {
      searching: false,
      InputSearch: '',
      currentUser: {},
    },
  });

  const wrapper = shallowMount(topbar, {
    localVue,
    store,
    router,
  });

  test('check that the chevrons exist', () => {
    wrapper.vm.changeRoute(1);
    expect(wrapper.find('#left-chevron').exists()).toBe(true);
    expect(wrapper.find('#right-chevron').exists()).toBe(true);
  });

  test('check that the upgrade does not exist', () => {
    expect(wrapper.find('#upgrade-btn').exists()).toBe(false);
  });

  test('check that user button exists on click', async () => {
    wrapper.vm.$data.loggedIn = true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('#user-btn').exists()).toBe(true);
      expect(wrapper.find('#logout-item').exists()).toBe(true);
      expect(wrapper.find('#account-item').exists()).toBe(true);
    });
  });
  test('check that change route works', async () => {
    wrapper.vm.$route.params.id = 'Faded';
    wrapper.vm.searching();
    expect(wrapper.vm.$data.input).toBe('Faded');
    expect(wrapper.vm.$route.path).toBe('/home/search/Faded');
    expect(typeof wrapper.vm.userName).toBe('string');
  });
});
