<template>
        <v-card
        class="d-block ml-5 text-truncate"
        color="#60606010"
        flat
        height="64"
        @mouseover="changeicon(1)"
        @mouseleave="changeicon(0)"
        @click="changeicon(2)"
        >
            <v-card-actions>
                <v-icon color="grey">
                 {{showIcon}}
                </v-icon>
                <v-list-item two-line class="text-truncate d-inline-block">
                  <v-list-item-content>
                    <v-list-item-title class="white--text mx-2 subtitle text-truncate">
                      {{song.songname}}
                    </v-list-item-title>
                    <v-list-item-subtitle class="grey--text mx-2 text text-truncate">
                      {{ song.artist }} . {{song.album}}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-card-text  align="end" style="width: 20%">
                  <v-menu absolute left>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      size="20"
                      class="px-2 mx-2"
                      v-on="on"
                      color="#E0E0E0">
                       {{dotsIcon}}
                    </v-icon>
                  </template>
                  <dropDown></dropDown>
                </v-menu>
                <label class="grey--text mx-2">{{song.duration}}</label>
              </v-card-text>
            </v-card-actions>
        </v-card>
</template>

<script>
import dropDown from './mockDropdown.vue';
import EventBus from '../EventBus';

export default {
  data: () => ({
    showIcon: 'mdi-music-note-outline',
    dotsIcon: '',
    play: false,
  }),
  props: {
    song: Object,
    counter: Number,
  },
  components: {
    dropDown,
  },
  methods: {
    changeicon(hover) {
      this.dotsIcon = 'mdi-dots-horizontal';
      if (hover === 2) {
        this.play = !this.play;
        EventBus.$emit('changePlay', this.play);
      }
      if (hover === 0) {
        this.showIcon = 'mdi-music-note-outline';
        this.dotsIcon = '';
      } else if (this.play === true) {
        this.showIcon = 'mdi-pause';
      } else {
        this.showIcon = 'mdi-play';
      }
    },
  },
  mounted() {
    EventBus.$on('pause', (play) => {
      if ((this.play === true && play === false) || this.counter === 0) {
        this.play = play;
      }
    });
  },
};
</script>