/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

// Components
import Account from '@/views/Account/Account.vue';

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';
import avatar from '@/assets/imgs/avatar.png';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);

const vuetify = new Vuetify();
const router = new VueRouter({
  routes: [{ path: '/account', name: 'Account' }],
});

describe('Account.vue', () => {
  const currentUser = { data: { image: [] } };
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

  test('All data is initialized correctly', () => {
    // Mount the component
    const wrapper = mount(Account, { localVue, vuetify, router });
    wrapper.vm.$router.push('/account/overview');

    expect(wrapper.vm.$data.image).toEqual(avatar);

    expect(wrapper.vm.$data.buttons[0]).toEqual({ name: 'home', route: '/home' });
    expect(wrapper.vm.$data.buttons[1]).toEqual({ name: 'download', route: '/download' });
    expect(wrapper.vm.$data.buttons[2]).toEqual({ name: 'premium', route: '/premium' });

    expect(wrapper.vm.$data.tabs[0]).toEqual({
      title: 'Account Overview',
      icon: 'mdi-home',
      link: 'overview',
    });
    expect(wrapper.vm.$data.tabs[1]).toEqual({
      title: 'Edit Profile',
      icon: 'mdi-pencil',
      link: 'edit-profile',
    });
    expect(wrapper.vm.$data.tabs[2]).toEqual({
      title: 'Change Password',
      icon: 'mdi-lock',
      link: 'change-password',
    });
    expect(wrapper.vm.$data.tabs[3]).toEqual({
      title: 'Notification Settings',
      icon: 'mdi-bell',
      link: 'notifications',
    });
  });
});
