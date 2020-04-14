import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { mount, createLocalVue } from '@vue/test-utils';
import SongCard from '../../src/components/SongCard.vue';


Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);

const vuetify = new Vuetify();

describe('SongCard.vue', () => {
  Vue.use(vuetify);

  test('renders a vue instance', () => {
    expect(mount(SongCard).isVueInstance()).toBe(true);
  });

  test('All default data are correct', () => {
    const wrapper = mount(SongCard);

    const { showActionButton } = wrapper.vm.$data;
    const { showPlayButton } = wrapper.vm.$data;
    const { snackbar } = wrapper.vm.$data;
    const item0 = wrapper.vm.$data.items[0].title;
    const item2 = wrapper.vm.$data.items[2].title;

    expect(showActionButton).toEqual(false);
    expect(showPlayButton).toEqual(true);
    expect(snackbar).toEqual(false);
    expect(item0).toEqual('Start Radio');
    expect(item2).toEqual('Copy link');
  });

  test('All components are loaded correct', () => {
    const wrapper = mount(SongCard);

    // expect(wrapper.find('#snackbarID').exists()).toEqual(true);
    expect(wrapper.find('#cardID').exists()).toEqual(true);
    // expect(wrapper.find('#imageID').exists()).toEqual(true);
    expect(wrapper.find('#nameID').exists()).toEqual(true);
  });

  test('Description exists if it is playlist', () => {
    const wrapper = mount(SongCard, {
      propsData: {
        type: 'playlist',
      },
      data() {
        return {
          showActionButton: false,
        };
      },
    });

    expect(wrapper.find('#descriptionID').exists()).toEqual(true);
  });

  test('Artist name exists if it is album', () => {
    const wrapper = mount(SongCard, {
      propsData: {
        type: 'album',
      },
      data() {
        return {
          showActionButton: false,
        };
      },
    });

    expect(wrapper.find('#artistNameID').exists()).toEqual(true);
  });

  test('Test menu logic playlist not following', () => {
    const wrapper = mount(SongCard, {
      propsData: {
        type: 'playlist',
      },
      data() {
        return {
          isFollowing: false,
        };
      },
    });

    wrapper.vm.menuLogic(1);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.$data.isFollowing).toEqual(true);
    });
  });

  test('Test menu logic playlist following', () => {
    const wrapper = mount(SongCard, {
      propsData: {
        type: 'playlist',
      },
      data() {
        return {
          isFollowing: true,
        };
      },
    });

    wrapper.vm.menuLogic(1);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.$data.isFollowing).toEqual(false);
    });
  });

  test('Test menu logic album following', () => {
    const wrapper = mount(SongCard, {
      propsData: {
        type: 'album',
      },
      data() {
        return {
          isFollowing: true,
        };
      },
    });

    wrapper.vm.menuLogic(1);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.$data.isFollowing).toEqual(false);
    });
  });

  test('Test menu logic album not following', () => {
    const wrapper = mount(SongCard, {
      propsData: {
        type: 'album',
      },
      data() {
        return {
          isFollowing: false,
        };
      },
    });

    wrapper.vm.menuLogic(1);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.$data.isFollowing).toEqual(true);
    });
  });
});
