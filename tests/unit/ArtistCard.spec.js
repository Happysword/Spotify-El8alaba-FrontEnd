import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ArtistCard from '../../src/components/ArtistCard.vue';
// import G from '@/api/mock/data/genres.json';
// import Client from '@/api/mock';

describe('ArtistCard.vue', () => {
  Vue.use(Vuetify);
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(VueRouter);
  const router = new VueRouter();
  localVue.use(Vuex);


  test('renders a vue instance', () => {
    expect(shallowMount(ArtistCard).isVueInstance()).toBe(true);
  });

  test('All default data are correct', () => {
    const wrapper = shallowMount(ArtistCard, {
      localVue,
      router,
    });
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

  test('Test menu logic artist not following', () => {
    const wrapper = shallowMount(ArtistCard, {
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

  test('Test menu logic artist following', () => {
    const wrapper = shallowMount(ArtistCard, {
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

  test('Test fetch follow status', () => {
    const wrapper = shallowMount(ArtistCard, {
      propsData: {
        type: 'playlist',
      },
      data() {
        return {
          isFollowing: true,
        };
      },
    });

    wrapper.vm.fetchFollowStatus();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.$data.isFollowing).toEqual(true);
    });
  });
});
