import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import InputSearch from '@/views/Search/InputSearch.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
// import S from '@/api/mock/data/Search.json';
import Client from '@/api/mock';

const user = { data: { id: '123456' } };
localStorage.setItem('currentUser', JSON.stringify(user));
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
    expect(wrapper.vm.$data.usersExist).toBe(true);
    expect(wrapper.vm.$data.NoResult).toBe(false);
    expect(wrapper.vm.$data.artistLength).not.toBe(0);
    expect(wrapper.vm.$data.albumLength).not.toBe(0);
    expect(wrapper.vm.$data.trackLength).not.toBe(0);
    expect(wrapper.vm.$data.playlistLength).not.toBe(0);
    expect(wrapper.vm.$data.userLength).toBe(1);
    expect(wrapper.vm.$data.top).toBe(wrapper.vm.$data.tracks[0] || wrapper.vm.$data.artists[0]);
  });
  test('click see all', async () => {
    wrapper.vm.$data.typeToSee = 'artists';
    wrapper.vm.spanClicked();
    expect(wrapper.vm.$route.path).toBe('/home/search/Godzilla/artists');
    wrapper.vm.$route.params.id = 'Godzilla';
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
  test('testing other data', async () => {
    wrapper.vm.$route.params.id = 'Amr Diab';
    await wrapper.vm.fetchSearch(wrapper.vm.$route.params.id);
    expect(wrapper.vm.$data.top.name).toBe('Amr Diab');
    await wrapper.vm.local('5iKYvhddpkuAOzOvrLRznN', 'playlist');
    expect(wrapper.vm.$data.SavedData.type).toBe('playlist');
    await wrapper.vm.local('5abSRg0xN1NV3gLbuvX24M', 'artist');
    expect(wrapper.vm.$data.SavedData.type).toBe('artist');
    await wrapper.vm.local('2IV13wMMDBs2OyqNdAswSP', 'album');
    expect(wrapper.vm.$data.SavedData.type).toBe('album');
    wrapper.vm.$route.params.id = 'Test';
    await wrapper.vm.fetchSearch(wrapper.vm.$route.params.id);
    expect(wrapper.vm.$data.NoResult).toBe(true);
    await wrapper.vm.local('5e8f2f2f481183596571493f', 'user');
  });
  test('mock api functions', async () => {
    let c;
    c = await Client.fetchTrack('3ZTuYuaV1fhdNnuIBuzTYy');
    expect(c.type).toBe('track');
    c = await Client.fetchAlbum('2IV13wMMDBs2OyqNdAswSP');
    expect(c.type).toBe('album');
    c = await Client.fetchAnArtist('5e8f2f3d4811835965714962');
    expect(c[0].type).toBe('artist');
    c = await Client.fetchPlaylist('5iKYvhddpkuAOzOvrLRznN');
    expect(c.type).toBe('playlist');
    c = await Client.fetchPlaylist('4z1sqetlyzn9FyVCvazJa6');
    expect(c.type).toBe('playlist');
    c = await Client.fetchPlaylist('test');
    expect(c).toStrictEqual({});
  });
  test('No data', () => {
    wrapper.vm.$route.params.id = 'Test';
    wrapper.vm.fetchSearch();
    expect(wrapper.vm.NoResult).toBe(true);
    expect(wrapper.vm.artistsExist).toBe(false);
    expect(wrapper.vm.usersExist).toBe(false);
    expect(wrapper.vm.tracksExist).toBe(false);
    expect(wrapper.vm.playlistsExist).toBe(false);
    expect(wrapper.vm.albumsExist).toBe(false);
  });
});
