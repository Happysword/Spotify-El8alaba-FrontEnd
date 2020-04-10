import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Genres from '@/views/Genres/Genres.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
// import G from '@/api/mock/data/genres.json';
// import Client from '@/api/mock';


describe('testing Search', () => {
  Vue.use(Vuetify);
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(VueRouter);
  const router = new VueRouter();
  localVue.use(Vuex);

  const wrapper = shallowMount(Genres, {
    localVue,
    router,
  });
  wrapper.vm.$route.params.id = 'gaming';
  test('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
  test('fetching Genre', () => {
    wrapper.vm.fetchGenreReq();
    console.log(wrapper.vm.$data.PPLength);
    expect(wrapper.vm.$route.params.id).toBe('gaming');
  });
});
