// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

// Components
import Account from '@/views/Account/Account.vue';

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);

const vuetify = new Vuetify();
const router = new VueRouter();

describe('Account.vue', () => {
  const currentUser = { data: { userInfo: { image: null } } };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  test('All page components are loaded', () => {
    // Mount the component
    const wrapper = mount(Account, { localVue, vuetify, router });
    wrapper.vm.$router.push('/account/overview');

    expect(wrapper.find('#logo').exists()).toEqual(true);
    // expect(wrapper.find('#errorBar').exists()).toEqual(true);
    expect(wrapper.find('.trans-bar').exists()).toEqual(true);
    expect(wrapper.find('#homeBtn').exists()).toEqual(true);
    expect(wrapper.find('#premiumBtn').exists()).toEqual(true);
    expect(wrapper.find('#downloadBtn').exists()).toEqual(true);
    expect(wrapper.find('#tabs').exists()).toEqual(true);
    expect(wrapper.find('#avatar').exists()).toEqual(true);
    expect(wrapper.find('#overview-tab').exists()).toEqual(true);
    expect(wrapper.find('#edit-profile-tab').exists()).toEqual(true);
    expect(wrapper.find('#change-password-tab').exists()).toEqual(true);
    expect(wrapper.find('#notifications-tab').exists()).toEqual(true);
    expect(wrapper.find('#tab-content').exists()).toEqual(true);
  });
});
