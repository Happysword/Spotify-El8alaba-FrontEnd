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
const router = new VueRouter();

describe('LogIn.vue', () => {
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
    expect(input.onForgot).toEqual(false);
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
    // expect(wrapper.find('#loginBtnXS').exists()).toEqual(true);
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

    expect(wrapper.vm.$data.userInput.incorrect).toEqual(true);
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
    emailField.setValue('admin@admin.com');
    passwordField.setValue('admin:admin');

    // Click the button and wait
    loginBtn.trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.userInput.incorrect).toEqual(false);
  });

  test('Entering invalid data triggers the validation properly', () => {
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

    // Set the invalid data
    emailField.setValue('This is an invalid email.');
    passwordField.setValue('invpw');

    expect(wrapper.vm.$refs.loginForm.validate()).toEqual(false);
  });

  test('Entering valid data triggers the validation properly', () => {
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

    // Set the valid data
    emailField.setValue('valid@valid.com');
    passwordField.setValue('validvalid');

    expect(wrapper.vm.$refs.loginForm.validate()).toEqual(true);
  });
});
