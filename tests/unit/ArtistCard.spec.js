import { shallowMount } from '@vue/test-utils';
import vuetify from 'vuetify';
import Vue from 'vue';
import ArtistCard from '../../src/components/ArtistCard.vue';

describe('ArtistCard.vue', () => {
  let wrapper;

  beforeEach(() => {
    Vue.use(vuetify);
    wrapper = shallowMount(ArtistCard);
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ArtistCard).isVueInstance()).toBe(true);
  });

  it('Checks the play button to be hidden', () => {
    expect(wrapper.vm.showActionButton).toBe(false);
  });
});
