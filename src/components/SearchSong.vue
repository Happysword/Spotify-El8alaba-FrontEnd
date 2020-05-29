<template>
<v-card
  class="container"
  dark
  flat
  v-on:="checkSong"
  @mouseover="overlay = true"
  @mouseleave=" overlay = false">
  <v-card-actions>
    <v-img
      src="https://www.scdn.co/i/_global/twitter_card-default.jpg"
      max-height="80px"
      max-width="80px"
      class="img">
        <v-overlay v-if="overlay" absolute>
          <v-btn fab small color="#1ED760" class="btn"
            v-if="overlay"
            @mousedown.stop="" @click="playSong()">
            <v-icon color="white" id="play" v-if="showPlayButton">mdi-play</v-icon>
            <v-icon color="white" id="pause" v-if="!showPlayButton">mdi-pause</v-icon>
        </v-btn>

        </v-overlay>
    </v-img>
    <v-list-item two-line class="d-inline-block">
              <v-list-item-content>
                <v-list-item-title
                class="mx-2 subtitle song"
                 @click="clickSong()">
                  {{ track.name }}
                </v-list-item-title>
                <div>
                <span class="grey--text ml-2 text artist"
                v-for="artist in track.artists" :key="artist.id"
                @click="clickArtist(artist.name)">
                  {{ artist.name }}
                </span>
                </div>
              </v-list-item-content>
            </v-list-item>
  <v-card-text  align="end">
     <v-menu absolute left>
        <template v-slot:activator="{ on }">
          <v-icon size="30" class="px-3 mx-0 dot" v-on="on" @click="drop = true" color="#E0E0E0">
             mdi-dots-horizontal
          </v-icon>
        </template>
        <drop v-if="drop"></drop>
     </v-menu>
  </v-card-text>
  </v-card-actions>
</v-card>
</template>

<script>
import client from 'api-client';
import drop from './mockDropdown.vue';
import EventBus from '../EventBus';

export default {
  data() {
    return {
      overlay: false,
      showPlayButton: true,
      image: String,
      songsList: Array,
      drop: false,
    };
  },
  components: {
    drop,
  },
  props: {
    track: Object,
  },
  async created() {
    this.songsList = await client.fetchAlbumSongs(this.track.album);
  },
  methods: {
    clickSong() {
      this.$router.push(`/album/${this.track.album}`);
    },
    async playSong() {
      this.showPlayButton = !this.showPlayButton;
      if (this.showPlayButton) {
        this.$store.dispatch('playpauseplaylist', {
          playstatus: false,
          ID: this.track.album,
          type: 'album',
        });
      } else {
        this.$store.dispatch('playpauseplaylist', {
          playstatus: true,
          song: {
            track: this.track,
          },
          currentList: this.songsList,
          ID: this.track.album,
          type: 'album',
        });
      }
      EventBus.$emit('changePlay', !this.showPlayButton, this.track.album);
    },
  },
  computed: {
    checkSong() {
      if (this.$store.state.MusicPlayer.currentSong) {
        if (this.track.id === this.$store.state.MusicPlayer.currentSong.track.id) {
          if (this.$store.state.MusicPlayer.isPlaying === true) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.showPlayButton = false;
          } else {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.showPlayButton = true;
          }
        }
      }
      return true;
    },
    musicPlayerSongID() {
      return this.$store.state.MusicPlayer.ID;
    },
  },
  watch: {
    /* istanbul ignore next */
    musicPlayerSongID() {
      if (this.$store.state.MusicPlayer.ID !== this.id) {
        this.showPlayButton = true;
      }
    },
  },
};
</script>
<style scoped>
.img{
  align-self: top;
  padding: 0px;
  margin: 0px;
}
.container{
  padding: 0px;
  margin: 3px;
  max-width: 7  00px;
  max-height: 100px;
}
.container:hover{
background-color: #1a1a1a;
}
.song{
  margin-top: 10px;
  margin-left: 10px;
  font-size: large;
  font-weight: bold;
}
.song:hover{
  cursor: pointer;
  text-decoration-line: underline;
}
.artist{
  margin-left: 10px;
  color: #b3b3b3;
}
.artist:hover{
cursor: pointer;
text-decoration-line: underline;
}
.dot{
  clip-path: circle();
  margin-right: 15px;
}
</style>
