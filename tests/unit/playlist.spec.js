import Vue from 'vue';
import playlist from '@/components/playlistCard.vue';

describe('playlistCard.test.js', () => {
  let Cmp; let Vm;

  beforeEach(() => {
    Cmp = Vue.extend(playlist); // Create a copy of the original component
    Vm = new Cmp({
      data: {
        // Replace data value with this fake data
        playSong: 'Play',
      },
    }).$mount(); // Instances and mounts the component
  });

  it('equals playSong to play', () => {
    expect(Vm.playSong).toEqual('Play');
  });
});
