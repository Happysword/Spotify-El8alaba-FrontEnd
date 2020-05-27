import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Search from '@/views/Search/Search.vue';
import Genres from '@/api/mock/data/genres.json';
// import PGenres from '@/api/mock/data/PrefGenres.json';
import { mount, createLocalVue } from '@vue/test-utils';
import GenresCard from '../../src/components/GenresCard.vue';

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
    MusicPlayer: {
      ID: 'test',
    },
  },
});


describe('testing Search', () => {
  test('renders a vue instance', () => {
    // Mount the component
    const wrapper = mount(Search, {
      localVue,
      vuetify,
      router,
      store,
    });
    expect(wrapper.isVueInstance()).toBe(true);
  });
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
    expect(wrapper.vm.genres).toEqual(Genres);
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
    const SavedData = [{}];
    SavedData[0].name = 'Godzilla (feat. Juice WRLD)';
    SavedData[0].id = '7FIWs0pqAYbP91WWM0vlTQ';
    SavedData[0].type = 'track';
    SavedData[0].UserID = 'test';
    const user = {};
    user.data = {};
    user.data.id = 'test';
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('SearchHistory', JSON.stringify(SavedData));
    const wrapper = mount(Search, {
      localVue,
      vuetify,
      router,
      store,
    });
    wrapper.vm.$store.state.MusicPlayer.ID = 'test';
    expect(wrapper.vm.RecentExist).toBe(true);
    expect(wrapper.find('#history').exists()).toEqual(true);
    wrapper.find('#history').trigger('click');
    expect(wrapper.vm.$route.path).toBe('/home/search/history/showRecent');
  });
  test('test artist link', () => {
    const wrapper = mount(GenresCard, {
      propsData: {
        route: 'test',
      },
      localVue,
      router,
    });
    wrapper.vm.routing();
    expect(wrapper.vm.$route.path).toBe('/genre/test-page');
  });
});
