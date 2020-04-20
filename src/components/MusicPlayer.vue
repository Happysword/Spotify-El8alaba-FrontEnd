<template>
  <v-footer app dark class="player" height="90">
    <v-container fluid class="mx-0 pa-0">
      <v-row>
        <v-col align-self="center" class="pa-0" cols="3">
          <LMusicP
            v-if="
              !($store.state.MusicPlayer.currentSong === false) &&
                !$store.state.MusicPlayer.adTime
            "
          ></LMusicP>
          <div class="mx-5" v-if="$store.state.MusicPlayer.adTime">Advertisement</div>
        </v-col>
        <v-col align-self="center" class="pa-0" cols="6">
          <MMusicP></MMusicP>
        </v-col>
        <v-col align-self="center" class="pa-0" cols="3">
          <RMusicP></RMusicP>
        </v-col>
      </v-row> </v-container
  ></v-footer>
</template>

<script>
import { mapActions } from 'vuex';
import LMusicP from './musicplayer/LeftPartMPlayer.vue';
import RMusicP from './musicplayer/RightPartMPlayer.vue';
import MMusicP from './musicplayer/MiddlePartMPlayer.vue';

export default {
  components: {
    LMusicP,
    RMusicP,
    MMusicP,
  },
  methods: {
    ...mapActions(['togglePlayact']),
  },
  async created() {
    this.$store.state.MusicPlayer.AudioPlayer = new Audio();
    this.$store.state.MusicPlayer.AudioPlayer.ontimeupdate = () => {
      this.$store.state.MusicPlayer.currentBufferPerc = (this.$store.state.MusicPlayer
        .AudioPlayer.currentTime / this.$store.state.MusicPlayer.AudioPlayer.duration) * 100;

      const SongTimeinS = Math.floor(
        this.$store.state.MusicPlayer.AudioPlayer.currentTime,
      );
      const TimeString = `${Math.floor(
        SongTimeinS / 60,
      ).toString()}:${Math.floor(
        (SongTimeinS % 60) / 10,
      ).toString()}${Math.floor(SongTimeinS % 10).toString()}`;
      this.$store.state.MusicPlayer.currentSongTime = TimeString;
    };
  },
};
</script>

<style scoped>
.player {
  color: white;
  width: 100%;
}
</style>
