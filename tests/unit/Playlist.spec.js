// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

// Components
import PlaylistCard from '@/components/playlistCard.vue';
import EmptyList from '@/components/EmptyList.vue';

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';
import EventBus from '../../src/EventBus';


Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);

const vuetify = new Vuetify();
const router = new VueRouter();

describe('PlaylistCard.vue Component', () => {
  localStorage.setItem('currentUser', JSON.stringify({ data: { _id: '' } }));
  const wrapper = mount(PlaylistCard, {
    localVue,
    vuetify,
    router,
  });
  const data = wrapper.vm.$data;
  wrapper.vm.$props.songsNum = 1;

  test('renders a vue instance', () => {
    expect(mount(PlaylistCard).isVueInstance()).toBe(true);
  });

  test('All components are loaded', () => {
    expect(wrapper.find('#playlistCard').exists()).toEqual(true);
    expect(wrapper.find('#image').exists()).toEqual(true);
    expect(wrapper.find('#playIcon').exists()).toEqual(true);
    expect(wrapper.find('#pauseIcon').exists()).toEqual(false);
    expect(wrapper.find('#listName').exists()).toEqual(true);
    expect(wrapper.find('#owner').exists()).toEqual(true);
    expect(wrapper.find('#playBtn').exists()).toEqual(true);
    expect(wrapper.find('#save').exists()).toEqual(true);
    expect(wrapper.find('#remove').exists()).toEqual(true);
    expect(wrapper.find('#snackbar').exists()).toEqual(false);
    expect(wrapper.find('#more').exists()).toEqual(true);
    expect(wrapper.find('#tooltip').exists()).toEqual(true);
    expect(wrapper.find('#songNum').exists()).toEqual(true);
  });

  test('All default data are correct', () => {
    expect(data.overlay).toEqual(false);
    expect(data.playSong).toEqual('Play');
    expect(data.snackbar).toEqual(false);
    expect(data.text).toEqual('');
    expect(data.timeout).toEqual(2000);
    expect(data.tooltip).toEqual(false);
    expect(data.play).toEqual(false);
  });

  test('Change status of the current song', async () => {
    wrapper.find('#playBtn').trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();
    // wrapper.vm.changeStatus();
    expect(data.play).toEqual(false);
    expect(data.overlay).toEqual(false);
    expect(data.playSong).toEqual('Play');

    wrapper.find('#playBtn').trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();
    // wrapper.vm.changeStatus();
    expect(data.play).toEqual(false);
    expect(data.overlay).toEqual(false);
    expect(data.playSong).toEqual('Play');

    EventBus.$emit('changePlay', false, '1');
    const ret = wrapper.vm.changePlayEvent;
    expect(ret).toEqual(true);
    expect(data.play).toEqual(false);
    expect(data.overlay).toEqual(false);
  });

  test('Add or remove list icons changed', async () => {
    wrapper.find('#save').trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();

    // await wrapper.vm.changeLiked();
    expect(data.store.state.liked).toEqual(true);
    expect(data.snackbar).toEqual(true);
    expect(data.text).toEqual('Saved to Your Library');

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 2100);
    });
    await wrapper.vm.$nextTick();
    expect(data.snackbar).toEqual(false);

    wrapper.find('#remove').trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();
    // await wrapper.vm.changeLiked();
    expect(data.store.state.liked).toEqual(false);
    expect(data.snackbar).toEqual(true);
    expect(data.text).toEqual('Removed from Your Library');
  });
});

describe('PlaylistCard.vue Component (Playlist)', () => {
  localStorage.setItem('currentUser', JSON.stringify({ data: { _id: '' } }));
  const wrapper = mount(PlaylistCard, {
    localVue,
    vuetify,
    router,
    propsData: {
      songsNum: 1,
      show: true,
      images: '',
      name: 'String',
      owners: [],
      listInfo: {
        images: [{ url: '' }],
        name: '',
        release_date: '',
        id: '1',
        type: 'playlist',
        owner: { id: '1' },
      },
    },
  });

  test('Add or remove list icons changed', async () => {
    wrapper.find('#save').trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();

    // await wrapper.vm.changeLiked();
    expect(wrapper.vm.$data.store.state.liked).toEqual(true);
    expect(wrapper.vm.$data.snackbar).toEqual(true);
    expect(wrapper.vm.$data.text).toEqual('Saved to Your Library');

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 2100);
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.snackbar).toEqual(false);

    wrapper.find('#remove').trigger('click');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 50);
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.store.state.liked).toEqual(false);
    expect(wrapper.vm.$data.snackbar).toEqual(true);
    expect(wrapper.vm.$data.text).toEqual('Removed from Your Library');
  });
});


describe('EmptyList.vue Component', () => {
  const wrapper = mount(EmptyList, {
    localVue,
    vuetify,
    router,
  });

  test('Show icon test', async () => {
    wrapper.vm.showIcon();
    expect(wrapper.vm.$data.show).toEqual(false);
    expect(wrapper.vm.$data.icon).toEqual('mdi-menu-down');
    wrapper.vm.showIcon();
    expect(wrapper.vm.$data.show).toEqual(true);
    expect(wrapper.vm.$data.icon).toEqual('mdi-menu-up');
  });

  test('refresh songs', async () => {
    EventBus.$emit('refreshSongs');
    wrapper.vm.$router.push({
      path: '/playlist',
      name: 'playlist',
      params: {
        id: '5iKYvhddpkuAOzOvrLRznF',
      },
    });
    expect(wrapper.vm.$data.songs).toEqual([]);
    expect(wrapper.vm.$data.empty).toEqual(true);
  });
});
