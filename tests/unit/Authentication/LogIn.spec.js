/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

// Components
import LogIn from '@/views/Authentication/LogIn.vue';

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);

const vuetify = new Vuetify();
const router = new VueRouter({
  routes: [
    { path: '/home', name: 'Main' },
    { path: '/login', name: 'LogIn' },
  ],
});

describe('LogIn.vue', () => {
  test('localStorage is empty, no user is logged in', () => {
    // Mount the component
    const wrapper = mount(LogIn, {
      localVue,
      vuetify,
      router,
    });

    wrapper.vm.$router.push('/login');
    expect(localStorage.currentUser).toEqual(undefined);
  });

  test('All data fields are clear on mount', () => {
    // Mount the component
    const wrapper = mount(LogIn, {
      localVue,
      vuetify,
      router,
    });

    const input = wrapper.vm.$data.userInput;

    expect(input.email).toEqual('');
    expect(input.password).toEqual('');
    expect(input.showPassword).toEqual(false);
    expect(input.rememberMe).toEqual(false);
    expect(input.incorrect).toEqual(false);
  });

  test('All page components are loaded', () => {
    // Mount the component
    const wrapper = mount(LogIn, { localVue, vuetify, router });

    expect(wrapper.find('#logo').exists()).toEqual(true);
    // expect(wrapper.find('#errorBar').exists()).toEqual(true);
    expect(wrapper.find('#emailField').exists()).toEqual(true);
    expect(wrapper.find('#passwordField').exists()).toEqual(true);
    expect(wrapper.find('#rememberCheck').exists()).toEqual(true);
    expect(wrapper.find('#loginBtn').exists()).toEqual(true);
    expect(wrapper.find('#forgotPasswordPrompt').exists()).toEqual(true);
    expect(wrapper.find('#signupBtn').exists()).toEqual(true);
  });

  test('Logging in as a fake user fails', async () => {
    // Mount the component
    const wrapper = mount(LogIn, {
      localVue,
      vuetify,
      router,
    });

    // Assert that the button exists
    const loginBtn = wrapper.find('#loginBtn');
    expect(loginBtn.exists()).toEqual(true);

    // Assert that both input fields exist
    const emailField = wrapper.find('#emailField');
    expect(emailField.exists()).toEqual(true);
    const passwordField = wrapper.find('#passwordField');
    expect(passwordField.exists()).toEqual(true);

    // Set the fake data
    emailField.setValue('fake@fake.com');
    passwordField.setValue('fake:fake');

    // Click the button and wait
    loginBtn.trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.userInput.incorrect).toEqual('Error. Something went wrong.');
    expect(wrapper.find('#errorBar').exists()).toEqual(true);
  });

  test('Logging in as a real user succeeds', async () => {
    // Mount the component
    const wrapper = mount(LogIn, {
      localVue,
      vuetify,
      router,
    });

    // Assert that the button exists
    const loginBtn = wrapper.find('#loginBtn');
    expect(loginBtn.exists()).toEqual(true);

    // Assert that both input fields exist
    const emailField = wrapper.find('#emailField');
    const passwordField = wrapper.find('#passwordField');
    expect(emailField.exists()).toEqual(true);
    expect(passwordField.exists()).toEqual(true);

    // Set the real data
    emailField.setValue('admin2@admin.com');
    passwordField.setValue('admin:admin2');

    // Click the button and wait
    loginBtn.trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.userInput.incorrect).toEqual(false);
    expect(wrapper.find('#errorBar').exists()).toEqual(false);
    expect(wrapper.vm.$route.path).toEqual('/home');
    const expectedUserData = {
      type: 'artist',
      product: 'free',
      image: null,
      currentlyPlaying: null,
      followers: null,
      _id: '5e6b95fda1903935ccb355a2',
      name: 'Admin2',
      email: 'admin2@admin.com',
      gender: 'f',
      birthdate: '1999-03-25T00:00:00.000Z',
      phoneNumber: '+201000000002',
      country: 'EG',
      devices: [],
      __v: 0,
      uri: 'spotify:user:5e6b95fda1903935ccb355a2',
      id: '5e6b95fda1903935ccb355a2',
      userInfo: {
        name: 'Admin2',
        email: 'admin2@admin.com',
        gender: 'f',
        birthdate: '1999-03-25T00:00:00.000Z',
        phoneNumber: '+201000000002',
        country: 'EG',
      },
    };
    expect(JSON.parse(localStorage.currentUser).data).toEqual(expectedUserData);
  });

  test('Entering data triggers the validation properly', () => {
    // Mount the component
    const wrapper = mount(LogIn, {
      localVue,
      vuetify,
      router,
    });

    // Assert that both input fields exist
    const emailField = wrapper.find('#emailField');
    const passwordField = wrapper.find('#passwordField');
    expect(emailField.exists()).toEqual(true);
    expect(passwordField.exists()).toEqual(true);

    // Set the invalid data
    emailField.setValue('This is an invalid email.');
    passwordField.setValue('invpw');
    expect(wrapper.vm.$refs.loginForm.validate()).toEqual(false);

    // Set the valid data
    emailField.setValue('valid@valid.com');
    passwordField.setValue('validvalid');
    expect(wrapper.vm.$refs.loginForm.validate()).toEqual(true);
  });
});
