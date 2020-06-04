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
              <span id="artist" @click="click('artist')">{{ song.track.artists[0].name }}</span>
              <span id="album" v-if="listType !== 'album'"
                @click="click('album')">
                . {{ song.track.album ? song.track.album.name:'' }}
              </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-text align="end" style="width: 20%" v-if="!recommend">
          <v-menu absolute left offset-overflow>
            <template v-slot:activator="{ on }">
              <v-icon size="20" class="px-2 mx-0" v-on="on" color="#E0E0E0" id="dotsIcon"
                @click="drop = true">
                {{ dotsIcon }}
              </v-icon>
            </template>
            <dropDown
              v-if="drop"
              :id="song.track.id"
              type="track"
              :track="song"
              :listID="listid"
              :ownerID="listOwner"
              :position="counter"
            ></dropDown>
          </v-menu>
          <label class="mx-2" :style="`color:${color} `" id="duration">
            <span>{{parseInt(song.track.duration_ms / 60000)}} : </span>
            <span>{{((parseInt(song.track.duration_ms / 1000) % 60) >= 10)? '':'0'}}</span>
            <span>{{parseInt(song.track.duration_ms / 1000) % 60}}</span>
          </label>
        </v-card-text>
        <v-btn id="Add" rounded dark outlined v-if="recommend"
        align="end" width="100" @click="Add()">
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import server from 'api-client';
import dropDown from './mockDropdown.vue';
import EventBus from '../EventBus';

/**
 * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
 * @vue-computed {Boolean} checkSong Check if this song is the
 * current song or not then set the status of it
 */
export default {
  data: () => ({
    showIcon: 'mdi-music-note-outline',
    songIcon: 'mdi-music-note-outline',
    dotsIcon: '',
    color: 'grey',
    color2: 'white',
    play: false,
    drop: false,
    listTYPE: '',
    listID: '',
  }),
  props: {
    song: {
      type: Object,
      default() {
        return {
          track: {
            name: '',
            album: { name: '' },
            artists: [{ name: '' }],
            duration_ms: 0,
          },
        };
      },
    },
    counter: {
      type: Number,
      default: 0,
    },
    list: Array,
    listid: String,
    listType: String,
    listOwner: {
      type: String,
      default: '',
    },
    recommend: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    dropDown,
  },
  methods: {
    /**
     * Route to artist/album page
     * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
     * @param String type of routing page
     */
    click(type) {
      if (type === 'album') this.$router.push(`/album/${this.song.track.album.id}`);
      else this.$router.push(`/home/artist/${this.song.track.artists[0].id}`);
    },
    /**
     * Change the song icon and color to play mode
     * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
     */
    playSong() {
      this.play = true;
      this.color = '#1ED760';
      this.color2 = '#1ED760';
      this.songIcon = 'mdi-volume-high';
      this.showIcon = this.songIcon;
    },

    /**
     * Change the song icon and color to pause mode
     * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
     */
    pauseSong() {
      this.play = false;
      this.color = 'grey';
      this.color2 = 'white';
      this.songIcon = 'mdi-music-note-outline';
      this.showIcon = this.songIcon;
    },

    /**
     * Change the song mode depending on mouse mode if mouse is over or leave or click
     * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
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
          this.$store.dispatch('playpauseplaylist', {
            playstatus: true,
            song: this.song,
            currentList: this.list,
            ID: this.listID,
            type: this.listTYPE,
          });
        } else {
          this.$store.dispatch('playpauseplaylist', {
            playstatus: false,
            song: this.song,
            currentList: this.list,
            ID: this.listID,
            type: this.listTYPE,
          });
        }
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

    /**
     * Add song to playlist
     * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
     */
    async Add() {
      // eslint-disable-next-line no-underscore-dangle
      const response = await server.AddTrackToPlaylist(this.$route.params.id, this.song.track._id);
      if (response === true) {
        EventBus.$emit('snackbar', {
          show: true,
          timeout: 2000,
          content: 'Added to this Playlist',
        });
        EventBus.$emit('refreshSongs');
      }
    },
  },

  /**
   * Check if there is an event
   * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
   */
  mounted() {
    EventBus.$on('pause', async (play) => {
      if (this.play === true && play === false) {
        await this.$store.dispatch('playpauseplaylist', {
          playstatus: false,
          song: this.song,
          currentList: this.list,
          ID: this.listID,
          type: this.listTYPE,
        });
      } else if (this.counter === 0 && play === true && this.play === false) {
        await this.$store.dispatch('playpauseplaylist', {
          playstatus: true,
          song: this.song,
          currentList: this.list,
          ID: this.listID,
          type: this.listTYPE,
        });
      }
    });
    EventBus.$on('changePlay', () => {
      if (this.song.track.id !== this.$store.state.MusicPlayer.currentSong.track.id) {
        this.pauseSong();
      }
    });
  },
  computed: {
    checkSong() {
      if (this.$store.state.MusicPlayer.currentSong) {
        if (this.song.track.id === this.$store.state.MusicPlayer.currentSong.track.id
            && this.listID === this.$store.state.MusicPlayer.ID) {
          if (this.$store.state.MusicPlayer.isPlaying === true) {
            this.playSong();
          } else {
            this.pauseSong();
          }
          EventBus.$emit('changePlay', this.play, this.listid);
        }
      }
      return true;
    },
  },
  created() {
    this.listID = this.listid;
    this.listTYPE = this.listType;
    if (this.listType === 'Liked') {
      this.listID = this.list[0].track.album.id;
      this.listTYPE = 'album';
    }
  },
};
</script>
<style scoped>
#artist:hover,#album:hover {
  color: rgba(255, 255, 255, 0.911);
  text-decoration-line: underline;
  cursor: pointer;
}
</style>
