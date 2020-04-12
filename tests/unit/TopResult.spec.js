import vuetify from 'vuetify';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import TopResult from '../../src/components/TopResult.vue';

describe('TopResult.vue', () => {
  Vue.use(vuetify);
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  test('renders a vue instance', () => {
    expect(shallowMount(TopResult).isVueInstance()).toBe(true);
  });

  test('Checks the default data', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        type: '',
      },
    });
    expect(wrapper.vm.showActionButton).toBe(false);
    expect(wrapper.vm.showPlayButton).toBe(true);
  });

  test('showing only the play button', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        type: 'artist',
      },
    });
    wrapper.vm.$data.showActionButton = true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('#btn').exists()).toBe(true);
      expect(wrapper.find('#play').exists()).toBe(true);
      expect(wrapper.find('#pause').exists()).toBe(false);
    });
  });

  test('showing only the pause button', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        type: 'artist',
      },
    });
    wrapper.vm.showActionButton = true;
    wrapper.vm.showPlayButton = false;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('#btn').exists()).toBe(true);
      expect(wrapper.find('#pause').exists()).toBe(true);
      expect(wrapper.find('#play').exists()).toBe(false);
    });
  });

  test('not showing the play/pause button when type is profile', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        type: 'profile',
      },
    });
    wrapper.vm.showActionButton = true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('#btn').exists()).toBe(false);
    });
  });
  test('test artist link', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        artistName: 'Spotify',
      },
      localVue,
      router,
    });
    wrapper.vm.artistLink();
    expect(wrapper.vm.$route.path).toBe('/home');
  });
  test('test artist link', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        artistName: 'Test',
      },
      localVue,
      router,
    });
    wrapper.vm.artistLink();
    expect(wrapper.vm.$route.path).toBe('/artist/Test');
  });
  test('test artist link', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        IDP: 'test',
        type: 'artist',
      },
      localVue,
      router,
    });
    wrapper.vm.CardClickLink();
    expect(wrapper.vm.$route.path).toBe('/artist/test');
  });
  test('test artist link', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        IDP: 'test',
        type: 'album',
      },
      localVue,
      router,
    });
    wrapper.vm.CardClickLink();
    expect(wrapper.vm.$route.path).toBe('/album/test');
  });
  test('test artist link', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        IDP: 'test',
        type: 'track',
      },
      localVue,
      router,
    });
    wrapper.vm.CardClickLink();
    expect(wrapper.vm.$route.path).toBe('/track/test');
  });
  test('test artist link', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        IDP: 'test',
        type: 'playlist',
      },
      localVue,
      router,
    });
    wrapper.vm.CardClickLink();
    expect(wrapper.vm.$route.path).toBe('/playlist/test');
  });
  test('test artist link', () => {
    const wrapper = shallowMount(TopResult, {
      propsData: {
        IDP: 'test',
        type: 'user',
      },
      localVue,
      router,
    });
    wrapper.vm.CardClickLink();
    expect(wrapper.vm.$route.path).toBe('/user/test');
  });
});
