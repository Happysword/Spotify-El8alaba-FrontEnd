/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

// Components
import PasswordReset from '@/views/Authentication/PasswordReset.vue';

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
    { path: '/home', name: 'Main' },
    {
      path: '/password-reset/:resetToken?',
      name: 'PasswordReset',
      component: PasswordReset,
      meta: { title: 'Spotify El8alaba - Reset your password' },
    },
  ],
});

describe('PasswordReset.vue', () => {
  test('localStorage is empty, no user is logged in', () => {
    // Mount the component
    const wrapper = mount(PasswordReset, {
      localVue,
      vuetify,
      router,
    });

    wrapper.vm.$router.push('/password-reset');
    expect(localStorage.currentUser).toEqual(undefined);
  });

  test('All data fields are clear on mount', () => {
    // Mount the component
    const wrapper = mount(PasswordReset, {
      localVue,
      vuetify,
      router,
    });

    const input = wrapper.vm.$data.userInput;

    expect(input.email).toEqual('');
    expect(input.incorrect).toEqual(false);
  });

  test('All page components are loaded', () => {
    // Mount the component
    const wrapper = mount(PasswordReset, {
      localVue,
      vuetify,
      router,
    });

    expect(wrapper.find('#logo').exists()).toEqual(true);
    // expect(wrapper.find('#errorBar').exists()).toEqual(true);
    expect(wrapper.find('#emailField').exists()).toEqual(true);
    expect(wrapper.find('#sendBtn').exists()).toEqual(true);
  });

  test('Requesting a Password Reset for a fake user fails', async () => {
    // Mount the component
    const wrapper = mount(PasswordReset, {
      localVue,
      vuetify,
      router,
    });

    // Assert that the button exists
    const sendBtn = wrapper.find('#sendBtn');
    expect(sendBtn.exists()).toEqual(true);

    // Assert that the input field exists
    const emailField = wrapper.find('#emailField');
    expect(emailField.exists()).toEqual(true);

    // Set the fake data
    emailField.setValue('fake@fake.com');

    // Click the button and wait
    sendBtn.trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.userInput.incorrect).toEqual(true);
    expect(wrapper.find('#errorBar').exists()).toEqual(true);
  });

  test('Requesting a Password Reset for a real user succeeds', async () => {
    // Mount the component
    const wrapper = mount(PasswordReset, {
      localVue,
      vuetify,
      router,
    });

    // Assert that the button exists
    const sendBtn = wrapper.find('#sendBtn');
    expect(sendBtn.exists()).toEqual(true);

    // Assert that the input field exists
    const emailField = wrapper.find('#emailField');
    expect(emailField.exists()).toEqual(true);

    // Set the real data
    emailField.setValue('admin@admin.com');

    // Click the button and wait
    sendBtn.trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.userInput.incorrect).toEqual(false);
    expect(wrapper.vm.$data.succeeded).toEqual(true);
    expect(wrapper.find('#errorBar').exists()).toEqual(false);
    expect(wrapper.text())
      .toMatch(/A message has been sent to you by email with instructions/);
    expect(wrapper.text())
      .toMatch(/on how to reset your password\./);
  });

  test('Entering an email triggers the validation properly', () => {
    // Mount the component
    const wrapper = mount(PasswordReset, {
      localVue,
      vuetify,
      router,
    });

    // Assert that the input field exists
    const emailField = wrapper.find('#emailField');
    expect(emailField.exists()).toEqual(true);

    // Set the invalid data
    emailField.setValue('This is an invalid email.');
    expect(wrapper.vm.$refs.passwordResetForm.validate()).toEqual(false);

    // Set the valid data
    emailField.setValue('valid@valid.com');
    expect(wrapper.vm.$refs.passwordResetForm.validate()).toEqual(true);
  });

  test('Entering a password pair triggers the validation properly', () => {
    // Add a mock token as a route parameter
    router.push({ name: 'PasswordReset', params: { resetToken: 'mock_token' } });

    // Mount the component
    const wrapper = mount(PasswordReset, {
      localVue,
      vuetify,
      router,
    });

    // Assert that the input field exists
    const passwordField = wrapper.find('#passwordField');
    expect(passwordField.exists()).toEqual(true);
    const confirmPasswordField = wrapper.find('#confirmPasswordField');
    expect(confirmPasswordField.exists()).toEqual(true);

    // Set the invalid data
    passwordField.setValue('password');
    confirmPasswordField.setValue('confirm password');
    expect(wrapper.vm.validateConfirmPassword()).toEqual(false);
    expect(wrapper.vm.$refs.passwordResetForm.validate()).toEqual(false);

    // Set the valid data
    passwordField.setValue('password');
    confirmPasswordField.setValue('password');
    expect(wrapper.vm.$refs.passwordResetForm.validate()).toEqual(true);
  });

  test('Resetting a fake user\'s password fails', async () => {
    // Add a mock token as a route parameter
    router.push({ name: 'Landing' });
    router.push({ name: 'PasswordReset', params: { resetToken: 'mock_token' } });

    // Mount the component
    const wrapper = mount(PasswordReset, {
      localVue,
      vuetify,
      router,
    });

    // Assert that the button exists
    const sendBtn = wrapper.find('#sendBtn');
    expect(sendBtn.exists()).toEqual(true);

    // Assert that the input field exists
    const passwordField = wrapper.find('#passwordField');
    expect(passwordField.exists()).toEqual(true);
    const confirmPasswordField = wrapper.find('#confirmPasswordField');
    expect(confirmPasswordField.exists()).toEqual(true);

    // Set the fake data
    passwordField.setValue('password');
    confirmPasswordField.setValue('password');
    expect(wrapper.vm.$refs.passwordResetForm.validate()).toEqual(true);

    // Click the button and wait
    sendBtn.trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.userInput.incorrect).toEqual(true);
    expect(wrapper.find('#errorBar').exists()).toEqual(true);
  });

  test('Resetting a real user\'s password succeeds', async () => {
    // Add a mock token as a route parameter
    router.push({ name: 'Main' });
    router.push({ name: 'PasswordReset', params: { resetToken: 'mock_token' } });

    // Mount the component
    const wrapper = mount(PasswordReset, {
      localVue,
      vuetify,
      router,
    });

    // Assert that the button exists
    const sendBtn = wrapper.find('#sendBtn');
    expect(sendBtn.exists()).toEqual(true);

    // Assert that the input field exists
    const passwordField = wrapper.find('#passwordField');
    expect(passwordField.exists()).toEqual(true);
    const confirmPasswordField = wrapper.find('#confirmPasswordField');
    expect(confirmPasswordField.exists()).toEqual(true);

    // Set the real data
    passwordField.setValue('admin:admin2');
    confirmPasswordField.setValue('admin:admin2');
    expect(wrapper.vm.$refs.passwordResetForm.validate()).toEqual(true);

    // Click the button and wait
    sendBtn.trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 200);
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
});
