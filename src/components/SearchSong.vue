<template>
<div class="d-inline-block container">
  <v-layout row @mouseover="overlay = true" @mouseleave=" overlay = false" id="layout">
    <v-img
      :src=image
      max-height="80px"
      max-width="80px"
      class="img">
        <v-overlay v-if="overlay" absolute>
          <v-btn fab small color="#1ED760" class="btn"
            v-if="overlay"
            @mousedown.stop="" @click.stop="showPlayButton = !showPlayButton">
            <v-icon color="white" id="play" v-if="showPlayButton">mdi-play</v-icon>
            <v-icon color="white" id="pause" v-if="!showPlayButton">mdi-pause</v-icon>
        </v-btn>

        </v-overlay>
    </v-img>
  <div>
    <span class="white--text song" @click="clickSong()">{{ SongName }}</span>
    <div>
      <span class="disabled artist d-inline-block" v-for="artist in artists" :key="artist.id"
      @click="clickArtist(artist.name)" @ >{{ artist.name }}</span>
    </div>
  </div>
     <v-spacer></v-spacer>
     <v-menu offset-x>
        <template v-slot:activator="{ on }">
          <v-icon size="30" class="px-3 dot" v-on="on" color="#E0E0E0">
             mdi-dots-horizontal
          </v-icon>
        </template>
        <drop></drop>
     </v-menu>
  </v-layout>
</div>
</template>

<script>
import drop from './mockDropdown.vue';

export default {
  data() {
    return {
      overlay: false,
      showPlayButton: true,
    };
  },
  components: {
    drop,
  },
  props: {
    id: String,
    image: String,
    SongName: String,
    track: Object,
    artists: Array,
    albumID: String,
    uri: String,
  },
  methods: {
    clickArtist(y) {
      for (let i = 0; i < this.artists.length; i += 1) {
        if (y === this.artists[i].name) {
          this.$router.push(`/home/artist/${this.artists[i].id}`);
        }
      }
    },
    clickSong() {
      this.$router.push(`/home/track/${this.albumID}?/highlight=${this.uri}`);
    },
  },
};
</script>
<style scoped>
.container{
  padding: 0px;
  margin: 0px;
  max-height: 100px;
  max-width: 800px;
  display: inline-flex;
}
.container:hover{
background-color: #1a1a1a;
}
.song{
  margin-top: 10px;
  margin-left: 10px;
  font-size: large;
  font-weight: bold;
  display: block;
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
