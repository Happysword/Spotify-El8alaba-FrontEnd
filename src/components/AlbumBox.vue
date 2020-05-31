<template>
    <div>
        <v-img :src="imageURL"
        height="180px" contain="" @mouseover="overlay=true" @mouseout="overlay=false">
            <v-overlay v-show="overlay" absolute>
                <v-icon
                id="playIcon"
                size="70"
                color="white"
                v-if="showPlayButton"
                @click="playAction()"
                >
                mdi-play-circle-outline
                </v-icon>
                <v-icon
                id="pauseIcon"
                size="70"
                color="white"
                v-if="!showPlayButton"
                @click="pauseAction()"
                >
                mdi-pause-circle-outline
                </v-icon>
            </v-overlay>
        </v-img>
        <h1 class="white--text subtitle-1 font-weight-bold">
            <router-link class="psps" :to="albumRoute">{{albumName}}</router-link>
        </h1>
    </div>
</template>

<script>
import client from 'api-client';

export default {
  data() {
    return {
      overlay: false,
      showPlayButton: true,
      songsList: [],
    };
  },
  props: {
    albumID: String,
    albumName: String,
    albumImage: Array,
  },
  computed: {
    albumRoute() {
      return `/album/${this.albumID}`;
    },
    imageURL() {
      if (this.albumImage.length === 0) {
        return 'https://getdrawings.com/free-icon-bw/black-music-icons-23.png';
      }
      return this.albumImage[0].url;
    },
    musicPlayerSongID() {
      return this.$store.state.MusicPlayer.ID;
    },
  },
  mounted() {
    this.getSongsList();
  },
  methods: {
    /** Get the song of album or playlist */
    async getSongsList() {
      this.songsList = await client.fetchAlbumSongs(this.albumID);
    },
    playAction() {
      if (this.$store.state.MusicPlayer.ID === this.albumID) {
        this.$store.dispatch('playpauseplaylist', {
          playstatus: true,
          ID: this.albumID,
          type: 'album',
        });
      } else {
        this.$store.dispatch('playpauseplaylist', {
          playstatus: true,
          currentList: this.songsList,
          ID: this.albumID,
          song: this.songsList[0],
          type: 'album',
        });
      }
      this.showPlayButton = false;
    },
    pauseAction() {
      this.$store.dispatch('playpauseplaylist', {
        playstatus: false,
        type: 'album',
      });
      this.showPlayButton = true;
    },
  },
  watch: {
    /* istanbul ignore next */
    musicPlayerSongID() {
      if (this.$store.state.MusicPlayer.ID !== this.albumID) {
        this.showPlayButton = true;
      }
    },
  },
};
</script>

<style scoped>
.subtitle-1{
    text-align: center;
}
.psps {
  color: inherit;
  text-decoration: inherit;
}
</style>
