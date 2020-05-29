import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Recent from '@/views/Search/RecentSearch.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';

describe('testing Search', () => {
  Vue.use(Vuetify);
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(VueRouter);
  const router = new VueRouter();
  localVue.use(Vuex);

  const wrapper = shallowMount(Recent, {
    localVue,
    router,
  });
  test('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
  test('checking if the local storage is empty', () => {
    expect(wrapper.vm.$data.RecentExist).toBe(false);
  });
  test('checking if the local storage has data', () => {
    const SavedData = [{}, {}];
    const UserID = { data: { id: '123456' } };
    localStorage.setItem('currentUser', JSON.stringify(UserID));
    SavedData[0].name = 'Godzilla (feat. Juice WRLD)';
    SavedData[0].id = '7FIWs0pqAYbP91WWM0vlTQ';
    SavedData[0].UserID = '123456';
    SavedData[0].type = 'track';
    SavedData[1].name = 'Godzilla (feat. Juice WRLD)';
    SavedData[1].id = '7FIWs0pqAYbP91WWM0vlTQ';
    SavedData[1].UserID = '123456';
    SavedData[1].type = 'track';
    localStorage.setItem('SearchHistory', JSON.stringify(SavedData));
    const wrapper1 = shallowMount(Recent, {
      localVue,
      router,
    });
    expect(wrapper1.vm.$data.RecentExist).toBe(true);
    const data = JSON.parse(localStorage.getItem('SearchHistory') || '[]');
    expect(wrapper1.vm.$data.Recent).toStrictEqual(data);
  });
  test('clearing Local storage', () => {
    const SavedData = [{}, {}];
    const user = { data: { id: '123456' } };
    localStorage.setItem('currentUser', JSON.stringify(user));
    SavedData[0].name = 'Godzilla (feat. Juice WRLD)';
    SavedData[0].id = '7FIWs0pqAYbP91WWM0vlTQ';
    SavedData[0].UserID = '123456';
    SavedData[0].type = 'track';
    SavedData[1].name = 'Godzilla (feat. Juice WRLD)';
    SavedData[1].id = '7FIWs0pqAYbP91WWM0vlTQ';
    SavedData[1].UserID = '123456';
    SavedData[1].type = 'track';
    localStorage.setItem('SearchHistory', JSON.stringify(SavedData));
    const wrapper1 = shallowMount(Recent, {
      localVue,
      router,
    });
    expect(wrapper1.vm.$data.RecentExist).toBe(true);
    expect(wrapper1.find('#clear').exists()).toBe(true);
    wrapper1.find('#clear').trigger('click');
    expect(wrapper1.vm.$data.Recent).toStrictEqual([]);
  });
  test('clearing Local storage', () => {
    const SavedData = [{}, {}];
    const user = { data: { id: '123456' } };
    localStorage.setItem('currentUser', JSON.stringify(user));
    SavedData[0].name = 'Godzilla (feat. Juice WRLD)';
    SavedData[0].id = '7FIWs0pqAYbP91WWM0vlTQ';
    SavedData[0].UserID = '1234';
    SavedData[0].type = 'track';
    SavedData[1].name = 'Godzilla (feat. Juice WRLD)';
    SavedData[1].id = '7FIWs0pqAYbP91WWM0vlTQ';
    SavedData[1].UserID = '1234';
    SavedData[1].type = 'track';
    localStorage.setItem('SearchHistory', JSON.stringify(SavedData));
    const wrapper1 = shallowMount(Recent, {
      localVue,
      router,
    });
    expect(wrapper1.vm.$data.RecentExist).toBe(false);
  });
});
