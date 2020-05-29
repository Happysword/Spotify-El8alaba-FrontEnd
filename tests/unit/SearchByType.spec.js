import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import SearchByType from '@/views/Search/SearchType.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import S from '@/api/mock/data/Search.json';
// import Client from '@/api/mock';


describe('testing Search', () => {
  Vue.use(Vuetify);
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(VueRouter);
  const router = new VueRouter();
  localVue.use(Vuex);

  const wrapper = shallowMount(SearchByType, {
    localVue,
    router,
  });
  wrapper.vm.$route.params.id = 'Godzilla';
  wrapper.vm.$route.params.type = 'artists';
  test('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
  test('fetching artists', async () => {
    wrapper.vm.$route.params.type = 'artists';
    await wrapper.vm.fetchSearch();
    expect(wrapper.vm.$data.dataExist).toBe(true);
    expect(wrapper.vm.$data.data).toBe(S[1].artists);
    expect(wrapper.vm.$data.data.length).toBeGreaterThan(0);
  });
  test('fetching albums', async () => {
    wrapper.vm.$route.params.type = 'albums';
    await wrapper.vm.fetchSearch();
    expect(wrapper.vm.$data.dataExist).toBe(true);
    expect(wrapper.vm.$data.data).toBe(S[1].albums);
    expect(wrapper.vm.$data.data.length).toBeGreaterThan(0);
  });
  test('fetching playlists', async () => {
    wrapper.vm.$route.params.type = 'playlists';
    await wrapper.vm.fetchSearch();
    expect(wrapper.vm.$data.dataExist).toBe(true);
    expect(wrapper.vm.$data.data).toBe(S[1].playlists);
    expect(wrapper.vm.$data.data.length).toBeGreaterThan(0);
  });
  test('fetching tracks', async () => {
    wrapper.vm.$route.params.type = 'tracks';
    await wrapper.vm.fetchSearch();
    expect(wrapper.vm.$data.dataExist).toBe(true);
    expect(wrapper.vm.$data.data.length).toBeGreaterThan(0);
    expect(wrapper.vm.$data.data).toBe(S[1].tracks);
  });
  test('fetching users', async () => {
    wrapper.vm.$route.params.type = 'users';
    await wrapper.vm.fetchSearch();
    expect(wrapper.vm.$data.dataExist).toBe(true);
    expect(wrapper.vm.$data.data.length).toBeGreaterThan(0);
    expect(wrapper.vm.$data.data).toBe(S[1].users);
  });
  test('fetching users 2', async () => {
    wrapper.vm.$route.params.type = 'user';
    wrapper.vm.$route.params.id = 'Amr Diab';
    await wrapper.vm.fetchSearch();
    expect(wrapper.vm.$data.dataExist).toBe(false);
    expect(wrapper.vm.$data.data.length).toBe(0);
    expect(wrapper.vm.$data.data).toStrictEqual([]);
  });
});
