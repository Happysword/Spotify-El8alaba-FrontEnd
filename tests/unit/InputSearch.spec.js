import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import InputSearch from '@/views/Search/InputSearch.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
// import S from '@/api/mock/data/Search.json';
// import Client from '@/api/mock';


describe('testing Search', () => {
  Vue.use(Vuetify);
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(VueRouter);
  localVue.use(Vuex);
  const store = new Vuex.Store({
    state: {
      searching: false,
    },
  });
  const router = new VueRouter();
  const wrapper = shallowMount(InputSearch, {
    localVue,
    store,
    router,
  });
  wrapper.vm.$route.params.id = 'Godzilla';
  test('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
  test('initialising data', () => {
    expect(wrapper.vm.$data.artistsExist).toBe(false);
    expect(wrapper.vm.$data.playlistsExist).toBe(false);
    expect(wrapper.vm.$data.albumsExist).toBe(false);
    expect(wrapper.vm.$data.tracksExist).toBe(false);
    expect(wrapper.vm.$data.usersExist).toBe(false);
    expect(wrapper.vm.$data.NoResult).toBe(true);
    expect(wrapper.vm.$data.artistLength).toBe(0);
    expect(wrapper.vm.$data.albumLength).toBe(0);
    expect(wrapper.vm.$data.trackLength).toBe(0);
    expect(wrapper.vm.$data.playlistLength).toBe(0);
    expect(wrapper.vm.$data.userLength).toBe(0);
  });
  test('fetch search data', async () => {
    await wrapper.vm.fetchSearch();
    expect(wrapper.vm.$data.artistsExist).toBe(true);
    expect(wrapper.vm.$data.playlistsExist).toBe(true);
    expect(wrapper.vm.$data.albumsExist).toBe(true);
    expect(wrapper.vm.$data.tracksExist).toBe(true);
    expect(wrapper.vm.$data.usersExist).toBe(false);
    expect(wrapper.vm.$data.NoResult).toBe(false);
    expect(wrapper.vm.$data.artistLength).not.toBe(0);
    expect(wrapper.vm.$data.albumLength).not.toBe(0);
    expect(wrapper.vm.$data.trackLength).not.toBe(0);
    expect(wrapper.vm.$data.playlistLength).not.toBe(0);
    expect(wrapper.vm.$data.userLength).toBe(0);
    expect(wrapper.vm.$data.top).toBe(wrapper.vm.$data.tracks[0] || wrapper.vm.$data.artists[0]);
  });
  test('click see all', async () => {
    wrapper.find('#seeartists').trigger('mouseover');
    expect(wrapper.vm.$data.typeToSee).toBe('artists');
    wrapper.find('#seealbums').trigger('mouseover');
    expect(wrapper.vm.$data.typeToSee).toBe('albums');
    wrapper.find('#seeplaylists').trigger('mouseover');
    expect(wrapper.vm.$data.typeToSee).toBe('playlists');
    wrapper.vm.$data.typeToSee = 'artists';
    wrapper.vm.spanClicked();
    expect(wrapper.vm.$route.path).toBe('/home/search/Godzilla/artists');
    wrapper.vm.$route.params.id = 'Godzilla';
    console.log(wrapper.vm.$route);
    wrapper.vm.$data.typeToSee = 'albums';
    wrapper.vm.spanClicked();
    expect(wrapper.vm.$route.path).toBe('/home/search/Godzilla/albums');
    wrapper.vm.$route.params.id = 'Godzilla';
    wrapper.vm.$data.typeToSee = 'tracks';
    wrapper.vm.spanClicked();
    expect(wrapper.vm.$route.path).toBe('/home/search/Godzilla/tracks');
    wrapper.vm.$route.params.id = 'Godzilla';
    wrapper.vm.$data.typeToSee = 'users';
    wrapper.vm.spanClicked();
    expect(wrapper.vm.$route.path).toBe('/home/search/Godzilla/users');
    wrapper.vm.$route.params.id = 'Godzilla';
    wrapper.vm.$data.typeToSee = 'playlists';
    wrapper.vm.spanClicked();
    expect(wrapper.vm.$route.path).toBe('/home/search/Godzilla/playlists');
  });
  test('testing Recent Search fn', async () => {
    await wrapper.vm.local(wrapper.vm.$data.top.id, wrapper.vm.$data.top.type);
    const data = JSON.parse(localStorage.getItem('SearchHistory') || '[]');
    expect(wrapper.vm.$data.SearchHistory[0].id).toStrictEqual(data[0].id);
  });
});
