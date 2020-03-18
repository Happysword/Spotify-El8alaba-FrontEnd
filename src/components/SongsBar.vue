<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
    id="songBar"
    :elevation="hover ? 15 : 0"
    :class="{ 'on-hover': hover }"
    class="d-block ml-5 pt-0 text-truncate"
    color="#60606010"
    flat
    height="64"
    @mouseover="changeicon(1)"
    @mouseleave="changeicon(0)"
    @dblclick="changeicon(2)"
    >
        <v-card-actions>
            <v-icon :color="color" @click="changeicon(2)">
             {{showIcon}}
            </v-icon>
            <v-list-item two-line class="text-truncate d-inline-block">
              <v-list-item-content>
                <v-list-item-title class="mx-2 subtitle text-truncate" :style="`color:${color2} `">
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
                  class="px-2 mx-0"
                  v-on="on"
                  color="#E0E0E0">
                   {{dotsIcon}}
                </v-icon>
              </template>
              <dropDown></dropDown>
            </v-menu>
            <label class="mx-2" :style="`color:${color} `">{{song.duration}} </label>
          </v-card-text>
        </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import store from '../store';
import dropDown from './mockDropdown.vue';
import EventBus from '../EventBus';

export default {
  data: () => ({
    showIcon: 'mdi-music-note-outline',
    songIcon: 'mdi-music-note-outline',
    dotsIcon: '',
    play: false,
    color: 'grey',
    color2: 'white',
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
        if (this.play === true) {
          store.state.currentSong = this.song;
          this.color = '#1ED760';
          this.color2 = '#1ED760';
          this.songIcon = 'mdi-volume-high';
        } else {
          store.state.currentSong = {};
          this.color = 'grey';
          this.color2 = 'white';
          this.songIcon = 'mdi-music-note-outline';
        }
        EventBus.$emit('changePlay', this.play);
      }
      if (hover === 0) {
        this.showIcon = this.songIcon;
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
        if (this.play === true) {
          store.state.currentSong = this.song;
          this.color = '#1ED760';
          this.color2 = '#1ED760';
          this.songIcon = 'mdi-volume-high';
          this.showIcon = 'mdi-volume-high';
        } else {
          store.state.currentSong = {};
          this.color = 'grey';
          this.color2 = 'white';
          this.songIcon = 'mdi-music-note-outline';
          this.showIcon = 'mdi-music-note-outline';
        }
      }
    });
    EventBus.$on('changePlay', () => {
      if (this.song !== store.state.currentSong) {
        this.play = false;
        this.color = 'grey';
        this.color2 = 'white';
        this.songIcon = 'mdi-music-note-outline';
        this.showIcon = 'mdi-music-note-outline';
      }
    });
  },
};
</script>