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
const router = new VueRouter();

describe('EditProfile.vue', () => {
  test('All data fields are clear on mount', () => {
    // Mount the component
    const wrapper = mount(EditProfile, { localVue, vuetify, router });

    const input = wrapper.vm.$data.userInput;

    expect(input.email).toEqual('');
    expect(input.password).toEqual('');
    expect(input.showPassword).toEqual(false);
    expect(input.gender).toEqual('');
    expect(input.dob.day).toEqual('');
    expect(input.dob.month).toEqual('');
    expect(input.dob.year).toEqual('');
    expect(input.country).toEqual('');
    expect(input.phone).toEqual('');
    expect(input.incorrect).toEqual(false);
  });

  test('All page components are loaded', () => {
    // Mount the component
    const wrapper = mount(EditProfile, { localVue, vuetify, router });

    expect(wrapper.find('#title').exists()).toEqual(true);
    expect(wrapper.find('#formCard').exists()).toEqual(true);
    expect(wrapper.find('#emailField').exists()).toEqual(true);
    expect(wrapper.find('#passwordField').exists()).toEqual(true);
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
    const emailField = wrapper.find('#emailField');
    expect(emailField.exists()).toEqual(true);
    const passwordField = wrapper.find('#passwordField');
    expect(passwordField.exists()).toEqual(true);
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
    emailField.setValue('This is an invalid email.');
    passwordField.setValue('invpw');

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
    const emailField = wrapper.find('#emailField');
    expect(emailField.exists()).toEqual(true);
    const passwordField = wrapper.find('#passwordField');
    expect(passwordField.exists()).toEqual(true);
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
    emailField.setValue('valid@valid.com');
    passwordField.setValue('valid:valid');
    genderSelect.setValue('Male');

    dobDayField.setValue('1');
    dobMonthSelect.setValue('January');
    dobYearField.setValue('1991');

    countrySelect.setValue('Egypt');
    // @todo[XL3] Change this
    phoneField.setValue('01000000000');

    expect(wrapper.vm.$refs.editProfileForm.validate()).toEqual(true);
  });
});
