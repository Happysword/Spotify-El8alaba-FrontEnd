import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Search from '@/views/Search/Search.vue';
import { mount, createLocalVue } from '@vue/test-utils';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);
localVue.use(Vuex);

const vuetify = new Vuetify();
const router = new VueRouter();
const store = new Vuex.Store({
  state: {
    searching: true,
  },
});

describe('Check if the search-field has been mounted', () => {
  const wrapper = mount(Search, {
    store,
    localVue,
    vuetify,
    router,
  });
  test('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
