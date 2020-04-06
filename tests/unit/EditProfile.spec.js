/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

// Components
import EditProfile from '@/components/Account/EditProfile.vue';

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);

const vuetify = new Vuetify();
const router = new VueRouter({
  routes: [{ path: '/account/overview', name: 'AccountOverview' }],
});

describe('EditProfile.vue', () => {
  test('All data fields are clear on mount', () => {
    // Mount the component
    const wrapper = mount(EditProfile, { localVue, vuetify, router });

    const input = wrapper.vm.$data.userInput;

    expect(input.name).toEqual('');
    expect(input.gender).toEqual('');
    expect(input.dob.day).toEqual('');
    expect(input.dob.month).toEqual('');
    expect(input.dob.year).toEqual('');
    expect(input.country).toEqual('');
    expect(input.phoneNumber).toEqual('');
    expect(input.incorrect).toEqual(false);
  });

  test('All page components are loaded', () => {
    // Mount the component
    const wrapper = mount(EditProfile, { localVue, vuetify, router });

    expect(wrapper.find('#title').exists()).toEqual(true);
    expect(wrapper.find('#formCard').exists()).toEqual(true);
    expect(wrapper.find('#nameField').exists()).toEqual(true);
    expect(wrapper.find('#genderSelect').exists()).toEqual(true);
    expect(wrapper.find('#dobDayField').exists()).toEqual(true);
    expect(wrapper.find('#dobMonthSelect').exists()).toEqual(true);
    expect(wrapper.find('#dobYearField').exists()).toEqual(true);
    expect(wrapper.find('#countrySelect').exists()).toEqual(true);
    expect(wrapper.find('#phoneField').exists()).toEqual(true);
    expect(wrapper.find('#cancelBtn').exists()).toEqual(true);
    expect(wrapper.find('#saveBtn').exists()).toEqual(true);
  });


  test('Entering invalid data triggers the validation properly', () => {
    // Mount the component
    const wrapper = mount(EditProfile, { localVue, vuetify, router });

    // Assert that all input fields exist
    const nameField = wrapper.find('#nameField');
    expect(nameField.exists()).toEqual(true);
    const genderSelect = wrapper.find('#genderSelect');
    expect(genderSelect.exists()).toEqual(true);

    const dobDayField = wrapper.find('#dobDayField');
    expect(dobDayField.exists()).toEqual(true);
    const dobMonthSelect = wrapper.find('#dobMonthSelect');
    expect(dobMonthSelect.exists()).toEqual(true);
    const dobYearField = wrapper.find('#dobYearField');
    expect(dobYearField.exists()).toEqual(true);

    const countrySelect = wrapper.find('#countrySelect');
    expect(countrySelect.exists()).toEqual(true);
    const phoneField = wrapper.find('#phoneField');
    expect(phoneField.exists()).toEqual(true);

    // Set the invalid data
    nameField.setValue('This is an invalid name.');

    dobDayField.setValue('One');
    dobMonthSelect.setValue('');
    dobYearField.setValue('2');

    countrySelect.setValue(1);
    phoneField.setValue('This is an invalid phone number');

    expect(wrapper.vm.$refs.editProfileForm.validate()).toEqual(false);
  });

  test('Entering valid data triggers the validation properly', () => {
    // Mount the component
    const wrapper = mount(EditProfile, { localVue, vuetify, router });

    // Assert that all input fields exist
    const nameField = wrapper.find('#nameField');
    expect(nameField.exists()).toEqual(true);
    const genderSelect = wrapper.find('#genderSelect');
    expect(genderSelect.exists()).toEqual(true);

    const dobDayField = wrapper.find('#dobDayField');
    expect(dobDayField.exists()).toEqual(true);
    const dobMonthSelect = wrapper.find('#dobMonthSelect');
    expect(dobMonthSelect.exists()).toEqual(true);
    const dobYearField = wrapper.find('#dobYearField');
    expect(dobYearField.exists()).toEqual(true);

    const countrySelect = wrapper.find('#countrySelect');
    expect(countrySelect.exists()).toEqual(true);
    const phoneField = wrapper.find('#phoneField');
    expect(phoneField.exists()).toEqual(true);

    // Set the valid data
    nameField.setValue('Valid Name');
    genderSelect.setValue('m');

    dobDayField.setValue('1');
    dobMonthSelect.setValue('01');
    dobYearField.setValue('1991');

    countrySelect.setValue('Egypt');
    phoneField.setValue('+201000000000');

    expect(wrapper.vm.$refs.editProfileForm.validate()).toEqual(true);
  });

  test('Editing the current user\'s data works', async () => {
    let currentUser = {
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
    const wrapper = mount(EditProfile, { localVue, vuetify, router });

    // Assert that the button exists
    const saveBtn = wrapper.find('#saveBtn');
    expect(saveBtn.exists()).toEqual(true);

    // Assert that all input fields exist
    const nameField = wrapper.find('#nameField');
    expect(nameField.exists()).toEqual(true);
    const genderSelect = wrapper.find('#genderSelect');
    expect(genderSelect.exists()).toEqual(true);

    const dobDayField = wrapper.find('#dobDayField');
    expect(dobDayField.exists()).toEqual(true);
    const dobMonthSelect = wrapper.find('#dobMonthSelect');
    expect(dobMonthSelect.exists()).toEqual(true);
    const dobYearField = wrapper.find('#dobYearField');
    expect(dobYearField.exists()).toEqual(true);

    const countrySelect = wrapper.find('#countrySelect');
    expect(countrySelect.exists()).toEqual(true);
    const phoneField = wrapper.find('#phoneField');
    expect(phoneField.exists()).toEqual(true);

    // Add the new data
    nameField.setValue('Unit Test');
    genderSelect.setValue('f');

    dobDayField.setValue('1');
    dobMonthSelect.setValue('01');
    dobYearField.setValue('1991');

    countrySelect.setValue('SE');
    phoneField.setValue('+201111111111');

    // Click the button and wait
    saveBtn.trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.userInput.incorrect).toEqual(false);

    currentUser = JSON.parse(localStorage.currentUser);
    expect(currentUser.data.name).toEqual('Unit Test');
    expect(currentUser.data.gender).toEqual('f');
    expect(currentUser.data.birthdate).toEqual('1991-01-01');
    expect(currentUser.data.country).toEqual('SE');
    expect(currentUser.data.phoneNumber).toEqual('+201111111111');
  });
});
