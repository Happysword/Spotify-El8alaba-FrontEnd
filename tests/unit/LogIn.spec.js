// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

// Components
import LogIn from '@/views/Authentication/LogIn.vue';

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

/**
 * @todo[XL3]: Add an alias resolver to Jest
 *   because it fails to resolve the 'api-client' alias
 */

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);

const vuetify = new Vuetify();
const router = new VueRouter();

describe('LogIn.vue', () => {
  test('All data fields are clear on mount', () => {
    // Mount the component
    const wrapper = mount(LogIn, { localVue, vuetify, router });

    const input = wrapper.vm.$data.userInput;

    expect(input.email).toEqual('');
    expect(input.password).toEqual('');
    expect(input.showPassword).toBe(false);
    expect(input.rememberMe).toBe(false);
    expect(input.onForgot).toBe(false);
    expect(input.incorrect).toBe(false);
  });
});
