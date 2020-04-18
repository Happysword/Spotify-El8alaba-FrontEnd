/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

// Components
import AccountOverview from '@/components/Account/AccountOverview.vue';

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);

const vuetify = new Vuetify();
const router = new VueRouter({
  routes: [
    { path: '/', name: 'Landing' },
    { path: '/account/edit-profile', name: 'EditProfile' },
    { path: '/account/account-overview', name: 'AccountOverview' },
  ],
});

describe('AccountOverview.vue', () => {
  // Mock the alert function to skip its execution
  jest.spyOn(window, 'alert')
    .mockImplementation(() => {});
  const currentUser = {
    data: {
      type: 'user',
      product: 'free',
      image: null,
      currentlyPlaying: null,
      followers: null,
      _id: '5e6b95fda1903935ccb355a0',
      name: 'Admin',
      email: 'admin@admin.com',
      gender: 'm',
      birthdate: '1999-01-25T00:00:00.000Z',
      country: 'EG',
      devices: [],
      __v: 0,
      uri: 'spotify:user:5e6b95fda1903935ccb355a0',
      id: '5e6b95fda1903935ccb355a0',
    },
  };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  test('All page components are loaded', async () => {
    // Mount the component
    const wrapper = mount(AccountOverview, { localVue, vuetify, router });
    wrapper.vm.$router.push('/account/overview');

    expect(wrapper.find('#title').exists()).toEqual(true);
    expect(wrapper.find('#usernameEntry').exists()).toEqual(true);
    expect(wrapper.find('#emailEntry').exists()).toEqual(true);
    expect(wrapper.find('#dobEntry').exists()).toEqual(true);
    expect(wrapper.find('#countryEntry').exists()).toEqual(true);
    expect(wrapper.find('#planCard').exists()).toEqual(true);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('#toPremiumBtn').exists()).toEqual(true);
  });

  test('Mock data is represented properly', async () => {
    // Mount the component
    const wrapper = mount(AccountOverview, { localVue, vuetify, router });

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });

    await wrapper.vm.$nextTick();
    const usernameEntry = wrapper.find('#usernameEntry');
    const emailEntry = wrapper.find('#emailEntry');
    const dobEntry = wrapper.find('#dobEntry');
    const countryEntry = wrapper.find('#countryEntry');
    expect(usernameEntry.text()).toMatch('5e6b95fda1903935ccb355a0');
    expect(emailEntry.text()).toMatch('admin@admin.com');
    expect(dobEntry.text()).toMatch('25/1/99');
    expect(countryEntry.text()).toMatch('EG');

    const planCard = wrapper.find('#planCard');
    expect(planCard.text()).toMatch('Spotify free');
  });

  test('Loading with no current user fails', async () => {
    localStorage.removeItem('currentUser');
    // Mount the component
    const wrapper = mount(AccountOverview, { localVue, vuetify, router });

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });

    await wrapper.vm.$nextTick();
    const usernameEntry = wrapper.find('#usernameEntry');
    const emailEntry = wrapper.find('#emailEntry');
    const dobEntry = wrapper.find('#dobEntry');
    const countryEntry = wrapper.find('#countryEntry');
    expect(usernameEntry.text()).toMatch('lorem');
    expect(emailEntry.text()).toMatch('lorem');
    expect(dobEntry.text()).toMatch('lorem');
    expect(countryEntry.text()).toMatch('lorem');
    expect(wrapper.vm.$route.name).toMatch('Landing');
  });
});
