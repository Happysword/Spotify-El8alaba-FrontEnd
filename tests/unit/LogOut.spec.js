/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

// Components
import LogOut from '@/views/Authentication/LogOut.vue';

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);

const vuetify = new Vuetify();
const router = new VueRouter();

describe('LogOut.vue', () => {
  test('localStorage is empty and all cookies are deleted', () => {
    const currentUser = {
      data: {
        external_urls: [],
        genres: [],
        _id: '5e6b95fda1903935ccb355a0',
        userInfo: {
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
        followers: [],
        images: [],
        uri: 'spotify:user:5e6b95fda1903935ccb355a0',
      },
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    document.cookie = 'jwt=mock_token;';
    expect(document.cookie.search('jwt')).not.toEqual(-1);
    expect(localStorage.currentUser).not.toEqual(undefined);

    // Mount the component
    mount(LogOut, {
      localVue,
      vuetify,
      router,
    });

    expect(document.cookie.search('jwt')).toEqual(-1);
    expect(localStorage.currentUser).toEqual(undefined);
  });
});
