import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
// import Vuex from 'vuex';
import Genres from '@/views/Genres/Genres.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Gaming from '@/api/mock/data/genres.json';
import Playlist from '@/api/mock/data/Genres-Playlists.json';
import Playlist2 from '@/api/mock/data/Genres-Playlists2.json';
import Client from '@/api/mock';


describe('testing Search', () => {
  Vue.use(Vuetify);
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(VueRouter);
  const router = new VueRouter();

  const wrapper = shallowMount(Genres, {
    localVue,
    router,
  });
  wrapper.vm.$route.params.id = 'gaming';
  test('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });


  test('fetching Genre', async () => {
    wrapper.vm.$data.test = true;
    await wrapper.vm.fetchGenreReq();
    const a = await Client.fetchGenre(wrapper.vm.$route.params.id);
    expect(wrapper.vm.$data.category).toBe(a);
    // console.log(wrapper.vm.$data.category);
    // console.log(wrapper.vm.$data.PPLength);
    // console.log(wrapper.vm.$data.title);
    // console.log(wrapper.vm.$data.category.name);
    expect(wrapper.vm.$route.params.id).toBe('gaming');
  });

  test('testing api fns', async () => {
    let container;
    container = await Client.fetchGenre(wrapper.vm.$route.params.id);
    expect(container).toBe(Gaming[1]);
    container = await Client.fetchGenre('test');
    expect(container).toStrictEqual({});
    container = await Client.fetchCategoryPlaylists(wrapper.vm.$route.params.id);
    expect(container).toBe(Playlist);
    container = await Client.fetchCategoryPlaylists('soul');
    expect(container).toBe(Playlist2);
    container = await Client.fetchCategoryReleases(wrapper.vm.$route.params.id);
    expect(container).toBe(Playlist);
    container = await Client.fetchCategoryPlaylists('test');
    expect(container).toStrictEqual({});
    container = await Client.fetchCategoryReleases('test');
    expect(container).toStrictEqual({});
    container = await Client.fetchCategoryReleases('soul');
    expect(container).toBe(Playlist2);
    container = await Client.fetchTrack('test');
    expect(container).toStrictEqual({});
  });
});
