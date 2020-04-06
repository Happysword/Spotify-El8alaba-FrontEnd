import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Search from '@/views/Search/Search.vue';
import Genres from '@/api/mock/data/genres.json';
import PGenres from '@/api/mock/data/PrefGenres.json';
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
    searching: false,
  },
});

describe('testing Search', () => {
  test('checking the searching property is set to true', () => {
    const wrapper = mount(Search, {
      localVue,
      vuetify,
      router,
      store,
    });

    wrapper.vm.$router.push('/search');
    expect(wrapper.vm.$store.state.searching).toEqual(true);
  });

  test('testing genres mock request', async () => {
    const wrapper = mount(Search, {
      localVue,
      vuetify,
      router,
      store,
    });

    await wrapper.vm.fetchAllGenres();
    expect(wrapper.vm.genres).toEqual(Genres.categories.items);
  });

  test('testing Preferred genres mock request', async () => {
    const wrapper = mount(Search, {
      localVue,
      vuetify,
      router,
      store,
    });

    await wrapper.vm.fetchAllPrefG();
    expect(wrapper.vm.PGenres).toEqual(PGenres.categories.items);
  });

  test('checking the recent searches to be empty', () => {
    localStorage.setItem('SearchHistory', []);
    const wrapper = mount(Search, {
      localVue,
      vuetify,
      router,
      store,
    });
    wrapper.vm.$router.push('/search');
    expect(wrapper.vm.RecentExist).toBe(false);
    expect(wrapper.vm.RecentLength).toEqual(0);
  });

  test('checking the recent searches', () => {
    const SavedData = {};
    SavedData.name = 'Godzilla (feat. Juice WRLD)';
    SavedData.id = '7FIWs0pqAYbP91WWM0vlTQ';
    SavedData.description = undefined;
    SavedData.type = 'track';
    SavedData.collaborative = undefined;
    SavedData.external_urls = { spotify: 'https://open.spotify.com/track/7FIWs0pqAYbP91WWM0vlTQ' };
    SavedData.href = 'https://api.spotify.com/v1/tracks/7FIWs0pqAYbP91WWM0vlTQ';
    SavedData.public = undefined;
    SavedData.snapshot_id = undefined;
    SavedData.tracks = undefined;
    SavedData.uri = 'spotify:track:7FIWs0pqAYbP91WWM0vlTQ';
    localStorage.setItem('SearchHistory', JSON.stringify(SavedData));
    const wrapper = mount(Search, {
      localVue,
      vuetify,
      router,
      store,
    });
    wrapper.vm.$router.push('/search');
    expect(wrapper.vm.RecentExist).toBe(true);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.RecentLength).toEqual(1);
    });
  });
});
