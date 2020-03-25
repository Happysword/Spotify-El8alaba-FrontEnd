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
const router = new VueRouter();

describe('PasswordReset.vue', () => {
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
  });

  test('Entering invalid data triggers the validation properly', () => {
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
  });

  test('Entering valid data triggers the validation properly', () => {
    // Mount the component
    const wrapper = mount(PasswordReset, {
      localVue,
      vuetify,
      router,
    });

    // Assert that the input field exists
    const emailField = wrapper.find('#emailField');
    expect(emailField.exists()).toEqual(true);

    // Set the valid data
    emailField.setValue('valid@valid.com');

    expect(wrapper.vm.$refs.passwordResetForm.validate()).toEqual(true);
  });
});
