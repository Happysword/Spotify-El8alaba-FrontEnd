<template>
  <v-hover v-slot:default="{ hover }" v-on:="checkSong">
    <v-card
      id="songBar"
      :elevation="hover ? 15 : 0"
      :class="{ 'on-hover': hover }"
      class="d-block ml-5 pt-0 text-truncate"
      color="#60606000"
      flat
      height="64"
      @mouseover="changeicon(2)"
      @mouseleave="changeicon(1)"
      @dblclick="changeicon(0)"
    >
      <v-card-actions>
        <v-icon id= "showIcon" :color="color" @click="changeicon(0)">
          {{ showIcon }}
        </v-icon>
        <v-list-item two-line class="text-truncate d-inline-block">
          <v-list-item-content>
            <v-list-item-title
              id="songName"
              class="mx-2 subtitle text-truncate"
              :style="`color:${color2} `"
            >
              {{ song.track.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="grey--text mx-2 text text-truncate" id="songInfo">
              {{ song.track.artists[0].name }}
              <span v-if="listType !== 'album'"> . {{ song.track.album.name }}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-text align="end" style="width: 20%">
          <v-menu absolute left>
            <template v-slot:activator="{ on }">
              <v-icon size="20" class="px-2 mx-0" v-on="on" color="#E0E0E0" id="dotsIcon">
                {{ dotsIcon }}
              </v-icon>
            </template>
            <dropDown></dropDown>
          </v-menu>
          <label class="mx-2" :style="`color:${color} `" id="duration">
            {{ parseInt(song.track.duration_ms / 60000) }} :
            {{ parseInt(song.track.duration_ms / 1000) % 60 }}</label
          >
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
    color: 'grey',
    color2: 'white',
    play: false,
  }),
  props: {
    song: Object,
    counter: Number,
    list: Array,
    listid: String,
    listType: String,
  },
  components: {
    dropDown,
  },
  methods: {
    /**
     * Change the song icon and color to play mode
     */
    playSong() {
      store.state.MusicPlayer.isPlaying = true;
      this.play = true;
      this.color = '#1ED760';
      this.color2 = '#1ED760';
      this.songIcon = 'mdi-volume-high';
      this.showIcon = this.songIcon;
    },

    /**
     * Change the song icon and color to pause mode
     */
    pauseSong() {
      store.state.MusicPlayer.isPlaying = false;
      this.play = false;
      this.color = 'grey';
      this.color2 = 'white';
      this.songIcon = 'mdi-music-note-outline';
      this.showIcon = this.songIcon;
    },

    /**
     * Change the song mode depending on mouse mode if mouse is over or leave or click
     * @param {Number} hover controls the mode of the song it takes the values of 0, 1, 2
     * if 0 then change the mode of the song and play or pause it
     * if 1 then set the mode to idle that there is no hover
     * if 2 or else then set the mode to active that the mouse is over the card
     */
    changeicon(hover) {
      this.dotsIcon = 'mdi-dots-horizontal';
      if (hover === 0) {
        this.play = !this.play;
        if (this.play === true) {
          store.state.MusicPlayer.currentSong = this.song;
          store.state.MusicPlayer.currentList = this.list;
          store.state.MusicPlayer.currentSongIndexinList = this.counter;
          this.playSong();
          store.dispatch('playpauseplaylist', {
            playstatus: true,
            song: this.song,
          });
        } else {
          this.pauseSong();
          store.dispatch('playpauseplaylist', {
            playstatus: false,
            song: this.song,
          });
        }
        EventBus.$emit('changePlay', this.play, this.listid);
      }
      if (hover === 1) {
        this.showIcon = this.songIcon;
        this.dotsIcon = '';
      } else if (this.play === true) {
        this.showIcon = 'mdi-pause';
      } else {
        this.showIcon = 'mdi-play';
      }
    },
  },

  /**
   * Check if there is an event
   */
  mounted() {
    EventBus.$on('pause', (play) => {
      if ((this.play === true && play === false) || this.counter === 0) {
        this.play = play;
        if (this.play === true) {
          store.state.MusicPlayer.currentSong = this.song;
          store.state.MusicPlayer.currentList = this.list;
          store.state.MusicPlayer.currentSongIndexinList = 0;
          this.playSong();
          this.showIcon = 'mdi-volume-high';
        } else {
          this.pauseSong();
          this.showIcon = 'mdi-music-note-outline';
        }
        store.dispatch('playpauseplaylist', {
          playstatus: this.play,
          song: this.song,
        });
      }
    });
    EventBus.$on('changePlay', () => {
      if (this.song !== store.state.MusicPlayer.currentSong) {
        this.play = false;
        this.color = 'grey';
        this.color2 = 'white';
        this.songIcon = 'mdi-music-note-outline';
        this.showIcon = 'mdi-music-note-outline';
      }
    });
  },
  computed: {
    /**
     * Check if this song is the current song or not then set the status of it
     */
    checkSong() {
      if (this.song === store.state.MusicPlayer.currentSong) {
        if (store.state.MusicPlayer.isPlaying === true) {
          this.playSong();
        } else {
          this.pauseSong();
        }
        EventBus.$emit('changePlay', store.state.MusicPlayer.isPlaying, this.listid);
      }
      return true;
    },
  },
};
</script>
