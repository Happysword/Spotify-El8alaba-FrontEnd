<template>
    <v-card
      class="mx-auto"
      max-width="450"
      dark=""
      @mouseover="showActionButton = true"
      @mouseleave="showActionButton = false"
      height="250"
      @click="CardClickLink()"
       >
      <v-container fluid="">
        <v-img
        :src="image? image : 'https://www.scdn.co/i/_global/twitter_card-default.jpg'"
        height="100px"
        width="100px"
        v-if="type === 'artist'"
        class="artistImage"></v-img>
        <v-img
        :src=image
        height="100px"
        max-width="100px"
        v-if="type != 'artist'&& image!=''"
        class="mt-2 ml-2 contain"></v-img>
        <v-icon v-if="type=='profile'&& image==''"
        size="100" class="Picon" dark>mdi-account</v-icon>
      </v-container>
      <v-card-title class="font-weight-bold d-inline-block na">
          {{name}}
      </v-card-title>
        <template v-if="type != 'profile'">
          <v-card-subtitle class="white--text">
            <span v-if="type=='playlist'">by </span>
            <span class="name"
              @click="artistLink()"
              v-if="type != 'artist' && type !='playlist'">{{ artistName }}</span>
            <span class="name" @click="artistLink()"
              v-if="type=='playlist'">{{ owner }}</span>
            <span class="TYPE">{{ type }}</span>
          </v-card-subtitle>
        </template>

        <template v-if="type == 'profile'">
          <v-card-subtitle class="white--text">
            <span class="TYPE">{{ type }}</span>
          </v-card-subtitle>
        </template>

        <v-card-actions v-if="showActionButton && type != 'artist'" v-on:="checkSong">
          <v-spacer></v-spacer>
          <v-btn fab big color="#1ED760" id="btn"
            v-if="showActionButton && type != 'profile'"
            @mousedown.stop="" @click.stop="playSong()">
              <v-icon color="white" id="play" v-if="showPlayButton">mdi-play</v-icon>
              <v-icon color="white" id="pause" v-if="!showPlayButton">mdi-pause</v-icon>
          </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import client from 'api-client';
import EventBus from '../EventBus';

export default {
  props: {
    IDP: String,
    image: String,
    name: String,
    albumID: String,
    type: String,
    artistName: String,
    track: Object,
  },
  data() {
    return {
      showActionButton: false,
      showPlayButton: true,
      songsList: Array,
    };
  },
  computed: {
    checkSong() {
      if (this.$store.state.MusicPlayer.currentSong) {
        console.log(this.IDP);
        console.log(this.$store.state.MusicPlayer.currentSong.track.id);
        if (this.IDP === this.$store.state.MusicPlayer.currentSong.track.id) {
          if (this.$store.state.MusicPlayer.isPlaying === true) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.showPlayButton = false;
          } else {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.showPlayButton = true;
          }
          EventBus.$emit('changePlay', this.$store.state.MusicPlayer.isPlaying, this.albumID);
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
      if (this.$store.state.MusicPlayer.ID !== this.IDP) {
        this.showPlayButton = true;
      }
    },
  },
  methods: {
    async playSong() {
      this.showPlayButton = !this.showPlayButton;
      if (this.showPlayButton) {
        this.$store.dispatch('playpauseplaylist', {
          playstatus: false,
          ID: this.albumID,
          type: 'album',
        });
      } else {
        this.$store.dispatch('playpauseplaylist', {
          playstatus: true,
          song: {
            track: this.track,
          },
          currentList: this.songsList,
          ID: this.albumID,
          type: 'album',
        });
      }
      // EventBus.$emit('changePlay', !this.showPlayButton, this.albumID);
    },
    CardClickLink() {
      if (this.type === 'playlist') {
        this.$router.push(`/playlist/${this.IDP}`);
      } else if (this.type === 'track') {
        this.$router.push(`/album/${this.albumID}`);
      } else if (this.type === 'artist') {
        this.$router.push(`/home/artist/${this.IDP}`);
      } else if (this.type === 'user') {
        this.$router.push(`/home/user/${this.IDP}`);
      } else if (this.type === 'album') {
        this.$router.push(`/album/${this.IDP}`);
      }
    },
    artistLink() {
      if (this.artistName === 'Spotify' || this.owner === 'Spotify') {
        this.$router.push('/home');
      } else {
        this.$router.push(`/artist/${this.artistName}`);
      }
    },
  },
  async created() {
    if (this.type === 'track') {
      this.songsList = await client.fetchAlbumSongs(this.albumID);
    }
  },
};
</script>


<style scoped>


.artistImage{
        transform: translate(20% , 10%);
        border-radius: 50%;
        height:100%;
        width:100%;
        size: 10px;
        object-fit: center;
        object-position: center center;
    }
#btn{
        transform: translate(-40% , -110%);
    }
.TYPE{
      background-color: #101010;
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 3px;
      padding-bottom: 3px;
      border-radius: 20px;
    }
.name{
      margin-right: 6px;
    }
.name:hover{
      text-decoration-line: underline;
    }
.Picon{
  transform: translate(10%,10%);
}
</style>
