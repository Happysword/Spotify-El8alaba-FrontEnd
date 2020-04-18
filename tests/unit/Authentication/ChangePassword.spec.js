/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */

// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

// Components
import ChangePassword from '@/components/Account/ChangePassword.vue';

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);

const vuetify = new Vuetify();
const router = new VueRouter({
  routes: [
    { path: '/account/change-password', name: 'ChangePassword' },
    { path: '/account/account-overview', name: 'AccountOverview' },
  ],
});

describe('ChangePassword.vue', () => {
  test('All data fields are clear on mount', () => {
    // Mount the component
    const wrapper = mount(ChangePassword, { localVue, vuetify, router });

    const input = wrapper.vm.$data.userInput;

    expect(input.currentPw).toEqual('');
    expect(input.newPw).toEqual('');
    expect(input.retypeNewPw).toEqual('');
    expect(input.showPassword).toEqual(false);
    expect(input.incorrect).toEqual(false);
  });

  test('All page components are loaded', () => {
    // Mount the component
    const wrapper = mount(ChangePassword, { localVue, vuetify, router });

    expect(wrapper.find('#title').exists()).toEqual(true);
    expect(wrapper.find('#formCard').exists()).toEqual(true);
    expect(wrapper.find('#currentPwField').exists()).toEqual(true);
    expect(wrapper.find('#newPwField').exists()).toEqual(true);
    expect(wrapper.find('#retypeNewPwField').exists()).toEqual(true);
    expect(wrapper.find('#cancelBtn').exists()).toEqual(true);
    expect(wrapper.find('#saveBtn').exists()).toEqual(true);
  });


  test('Entering data triggers the validation properly', () => {
    // Mount the component
    const wrapper = mount(ChangePassword, { localVue, vuetify, router });

    // Assert that all input fields exist
    const currentPwField = wrapper.find('#currentPwField');
    expect(currentPwField.exists()).toEqual(true);
    const newPwField = wrapper.find('#newPwField');
    expect(newPwField.exists()).toEqual(true);
    const retypeNewPwField = wrapper.find('#retypeNewPwField');
    expect(retypeNewPwField.exists()).toEqual(true);

    // Set the invalid data
    currentPwField.setValue('invpw');
    newPwField.setValue('invpw');
    retypeNewPwField.setValue('invpw2');
    expect(wrapper.vm.$refs.changePasswordForm.validate()).toEqual(false);
    expect(wrapper.vm.validateRetypeNewPw()).toEqual(false);

    // Set the valid data
    currentPwField.setValue('old password');
    newPwField.setValue('new password');
    retypeNewPwField.setValue('new password');
    expect(wrapper.vm.$refs.changePasswordForm.validate()).toEqual(true);
  });

  test('Editing with no current user fails', async () => {
    const wrapper = mount(ChangePassword, { localVue, vuetify, router });
    // Assert that the button exists
    const saveBtn = wrapper.find('#saveBtn');
    expect(saveBtn.exists()).toEqual(true);

    // Assert that all input fields exist
    const currentPwField = wrapper.find('#currentPwField');
    expect(currentPwField.exists()).toEqual(true);
    const newPwField = wrapper.find('#newPwField');
    expect(newPwField.exists()).toEqual(true);
    const retypeNewPwField = wrapper.find('#retypeNewPwField');
    expect(retypeNewPwField.exists()).toEqual(true);

    // Add the new data
    currentPwField.setValue('old password');
    newPwField.setValue('new password');
    retypeNewPwField.setValue('new password');

    // Click the button and wait
    saveBtn.trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 200);
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.userInput.incorrect).toEqual('Error. Something went wrong.');
  });

  test('Editing the current user\'s data works', async () => {
    const currentUser = {
      data: {
        type: 'user',
        product: 'free',
        image: null,
        currentlyPlaying: null,
        followers: null,
        _id: '5e6b95fda1903935ccb355a1',
        name: 'Admin1',
        email: 'admin1@admin.com',
        gender: 'm',
        birthdate: '1999-02-25T00:00:00.000Z',
        country: 'EG',
        devices: [],
        __v: 0,
        uri: 'spotify:user:5e6b95fda1903935ccb355a1',
        phoneNumber: '+201000000001',
        id: '5e6b95fda1903935ccb355a1',
      },
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Mount the component
    router.push({ name: 'ChangePassword' });
    const wrapper = mount(ChangePassword, { localVue, vuetify, router });

    // Assert that the button exists
    const saveBtn = wrapper.find('#saveBtn');
    expect(saveBtn.exists()).toEqual(true);

    // Assert that all input fields exist
    const currentPwField = wrapper.find('#currentPwField');
    expect(currentPwField.exists()).toEqual(true);
    const newPwField = wrapper.find('#newPwField');
    expect(newPwField.exists()).toEqual(true);
    const retypeNewPwField = wrapper.find('#retypeNewPwField');
    expect(retypeNewPwField.exists()).toEqual(true);

    // Add the new data
    currentPwField.setValue('admin:admin1');
    newPwField.setValue('new password');
    retypeNewPwField.setValue('new password');

    // Click the button and wait
    saveBtn.trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 200);
    });
    await wrapper.vm.$nextTick();

    const expectedUser = JSON.parse(localStorage.currentUser);
    expect(currentUser).toEqual(expectedUser);
  });
});
